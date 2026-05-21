#!/usr/bin/env python3
"""
Importa fotos do Instagram @techdrone360 para o portfólio do site.

Modo automático (requer sessão instaloader):
  python3 -m instaloader --login techdrone360
  python3 scripts/sync-instagram.py

Modo manual (se Instagram bloquear / rate limit):
  Salve fotos em assets/images/instagram/ (ex: abc123.jpg)
  python3 scripts/sync-instagram.py --from-folder
"""

from __future__ import annotations

import argparse
import json
import os
import pickle
import re
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "images" / "instagram"
DATA_FILE = ROOT / "assets" / "data" / "fotos-portfolio.json"
DEFAULT_TARGET = "techdrone360"
MAX_POSTS = 12
SESSION_DIR = Path.home() / ".config" / "instaloader"


def guess_categoria(caption: str) -> str:
    text = (caption or "").lower()
    if any(w in text for w in ("obra", "constru", "canteiro")):
        return "obras"
    if any(w in text for w in ("evento", "festa", "casamento")):
        return "eventos"
    if any(w in text for w in ("empresa", "indústria", "industria", "comercial")):
        return "empresas"
    if any(w in text for w in ("natureza", "parque", "monte", "turismo", "hotel", "pousada")):
        return "natureza"
    if any(w in text for w in ("imóvel", "imovel", "residencial", "condomínio", "condominio", "lote")):
        return "imoveis"
    return "imoveis"


def is_rate_limited(exc: BaseException) -> bool:
    msg = str(exc).lower()
    return "wait a few minutes" in msg or "please wait" in msg


def find_session_users() -> list[str]:
    users = []
    for base in (SESSION_DIR, Path.home() / "Library" / "Application Support" / "instaloader"):
        if not base.is_dir():
            continue
        for f in base.glob("session-*"):
            name = f.name.replace("session-", "")
            if name:
                users.append(name)
    return list(dict.fromkeys(users))


def read_user_id_from_session(username: str) -> int | None:
    path = SESSION_DIR / f"session-{username}"
    if not path.is_file():
        return None
    try:
        with path.open("rb") as fh:
            data = pickle.load(fh)
        for key, val in data.items():
            if key == "ds_user_id" or (isinstance(key, str) and "user_id" in key):
                return int(val)
        if isinstance(data, dict):
            for v in data.values():
                if isinstance(v, (int, str)) and str(v).isdigit() and len(str(v)) > 8:
                    return int(v)
    except Exception:
        pass
    raw = path.read_bytes().decode("latin-1", errors="ignore")
    m = re.search(r"ds_user_id[^\d]*(\d{8,})", raw)
    if m:
        return int(m.group(1))
    return None


def load_session(loader, instaloader) -> str | None:
    preferred = os.environ.get("INSTAGRAM_LOGIN") or os.environ.get("INSTALOADER_LOGIN")
    candidates = []
    if preferred:
        candidates.append(preferred)
    candidates.extend(find_session_users())

    for user in candidates:
        try:
            loader.load_session_from_file(user)
            print(f"Sessão carregada: @{user}")
            return user
        except FileNotFoundError:
            continue
        except Exception as exc:
            print(f"  (sessão @{user} inválida: {exc})")
    return None


def print_rate_limit_help() -> None:
    print()
    print("⏳ Instagram limitou temporariamente as consultas (muitas tentativas seguidas).")
    print()
    print("  • NÃO faça login de novo agora — isso piora o bloqueio.")
    print("  • Aguarde 30–60 minutos.")
    print("  • Depois rode apenas: python3 scripts/sync-instagram.py")
    print()
    print("  Alternativa imediata (sem API):")
    print("  1. No celular/Instagram, salve suas melhores fotos")
    print("  2. Copie para assets/images/instagram/ (nome: codigo.jpg)")
    print("  3. Rode: python3 scripts/sync-instagram.py --from-folder")
    print()


def print_login_help() -> None:
    print()
    print("Login necessário antes do sync automático:")
    print("  python3 -m instaloader --login techdrone360")
    print("  python3 scripts/sync-instagram.py")
    print()
    sessions = find_session_users()
    if sessions:
        print(f"Sessões salvas: {', '.join('@' + u for u in sessions)}")
    print_rate_limit_help()


