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

  // Como funciona — etapas do processo (ordem exibida no site)
  comoFunciona: {
    titulo: 'Como funciona',
    subtitulo: 'Processo simples, do primeiro contato à entrega do material',
    passos: [
      {
        tipo: 'contato',
        titulo: 'Você entra em contato',
        texto: 'Me chama pelo WhatsApp e conta o que precisa',
      },
      {
        tipo: 'alinhamento',
        titulo: 'Alinhamos o objetivo',
        texto: 'Definimos local, tipo de captação, duração e formato',
      },
      {
        tipo: 'decea',
        titulo: 'Autorização de voo (DECEA)',
        texto:
          'Quando o endereço exige, solicito a autorização no sistema da DECEA. O serviço só é confirmado após aprovação.',
        destaque: true,
        link: {
          label: 'Site DECEA',
          url: 'https://www.decea.gov.br/',
        },
      },
      {
        tipo: 'captura',
        titulo: 'Realizo as imagens',
        texto: 'Fotos e vídeos aéreos com segurança e planejamento',
      },
      {
        tipo: 'edicao',
        titulo: 'Edição',
        texto: 'Conforme combinado: material editado ou bruto',
      },
      {
        tipo: 'entrega',
        titulo: 'Entrego o material',
        texto: 'Você recebe os arquivos no formato acordado',
      },
    ],
  },

  // Onde é proibido ou restrito voar — transparência para o cliente
  restricoesVoo: {
    eyebrow: 'Segurança e legislação',
    titulo: 'Onde é proibido ou restrito voar com drone?',
    intro:
      'Nem todo endereço permite captação aérea. Antes de agendar, verifico o local no mapa, as regras da ANAC/DECEA e se há necessidade de autorização. Assim você evita surpresas no dia da filmagem.',
    aviso:
      'Se o seu imóvel, obra ou evento estiver em zona restrita, busco ângulos permitidos, outro horário ou indico a melhor alternativa — sempre com segurança e dentro da lei.',
    destaqueCorresponsabilidade: {
      titulo: 'Corresponsabilidade de cliente e operador',
      texto:
        'O cliente é corresponsável pela captação: deve informar o endereço com precisão, alinhar autorizações no condomínio, obra ou evento e colaborar quando o clima ou a legislação impedirem o voo. Devem ser respeitados os limites de altitude e a área de voo conforme a legislação vigente ou a aprovação da DECEA. O cumprimento das normas da ANAC, da DECEA e do espaço aéreo é obrigação de ambas as partes — não apenas do operador do drone.',
    },
    itens: [
      {
        tipo: 'aeroporto',
        titulo: 'Perto de aeroportos e helipontos',
        texto:
          'Proximidade de aeródromos, pistas e rotas de aproximação — zonas de restrição (NFZ) definidas pelo controle de tráfego aéreo. Distâncias mínimas variam conforme o local.',
      },
      {
        tipo: 'militar',
        titulo: 'Áreas militares e de segurança',
        texto:
          'Bases, quartéis, presídios, tribunais, palácios governamentais e instalações críticas costumam ter voo proibido ou sujeito a autorização específica.',
      },
      {
        tipo: 'pessoas',
        titulo: 'Sobre pessoas e multidões',
        texto:
          'Voar diretamente sobre público em eventos, shows ou aglomerações exige planejamento e, em muitos casos, autorização e distâncias de segurança definidas em norma.',
      },
      {
        tipo: 'noite',
        titulo: 'À noite e com baixa visibilidade',
        texto:
          'Voos noturnos e com neblina, chuva forte ou vento intenso são restritos ou inviáveis. A captação é remarcada quando o clima não oferece segurança.',
      },
      {
        tipo: 'altura',
        titulo: 'Acima do limite de altitude',
        texto:
          'Há teto máximo de voo conforme categoria do drone e do tipo de operação. Altitudes maiores podem exigir habilitação e autorização adicionais.',
      },
      {
        tipo: 'urbano',
        titulo: 'Centros urbanos densos',
        texto:
          'Em áreas muito povoadas o voo pode ser limitado ou exigir análise de risco, seguro e eventual comunicação às autoridades, conforme a operação.',
      },
      {
        tipo: 'privacidade',
        titulo: 'Privacidade de vizinhos',
        texto:
          'Não sobrevoamos quintais e janelas de forma invasiva. O foco é o seu empreendimento, fachada, terreno ou obra acordados no orçamento.',
      },
      {
        tipo: 'natureza',
        titulo: 'Unidades de conservação e fauna',
        texto:
          'Parques, reservas e regiões com proteção ambiental ou de animais podem exigir consulta prévia ou proibir sobrevoo — cada caso é analisado.',
      },
      {
        tipo: 'autorizacao',
        titulo: 'Propriedade privada sem alinhamento',
        texto:
          'Mesmo com seu pedido, respeitamos limites do condomínio, incorporadora ou espaço aéreo de terceiros. Captamos apenas o que estiver autorizado para o projeto.',
      },
    ],
    notaLegal:
      'Resumo informativo para clientes. Regras detalhadas estão na regulamentação da ANAC (RBAC-E e normas de drones) e no espaço aéreo controlado pela DECEA, incluindo limites de altitude e área de voo definidos em lei ou em autorização emitida. A operação concreta depende do local, do equipamento e do tipo de serviço. A corresponsabilidade não substitui consulta jurídica em casos específicos.',
    links: [
      {
        label: 'ANAC — drones',
        url: 'https://www.gov.br/anac/pt-br/assuntos/drones',
      },
      {
        label: 'DECEA — espaço aéreo',
        url: 'https://www.decea.gov.br/',
      },
    ],
  },

  // FAQ — edite perguntas e respostas conforme seu negócio
  faq: [
    {
      pergunta: 'Quanto custa uma captação com drone?',
      resposta:
        'O valor depende do local, do tipo de material (fotos, vídeo ou pacote), da complexidade e do prazo de entrega. Envie os detalhes pelo WhatsApp e receba um orçamento personalizado, sem compromisso.',
    },
    {
      pergunta: 'O que vocês levam em consideração para fazer o orçamento?',
      resposta:
        'Analiso o endereço e o tipo de serviço (imóvel, obra, evento ou empresa), a quantidade de fotos e/ou vídeos, se haverá edição, o tamanho da área a captar, deslocamento, restrições de voo no local, prazo de entrega e se precisa de nota fiscal. Com essas informações monto uma proposta clara pelo WhatsApp, sem compromisso.',
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
      pergunta: 'O voo com drone é legal? Onde não pode voar?',
      resposta:
        'Sim, quando planejado conforme a legislação. Há locais proibidos ou restritos (aeroportos, áreas militares, sobre multidões, condições climáticas ruins, etc.). Veja a seção “Onde é proibido voar” nesta página e, no orçamento, informe o endereço exato para eu validar o local antes do agendamento.',
    },
    {
      pergunta: 'Quem é responsável por cumprir a legislação do drone?',
      resposta:
        'Cliente e operador são corresponsáveis. Você colabora com informações corretas do local, autorizações na propriedade ou no evento e com remarcações quando necessário; eu planejo e executo o voo conforme ANAC, DECEA e regras do espaço aéreo, respeitando limites de altitude e área de voo previstos na legislação ou na aprovação da DECEA. Cumprir essas regras é obrigação de ambas as partes.',
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
