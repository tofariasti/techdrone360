#!/usr/bin/env python3
"""
Sincroniza vídeos do canal YouTube @techdrone360 para assets/data/videos-youtube.json

Uso:
  python3 scripts/sync-youtube.py
  python3 scripts/sync-youtube.py --handle techdrone360
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "data" / "videos-youtube.json"
OEMBED = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={vid}&format=json"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def video_title(video_id: str) -> str:
    try:
        data = json.loads(fetch(OEMBED.format(vid=video_id)))
        return (data.get("title") or "").strip() or video_id
    except (urllib.error.URLError, json.JSONDecodeError, KeyError):
        return video_id


def scrape_channel(handle: str) -> list[dict]:
    handle = handle.lstrip("@")
    html = fetch(f"https://www.youtube.com/@{handle}/videos")
    ids: list[str] = []
    seen: set[str] = set()
    for m in re.finditer(r'"videoId":"([a-zA-Z0-9_-]{11})"', html):
        vid = m.group(1)
        if vid in seen:
            continue
        seen.add(vid)
        ids.append(vid)

    if not ids:
        print(f"Nenhum vídeo encontrado em @{handle}", file=sys.stderr)
        sys.exit(1)

    videos = []
    for vid in ids:
        print(f"  {vid} — {video_title(vid)}")
        videos.append({"videoId": vid, "titulo": video_title(vid), "categoria": "imoveis"})
    return videos


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync vídeos do YouTube para o site")
    parser.add_argument("--handle", default="techdrone360", help="Handle do canal (sem @)")
    args = parser.parse_args()

    print(f"Buscando vídeos de @{args.handle}...")
    videos = scrape_channel(args.handle)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(videos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\n{len(videos)} vídeo(s) salvos em {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