def import_from_folder(max_posts: int) -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

    exts = {".jpg", ".jpeg", ".png", ".webp"}
    files = sorted(
        [f for f in OUT_DIR.iterdir() if f.is_file() and f.suffix.lower() in exts],
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )[:max_posts]

    if not files:
        print(f"Nenhuma imagem em {OUT_DIR}")
        print("Salve fotos do Instagram nessa pasta e rode de novo com --from-folder")
        return 1

    fotos = []
    for f in files:
        code = f.stem
        rel = f"assets/images/instagram/{f.name}"
        # Nomes do CDN (ex: 624688275_..._n.jpg) não são código de post — link vai para o perfil
        is_post_shortcode = bool(re.match(r"^[A-Za-z0-9_-]{5,12}$", code))
        fotos.append(
            {
                "imagem": rel,
                "imagemFull": rel,
                "alt": f"Foto aérea TechDrone360",
                "categoria": "imoveis",
                "instagramUrl": f"https://www.instagram.com/p/{code}/"
                if is_post_shortcode
                else config_instagram_url(),
            }
        )
        print(f"  ✓ {f.name}")

    DATA_FILE.write_text(json.dumps(fotos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\n{len(fotos)} fotos listadas em {DATA_FILE}")
    return 0


def config_instagram_url() -> str:
    return "https://www.instagram.com/techdrone360"


def get_profile(loader, instaloader, session_user: str, target: str):
    """Tenta carregar perfil por username ou ID da sessão."""
    errors = []

    for attempt in range(2):
        try:
            return instaloader.Profile.from_username(loader.context, target)
        except instaloader.exceptions.ProfileNotExistsException as exc:
            errors.append(exc)
        except Exception as exc:
            if is_rate_limited(exc):
                raise
            errors.append(exc)

        user_id = read_user_id_from_session(session_user)
        if user_id:
            try:
                print(f"Tentando perfil pelo ID da sessão ({user_id})...")
                return instaloader.Profile.from_id(loader.context, user_id)
            except Exception as exc:
                if is_rate_limited(exc):
                    raise
                errors.append(exc)

        if attempt == 0 and target != session_user:
            print(f"@{target} indisponível — tentando @{session_user}...")
            target = session_user
        else:
            break

    raise errors[-1] if errors else RuntimeError("Não foi possível carregar o perfil")


def main() -> int:
    parser = argparse.ArgumentParser(description="Importar fotos do Instagram para TechDrone360")
    parser.add_argument("--user", default=DEFAULT_TARGET, help=f"Perfil alvo (padrão: {DEFAULT_TARGET})")
    parser.add_argument("--max", type=int, default=MAX_POSTS, help="Quantidade máxima de fotos")
    parser.add_argument(
        "--from-folder",
        action="store_true",
        help="Gera fotos-portfolio.json a partir de imagens já salvas em assets/images/instagram/",
    )
    args = parser.parse_args()

    if args.from_folder:
        return import_from_folder(args.max)

    try:
        import instaloader
    except ImportError:
        print("Instale: pip3 install instaloader")
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

    loader = instaloader.Instaloader(
        download_pictures=True,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        post_metadata_txt_pattern="",
        filename_pattern="{shortcode}",
        dirname_pattern=str(OUT_DIR),
    )

    session_user = load_session(loader, instaloader)
    if not session_user:
        print_login_help()
        return 1

    target = args.user.lstrip("@")

    try:
        profile = get_profile(loader, instaloader, session_user, target)
    except instaloader.exceptions.LoginRequiredException:
        print("Sessão expirada. Rode: python3 -m instaloader --login techdrone360")
        return 1
    except Exception as exc:
        if is_rate_limited(exc):
            print_rate_limit_help()
            return 1
        print(f"Erro: {exc}")
        print_rate_limit_help()
        return 1

    print(f"Importando fotos de @{profile.username} (até {args.max})...\n")
    fotos = []
    count = 0

    try:
        posts = profile.get_posts()
    except Exception as exc:
        if is_rate_limited(exc):
            print_rate_limit_help()
            return 1
        raise

    for post in posts:
        if post.is_video:
            continue

        shortcode = post.shortcode
        caption = (post.caption or "").strip().replace("\n", " ")
        if len(caption) > 100:
            caption = caption[:97] + "..."

        dest = OUT_DIR / f"{shortcode}.jpg"
        if not dest.exists():
            try:
                loader.download_pic(post.url, dest.with_suffix(""), post.date_utc)
            except Exception as exc:
                if is_rate_limited(exc):
                    print_rate_limit_help()
                    return 1
                print(f"  ! falha ao baixar {shortcode}: {exc}")
                continue

        if not dest.exists():
            candidates = list(OUT_DIR.glob(f"{shortcode}*"))
            if candidates:
                dest = candidates[0]

        rel_path = f"assets/images/instagram/{dest.name}"
        fotos.append(
            {
                "imagem": rel_path,
                "imagemFull": rel_path,
                "alt": caption or f"Foto aérea TechDrone360 — {shortcode}",
                "categoria": guess_categoria(post.caption or ""),
                "instagramUrl": f"https://www.instagram.com/p/{shortcode}/",
            }
        )
        count += 1
        print(f"  ✓ {shortcode} — {caption[:50] or '(sem legenda)'}")
        time.sleep(2)

        if count >= args.max:
            break

    if not fotos:
        print("Nenhuma foto importada. Use --from-folder ou aguarde e tente de novo.")
        return 1

    DATA_FILE.write_text(json.dumps(fotos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\n{count} fotos salvas em {OUT_DIR}")
    print(f"Lista gerada: {DATA_FILE}")
    print("Recarregue o site no navegador.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
