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

1. Tipo de serviço: (imóvel / Airbnb / parque ou destino / hotel / obra / evento / empresa / inspeção / outro)
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

  // Destaque no topo — drone x Google Street View (dúvida frequente)
  destaqueStreetView: {
    eyebrow: 'Dúvida frequente',
    titulo: 'Por que contratar captação com drone em vez do Google Street View?',
    intro:
      'O Street View ajuda a localizar um endereço na rua. Quem vai reservar, comprar ou visitar quer sentir o lugar de verdade — e isso vale para imóvel, Airbnb, parque, hotel, evento ou destino turístico.',
    segmentosTitulo: 'O drone vai muito além do mapa',
    segmentosIntro:
      'Sempre que você precisa vender uma experiência, um espaço ou um lugar — não só “achar a rua” — a captação aérea profissional faz diferença:',
    segmentos: [
      {
        titulo: 'Imóveis e loteamentos',
        texto: 'Terreno, fachada, vizinhança e potencial da área — o que o comprador não vê na foto da fachada.',
      },
      {
        titulo: 'Airbnb e temporada',
        texto: 'Casa, chalé ou apartamento com entorno, acesso e “clima” do bairro; anúncio que reduz dúvida e aumenta reservas.',
      },
      {
        titulo: 'Parques, resorts e destinos',
        texto: 'Trilhas, áreas de lazer, estrutura do empreendimento e escala do local para campanhas e redes sociais.',
      },
      {
        titulo: 'Hotéis, pousadas e turismo',
        texto: 'Convide o visitante a “estar lá” antes da viagem — vídeo e fotos para site, Booking e Instagram.',
      },
      {
        titulo: 'Eventos e empresas',
        texto: 'Festas, shows, lançamentos e sedes com ângulos que transmitem tamanho, público e profissionalismo.',
      },
      {
        titulo: 'Obras e incorporações',
        texto: 'Evolução da construção e visão do empreendimento para investidor e comprador.',
      },
    ],
    streetView: {
      titulo: 'Google Street View',
      itens: [
        'Fotos antigas, na altura de um carro',
        'Ângulo fixo da rua — igual para todo mundo',
        'Não transmite “quero ficar aqui” nem “quero ir lá”',
        'Sem vídeo, sem campanha e sem material exclusivo',
      ],
    },
    drone: {
      titulo: 'Captação com drone',
      itens: [
        'Lugar como está hoje — clima, entorno e diferenciais reais',
        'Fotos e vídeo em alta resolução para anúncio e redes',
        'Ângulos pensados para reserva, venda ou divulgação',
        'Conteúdo único do seu imóvel, negócio ou destino',
      ],
    },
    conclusao:
      'Resumo: o mapa mostra a rua; o drone mostra por que alguém escolhe o seu imóvel, a sua hospedagem, o seu parque ou o seu evento.',
    ctaTexto: 'Quero orçamento de captação',
    ctaSource: 'destaque_street_view',
  },

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

  // Seção #equipamento — características e benefícios para o cliente
  equipamento: {
    intro:
      'Trabalho com o {{modelo}}: drone compacto da linha profissional DJI, pensado para imagem de alto nível em locais urbanos, condomínios, obras, eventos e destinos turísticos — sem abrir mão de segurança e estabilidade.',
    caracteristicas: [
      {
        titulo: 'Vídeo 4K HDR e fotos de alta resolução',
        spec: 'Gravação em 4K HDR (até 60 fps) e fotos em até 48 MP',
        beneficio:
          'Anúncios, portais e redes com imagem nítida — o comprador ou hóspede enxerga detalhes do imóvel, do entorno e do empreendimento com clareza profissional.',
      },
      {
        titulo: 'Lente rápida e HDR',
        spec: 'Abertura f/1.0 e gravação HDR / 10 bits (D-Log M)',
        beneficio:
          'Melhor desempenho no fim da tarde e em céu nublado: cores mais vivas e material que “chama clique” sem parecer amador.',
      },
      {
        titulo: 'Gimbal de 3 eixos',
        spec: 'Estabilização mecânica na câmera',
        beneficio:
          'Vídeos fluidos, sem tremor — sensação cinematográfica que passa confiança em imóveis, hotéis, parques e vídeos institucionais.',
      },
      {
        titulo: 'Modo vertical para redes',
        spec: 'Captação nativa em formato vertical',
        beneficio:
          'Conteúdo pronto para Instagram, Reels, Stories e anúncios mobile, sem perder qualidade cortando vídeo horizontal.',
      },
      {
        titulo: 'Sensores omnidirecionais',
        spec: 'Detecção de obstáculos em várias direções',
        beneficio:
          'Mais segurança perto de prédios, árvores e estruturas — essencial em condomínios, obras e eventos com público.',
      },
      {
        titulo: 'Autonomia de voo',
        spec: 'Até cerca de 34 minutos por bateria (condições ideais)',
        beneficio:
          'Mais ângulos e tomadas na mesma visita, com menos interrupção — você recebe variedade de imagens no pacote combinado.',
      },
      {
        titulo: 'Compacto e ágil',
        spec: 'Menos de 249 g — fácil de transportar e posicionar',
        beneficio:
          'Ideal para quintais, terrenos, áreas de lazer e locais com acesso limitado; setup rápido sem equipamento pesado no seu espaço.',
      },
      {
        titulo: 'Homologado Anatel',
        spec: 'Equipamento regularizado para uso no Brasil',
        beneficio:
          'Tranquilidade em contratação formal: operação alinhada à exigência de equipamento homologado, junto ao planejamento de voo e legislação aplicável.',
      },
    ],
    nota:
      'As entregas (resolução final, fotos, vídeo, edição) são definidas no orçamento. O equipamento garante a base técnica; o planejamento do voo e a pós-produção definem o resultado que você vai publicar.',
  },

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
        titulo: 'Autorização de voo (SARPAS / DECEA)',
        texto:
          'Toda captação a céu aberto é analisada no mapa e, quando a legislação exige, solicito autorização no SARPAS (sistema do DECEA). Em alguns locais isso leva dias de antecedência — por isso a data só é confirmada após aprovação.',
        destaque: true,
        link: {
          label: 'SARPAS — DECEA',
          url: 'https://servicos.decea.mil.br/sarpas',
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
      'Nem todo endereço permite captação aérea. Antes de agendar, verifico o local no mapa, as regras da ANAC e do DECEA (incluindo autorização no SARPAS quando necessário). Assim você evita surpresas no dia da filmagem.',
    avisoLegislacao: {
      titulo: 'Planejamento obrigatório (regras em vigor)',
      texto:
        'A partir de 1º de julho de 2026, a ICA 100-40 do DECEA reforça que o acesso ao espaço aéreo — inclusive com drones leves em áreas urbanas — exige análise e, na maioria dos casos, solicitação prévia no SARPAS. Captações “de última hora” podem não ser possíveis no local desejado.',
    },
    aviso:
      'Se o seu imóvel, obra ou evento estiver em zona restrita, busco ângulos permitidos, outro horário ou indico a melhor alternativa — sempre com segurança e dentro da lei.',
    destaqueCorresponsabilidade: {
      titulo: 'Corresponsabilidade de cliente e operador',
      texto:
        'O cliente é corresponsável pela captação: deve informar o endereço com precisão, alinhar autorizações no condomínio, obra ou evento e colaborar quando o clima ou a legislação impedirem o voo. Devem ser respeitados os limites de altitude, a distância de pessoas não envolvidas no projeto e a área de voo conforme a legislação vigente ou a aprovação da DECEA. Cumprir as normas da ANAC, do DECEA e do espaço aéreo é obrigação de ambas as partes.',
    },
    checklistCliente: {
      titulo: 'O que você, como cliente, deve providenciar',
      itens: [
        'Endereço completo ou coordenadas do local da captação',
        'Autorização do condomínio, construtora ou organizador do evento, quando aplicável',
        'Informar se haverá público, vizinhos próximos ou operações sensíveis no entorno (heliponto, hospital, etc.)',
        'Flexibilidade de data se o SARPAS ou o clima exigirem remarcação',
      ],
    },
    consequencias: {
      titulo: 'Consequências práticas para o seu projeto',
      itens: [
        {
          titulo: 'Sem autorização, sem voo',
          texto:
            'Se o local não for aprovado no SARPAS ou não atender à legislação, a captação não é realizada naquele endereço/data — evitamos multas, apreensão do equipamento e risco para terceiros.',
        },
        {
          titulo: 'Prazo e remarcação',
          texto:
            'Quando a autorização demora ou o clima impede o voo, reagendamos em comum acordo. Pedidos com pouca antecedência podem não caber no cronograma regulatório.',
        },
        {
          titulo: 'Escopo do material',
          texto:
            'As imagens cobrem apenas o imóvel, obra ou área combinados. Uso em anúncios é conforme o orçamento; captação que exponha vizinhos ou áreas privadas alheias sem necessidade do projeto não faz parte do serviço.',
        },
        {
          titulo: 'Operação irregular',
          texto:
            'Voar sem autorização quando ela é exigida, ou descumprir regras da ANAC/DECEA, pode gerar autuação, apreensão do drone e responsabilização civil — por isso o serviço profissional prioriza conformidade antes da câmera ligar.',
        },
      ],
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
          'Em eventos e áreas residenciais densas, a legislação exige distância de segurança em relação a pessoas que não fazem parte do projeto (em geral, cerca de 30 m). Sobrevoo de plateia ou festa em condomínio exige planejamento e, muitas vezes, autorização específica.',
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
          'Há teto máximo conforme o tipo de operação (em regra, até cerca de 120 m, ou menos se a autorização do DECEA definir outro limite). Altitudes maiores exigem categoria e documentação adicionais.',
      },
      {
        tipo: 'urbano',
        titulo: 'Centros urbanos densos',
        texto:
          'Em áreas muito povoadas o voo pode ser limitado ou exigir análise de risco, seguro e eventual comunicação às autoridades, conforme a operação.',
      },
      {
        tipo: 'privacidade',
        titulo: 'Privacidade e uso das imagens',
        texto:
          'Não sobrevoamos quintais e janelas de forma invasiva. O foco é o seu empreendimento, fachada, terreno ou obra acordados. Para publicar fotos em que apareçam vizinhos ou terceiros identificáveis, o ideal é que o contratante também respeite LGPD e direito de imagem.',
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
        label: 'SARPAS (DECEA)',
        url: 'https://servicos.decea.mil.br/sarpas',
      },
      {
        label: 'DECEA — portal UAS',
        url: 'https://www.decea.mil.br/drone/',
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
        'Analiso o endereço e o tipo de serviço (imóvel, obra, evento ou empresa), a quantidade de fotos e/ou vídeos, se haverá edição, o tamanho da área a captar, deslocamento, necessidade de autorização SARPAS/DECEA no local, prazo de entrega e se precisa de nota fiscal. Com essas informações monto uma proposta clara pelo WhatsApp, sem compromisso.',
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
        'Cliente e operador são corresponsáveis. Você colabora com informações corretas do local, autorizações na propriedade ou no evento e com remarcações quando necessário; eu planejo e executo o voo conforme ANAC, DECEA (SARPAS quando aplicável) e regras do espaço aéreo, respeitando limites de altitude, distância de pessoas e área de voo previstos na legislação ou na aprovação emitida. Cumprir essas regras é obrigação de ambas as partes.',
    },
    {
      pergunta: 'Posso pedir a captação para amanhã ou no mesmo dia?',
      resposta:
        'Em muitos locais não. Quando o endereço exige autorização no SARPAS, o processo pode levar dias. Por isso, quanto antes você enviar o endereço e o tipo de serviço, maior a chance de confirmar data e horário sem imprevisto.',
    },
    {
      pergunta: 'E se o DECEA não autorizar o voo no meu endereço?',
      resposta:
        'A captação não é feita sem autorização quando ela é obrigatória. Busco alternativas: outro dia, outro ângulo permitido ou indicação honesta de que o local não permite voo naquele momento. O combinado financeiro segue o que foi acordado no orçamento (remarcação ou cancelamento conforme o caso).',
    },
    {
      pergunta: 'E se chover ou ventar muito no dia agendado?',
      resposta:
        'A segurança da operação vem primeiro. Se o clima não permitir voo, reagendamos sem custo adicional, em comum acordo com o cliente.',
    },
    {
      pergunta: 'Por que contratar filmagem com drone se posso usar imagens do Google Street View?',
      resposta:
        'O Street View serve para localizar o endereço na rua — não para vender uma experiência. Com drone você mostra imóvel, Airbnb, parque, hotel ou evento como estão hoje: entorno, escala, clima do lugar, fotos e vídeo para anúncio e redes. O comparativo e exemplos de uso (hospedagem, turismo, parques etc.) estão em destaque no início da página.',
    },
    {
      pergunta: 'Serve para anúncio de Airbnb, Booking ou promoção de parque e destino?',
      resposta:
        'Sim. Para hospedagem, o hóspede quer ver a propriedade e o entorno — rua, vista, acesso e “sensação” do bairro — não só fotos do interior. Para parques, resorts e atrativos, o vídeo aéreo mostra escala, áreas de lazer e diferenciais que uma foto no chão não comunica. Entregamos material em alta resolução para anúncio, site, redes e campanhas, conforme combinado no orçamento.',
    },
    {
      pergunta: 'Posso usar as imagens em portais imobiliários e anúncios?',
      resposta:
        'Sim. O uso para divulgação do seu imóvel, Airbnb, hotel, parque, obra ou empresa é combinado no orçamento. Para campanhas amplas ou licenciamento estendido, detalhamos na proposta.',
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
