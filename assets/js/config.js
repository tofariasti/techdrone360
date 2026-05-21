/**
 * TechDrone360 — Configuração central
 * ALTERE AQUI antes de publicar o site
 */
const TechDroneConfig = {
  // Número WhatsApp: apenas dígitos, com DDI (ex: 5511999999999)
  whatsappNumero: '5551989030405',

  // Mensagem pré-preenchida ao abrir o WhatsApp
  whatsappMensagem: `Olá! Vi o site TechDrone360 e gostaria de um orçamento.

Para agilizar o atendimento, poderia me informar:

1. Tipo de serviço: (imóvel / obra / evento / empresa / turismo / inspeção / outro)
2. O que precisa: (fotos / vídeo / fotos + vídeo)
3. Local da captação (cidade e endereço ou referência):
4. Data ou período desejado:
5. Observações ou referências (opcional):

Obrigado!`,

  // Incluir origem do clique na mensagem (nav, hero, float, etc.)
  whatsappRastrearOrigem: true,

  // Google Analytics 4 — preencha o ID (ex: G-XXXXXXXXXX) ou deixe vazio para desativar
  googleAnalyticsId: '',

  // Cidade e região de atendimento (SEO, footer e textos longos)
  cidadeRegiao: 'Porto Alegre e toda a região metropolitana',

  // Versão curta para título do hero (evita quebras estranhas)
  cidadeHero: 'Porto Alegre e região',

  // SEO — imagem para compartilhamento (1200×630 recomendado; use foto aérea real)
  ogImage: 'assets/images/hero-poster.jpg',

  // Credibilidade — emissão de nota fiscal (defina false para ocultar)
  emiteNotaFiscal: true,
  notaFiscalTitulo: 'Emissão de nota fiscal',
  notaFiscalCurto: 'Emissão de NF',
  notaFiscalDetalhe:
    'Atendimento formal para empresas, imobiliárias e clientes que precisam de documentação fiscal no pagamento do serviço.',

  // Instagram (com ou sem @)
  instagram: '@techdrone360',
  instagramUrl: 'https://www.instagram.com/techdrone360',

  // Canal YouTube
  youtube: '@techdrone360',
  youtubeUrl: 'https://www.youtube.com/@techdrone360',

  // Modelo do drone DJI utilizado
  modeloDji: 'DJI Mini 4 Pro',

  // Sobre — personalize com seu nome e história
  sobre: {
    titulo: 'Quem faz as captações',
    nome: 'TechDrone360',
    subtitulo: 'Especialista em imagens aéreas na região metropolitana de Porto Alegre',
    texto:
      'Realizo fotos e vídeos aéreos profissionais com drone DJI para imobiliárias, construtoras, empresas e eventos. Cada projeto é planejado conforme o local, o objetivo e as condições de voo — com foco em imagens que vendem, informam e impressionam.',
    destaques: [
      'Captações profissionais com DJI Mini 4 Pro',
      'Portfólio com empreendimentos reais na região',
      'Atendimento direto pelo WhatsApp',
    ],
    // Foto sua (opcional) — ex: assets/images/sobre.jpg
    foto: '',
  },

  // Depoimentos — substitua por feedback real de clientes
  depoimentos: [
    {
      texto:
        'As imagens aéreas valorizaram muito o anúncio do empreendimento. Recebemos mais contatos logo na primeira semana.',
      autor: 'Cliente — setor imobiliário',
      servico: 'Loteamento / condomínio',
    },
    {
      texto:
        'Profissionalismo do início ao fim: alinhou o roteiro, captou no dia e entregou o material no prazo combinado.',
      autor: 'Construtora parceira',
      servico: 'Obra em andamento',
    },
    {
      texto:
        'O vídeo aéreo ficou cinematográfico e elevou o padrão do nosso conteúdo nas redes sociais.',
      autor: 'Empresa de turismo',
      servico: 'Hotel / destino',
    },
  ],

  // FAQ — edite perguntas e respostas conforme seu negócio
  faq: [
    {
      pergunta: 'Quanto custa uma captação com drone?',
      resposta:
        'O valor depende do local, do tipo de material (fotos, vídeo ou pacote), da complexidade e do prazo de entrega. Envie os detalhes pelo WhatsApp e receba um orçamento personalizado, sem compromisso.',
    },
    {
      pergunta: 'Em quanto tempo recebo as fotos e vídeos?',
      resposta:
        'Fotos em alta resolução costumam ser entregues em poucos dias úteis após a captação. Vídeos editados seguem o prazo combinado no orçamento — geralmente entre 3 e 10 dias úteis, conforme a complexidade da edição.',
    },
    {
      pergunta: 'Vocês atendem só Porto Alegre?',
      resposta:
        'O foco é Porto Alegre e toda a região metropolitana (Canoas, Gravataí, Viamão, Novo Hamburgo, entre outras). Para outras cidades do RS, consulte disponibilidade pelo WhatsApp.',
    },
    {
      pergunta: 'O voo com drone é legal? Vocês têm registro na ANAC?',
      resposta:
        'As captações seguem a legislação vigente, com planejamento prévio, respeito às restrições do local e às condições climáticas. Operações são realizadas com responsabilidade e equipamento homologado. Para voos em áreas especiais ou empresas que exigem documentação, informe no orçamento.',
    },
    {
      pergunta: 'E se chover ou ventar muito no dia agendado?',
      resposta:
        'A segurança da operação vem primeiro. Se o clima não permitir voo, reagendamos sem custo adicional, em comum acordo com o cliente.',
    },
    {
      pergunta: 'Posso usar as imagens em portais imobiliários e anúncios?',
      resposta:
        'Sim. O uso para divulgação do seu imóvel, obra ou empresa é combinado no orçamento. Para campanhas amplas ou licenciamento estendido, detalhamos na proposta.',
    },
    {
      pergunta: 'Vocês emitem nota fiscal?',
      resposta:
        'Sim. Atendimento formal para empresas, imobiliárias e clientes que precisam de nota fiscal no pagamento do serviço.',
    },
  ],

  // Fotos do equipamento (galeria na seção #equipamento)
  fotosDrone: [
    { imagem: 'assets/images/drone/dji-mini-4-pro-01.jpg', alt: 'DJI Mini 4 Pro — vista geral' },
    { imagem: 'assets/images/drone/dji-mini-4-pro-03.jpg', alt: 'DJI Mini 4 Pro — detalhe do corpo' },
    { imagem: 'assets/images/drone/dji-mini-4-pro-05.jpg', alt: 'DJI Mini 4 Pro — hélices e braços' },
    { imagem: 'assets/images/drone/dji-mini-4-pro-07.jpg', alt: 'DJI Mini 4 Pro — câmera e gimbal' },
    { imagem: 'assets/images/drone/dji-mini-4-pro-10.jpg', alt: 'DJI Mini 4 Pro — controle RC' },
    { imagem: 'assets/images/drone/dji-mini-4-pro-15.jpg', alt: 'DJI Mini 4 Pro — conjunto completo' },
  ],

  // E-mail opcional (deixe vazio para ocultar)
  email: '',

  // URL canônica do site
  siteUrl: 'https://techdrone360.com.br',

  // Vídeo de fundo do hero
  heroVideo: 'assets/video/hero.mp4',
  heroPoster: 'assets/images/hero-poster.jpg',

  // Fotos do portfólio (Instagram) — gerado por scripts/sync-instagram.py
  fotosPortfolio: [],
  fotosPortfolioJson: 'assets/data/fotos-portfolio.json',
  instagramPosts: [],

  // Vídeos do YouTube
  videosPortfolio: [
    { videoId: 'rSm1SmRWuzw', titulo: 'Mont Serrano - Monte Negro/RS', categoria: 'imoveis' },
    { videoId: 'ShmOzfQtlRI', titulo: 'Park Poente - Viamão/RS', categoria: 'imoveis' },
    { videoId: 'CKBOesIKa8A', titulo: 'Saint Louis - Viamão/RS', categoria: 'imoveis' },
    { videoId: 'idHTvxyoFrM', titulo: 'Arty Park - Gravataí/RS', categoria: 'imoveis' },
    { videoId: 'vTW0XAkBXIM', titulo: 'Bella Città Condomínio Parque - Porto Alegre / RS', categoria: 'imoveis' },
    { videoId: 'lHBIv6GVu4U', titulo: 'Residencial Arsiè no bairro Petrópolis, Porto Alegre / RS', categoria: 'imoveis' },
  ],
  youtubeVideosJson: 'assets/data/videos-youtube.json',
};

if (typeof window !== 'undefined') {
  window.TechDroneConfig = TechDroneConfig;
}
