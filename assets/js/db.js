const REDES_DB = {
  modules: [
    {
      id: 1,
      title: "Modelos & Introdução",
      color: "var(--color-intro)",
      concepts: [
        {
          title: "Topologias de Rede",
          text: "A topologia define a disposição física ou lógica dos nós em uma rede. As principais são:\n• <b>Malha (Mesh):</b> Cada dispositivo se conecta diretamente a outros. Em uma topologia em malha completamente conectada para N nós, são necessárias <b>N(N-1)/2</b> conexões físicas dedicadas.\n• <b>Estrela (Star):</b> Dispositivos conectados a um controlador central (Hub/Switch). Fácil instalação e isolamento de falhas.\n• <b>Anel (Ring):</b> Cada dispositivo se conecta a dois vizinhos formando um circuito fechado. Usa Token Passing para controle de acesso.\n• <b>Barramento (Bus):</b> Um único cabo (backbone) conecta todos os dispositivos."
        },
        {
          title: "Direção de Transmissão",
          text: "• <b>Simplex:</b> Transmissão unidirecional (ex: TV/Rádio).\n• <b>Half-Duplex:</b> Bidirecional, mas não simultânea. Um lado transmite e o outro recebe de forma alternada (ex: Walkie-talkie).\n• <b>Full-Duplex:</b> Bidirecional e simultânea. Ambos transmitem e recebem ao mesmo tempo (ex: Redes Ethernet modernas e telefonia)."
        },
        {
          title: "Atrasos em Redes de Computadores",
          text: "O atraso fim a fim é a soma de quatro componentes de atraso primários:\n1. <b>Atraso de Transmissão ($d_{trans}$):</b> Tempo necessário para empurrar todos os bits do pacote para o link. Depende do tamanho do pacote ($L$) e da taxa de transmissão/largura de banda do link ($R$). Formula: $d_{trans} = L/R$.\n2. <b>Atraso de Propagação ($d_{prop}$):</b> Tempo que um bit leva para propagar da origem ao destino no meio físico. Depende da distância física ($d$) e da velocidade de propagação do sinal no meio ($s \\approx 2 \\times 10^8$ m/s em cobre/fibra). Formula: $d_{prop} = d/s$.\n3. <b>Atraso de Processamento Nodal ($d_{proc}$):</b> Tempo necessário para examinar o cabeçalho do pacote e determinar para onde direcioná-lo.\n4. <b>Atraso de Fila ($d_{fila}$):</b> Tempo que o pacote passa aguardando para ser transmitido no buffer do roteador."
        },
        {
          title: "Modelos OSI e TCP/IP",
          text: "Os modelos estruturam a comunicação em camadas de responsabilidades específicas:\n• <b>Modelo OSI (7 Camadas):</b> Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação.\n• <b>Modelo TCP/IP (4 ou 5 Camadas):</b> Física, Enlace (ou Interface de Rede juntas), Rede (ou Internet), Transporte e Aplicação.\n\n<i>Observação Crítica para a Prova:</i> As camadas <b>Sessão</b> (gerenciamento de diálogo, token e sincronização) e <b>Apresentação</b> (sintaxe, semântica, criptografia, conversões como ASCII para EBCDIC, compressão) do modelo OSI não existem na pilha TCP/IP padrão, sendo as suas funções absorvidas pela própria camada de Aplicação no TCP/IP."
        }
      ]
    },
    {
      id: 2,
      title: "Camada de Aplicação",
      color: "var(--color-app)",
      concepts: [
        {
          title: "Domain Name System (DNS)",
          text: "Serviço de resolução de nomes que converte hostnames em IPs e vice-versa. Opera na <b>porta 53 (UDP para consultas comuns, TCP para transferências de zona)</b>.\n• <b>Hierarquia de Servidores:</b> Servidores Raiz (Root) no topo, seguidos pelos TLD (Top-Level Domain, ex: .com, .br) e Autorizativos.\n• <b>Tipos de Registros de Recurso (RR):</b>\n  - <b>A:</b> Mapeia hostname para IPv4.\n  - <b>AAAA:</b> Mapeia hostname para IPv6.\n  - <b>CNAME:</b> Cria apelidos (aliases) de nomes canônicos.\n  - <b>MX (Mail Exchanger):</b> Identifica o servidor de e-mail de um domínio.\n  - <b>NS:</b> Identifica os servidores autorizativos de um domínio.\n  - <b>PTR:</b> Mapeia IP para hostname (usado na resolução reversa).\n• <b>Resolução de Nomes:</b> Pode ser <b>Iterativa</b> (o servidor local pergunta a outros servidores e obtém dicas de onde consultar a seguir) ou <b>Recursiva</b> (o servidor local assume a responsabilidade e pergunta em cadeia em nome do cliente, retornando a resposta final)."
        },
        {
          title: "Correio Eletrônico (SMTP, POP3, IMAP)",
          text: "O correio eletrônico é composto por agentes de usuário, servidores de e-mail e protocolos:\n• <b>SMTP (Simple Mail Transfer Protocol):</b> Utilizado para <b>enviar</b> e-mails entre o agente do remetente e seu servidor, e entre os servidores de e-mail. Opera de forma textual nativa na <b>porta 25</b> (transferência entre servidores) e na <b>porta 587</b> (envio autenticado por clientes).\n• <b>MIME (Multipurpose Internet Mail Extensions):</b> Padrão que permite enviar anexos não-ASCII (imagens, binários) sobre SMTP codificando os dados in formato de texto (como <b>Base64</b>).\n• <b>Base64:</b> Codifica blocos de 3 bytes (24 bits) em 4 caracteres de texto ASCII (6 bits cada). Se o tamanho de entrada em bytes não for múltiplo de 3, usa preenchimento (padding) com `=`. Número de caracteres resultantes: $\\approx (4/3) \\times N_{bytes}$.\n• <b>POP3 (Post Office Protocol v3):</b> Protocolo simples de recebimento (<b>porta 110</b>). Tradicionalmente opera em modo <b>ler-e-apagar</b> (baixa e exclui do servidor, impedindo sincronização multi-dispositivo), mas suporta modo <b>ler-e-guardar</b>.\n• <b>IMAP (Internet Message Access Protocol):</b> Protocolo avançado de recebimento (<b>porta 143</b>). Permite organizar e-mails em pastas mantidas no servidor, sincronizando o estado entre vários dispositivos simultaneamente."
        }
      ]
    },
    {
      id: 3,
      title: "Camada de Transporte",
      color: "var(--color-trans)",
      concepts: [
        {
          title: "User Datagram Protocol (UDP)",
          text: "Protocolo de transporte não confiável, sem conexão (connectionless).\n• <b>Características:</b> Envia datagramas sem garantia de entrega, ordem ou controle de fluxo. Sem handshake (menor atraso inicial).\n• <b>Cabeçalho UDP:</b> Possui tamanho fixo de apenas <b>8 bytes</b>, dividido em 4 campos de 2 bytes (16 bits) cada:\n  1. Porta de Origem\n  2. Porta de Destino\n  3. Comprimento do Datagrama (mínimo de 8 bytes)\n  4. Checksum (soma de verificação, opcional no IPv4 mas obrigatório no IPv6).\n• <b>Aplicações:</b> DNS, Streaming de Vídeo/Áudio em tempo real, Telefonia IP (VoIP), DHCP, jogos online."
        },
        {
          title: "Transmission Control Protocol (TCP)",
          text: "Protocolo de transporte confiável, orientado a conexão (connection-oriented).\n• <b>Características:</b> Garante entrega em ordem, sem perdas e sem duplicatas. Possui controle de fluxo (via campo Janela de Recepção) e controle de congestionamento.\n• <b>Cabeçalho TCP:</b> Tamanho mínimo de <b>20 bytes</b> (HLEN = 5 na representação de palavras de 32 bits). Contém flags de controle: <b>SYN, ACK, FIN, RST, PSH, URG</b>.\n• <b>Estabelecimento de Conexão (3-way Handshake):</b>\n  1. Cliente envia <b>SYN</b> (com número de sequência aleatório inicial $x$).\n  2. Servidor responde <b>SYN-ACK</b> (com número de sequência inicial $y$ e $Ack = x + 1$).\n  3. Cliente envia <b>ACK</b> (com $Ack = y + 1$ e sequência $x+1$).\n• <b>Encerramento de Conexão:</b> Realizado em 4 etapas usando flags <b>FIN</b> e <b>ACK</b> de forma independente por cada direção de fluxo.\n• <b>Controle de Congestionamento:</b>\n  - <b>Partida Lenta (Slow Start):</b> A janela de congestionamento (cwnd) começa em 1 MSS e dobra a cada RTT (crescimento exponencial) até atingir o limiar (ssthresh).\n  - <b>Evitação de Congestionamento:</b> Crescimento linear (+1 MSS por RTT).\n  - <b>Reação a Perdas:</b> Se houver perda detectada por Timeout, ssthresh cai para metade de cwnd e cwnd reinicia em 1 MSS (reinicia Slow Start). Se por Triplo ACK Duplicado, faz Fast Recovery (cwnd cai para metade + 3 MSS e ssthresh para metade da cwnd anterior, continuando em evitação de congestionamento)."
        }
      ]
    },
    {
      id: 4,
      title: "Camada de Rede",
      color: "var(--color-net)",
      concepts: [
        {
          title: "Endereçamento IPv4, Sub-redes & VLSM",
          text: "• <b>Endereços Classful:</b> Divididos em Classe A (máscara padrão `/8`), Classe B (`/16`), Classe C (`/24`).\n• <b>Sub-redes:</b> Divisão de uma rede maior em blocos menores emprestando bits da parte de host. Ex: Dividir `200.223.226.0/24` em 4 sub-redes exige 2 bits emprestados, alterando a máscara para `/26` (255.255.255.192), gerando sub-redes com 64 IPs (62 hosts úteis devido ao IP de rede e IP de broadcast de cada sub-rede).\n• <b>VLSM (Variable Length Subnet Mask):</b> Técnica de criar sub-redes de tamanhos variáveis para evitar desperdício de endereços. <i>Regra de Ouro:</i> Ordene os requisitos de tamanho de host do maior para o menor, aloque primeiro a maior rede e utilize as sobras sequencialmente com a menor máscara adequada."
        },
        {
          title: "Endereçamento IPv6",
          text: "Desenvolvido para sanar a escassez de IPs do IPv4.\n• <b>Estrutura:</b> Possui <b>128 bits</b> expressos em 8 grupos de 4 dígitos hexadecimais separados por dois-pontos. Ex: `2001:0db8:0000:0000:0000:0000:1428:57ab`.\n• <b>Simplificação:</b> Omitir zeros à esquerda (ex: `0db8` -> `db8`) e substituir uma única cadeia contínua de blocos zerados por `::` (ex: `2001:db8::1428:57ab`).\n• <b>Tipos de Endereço:</b> Unicast, Multicast (ff00::/8) e Anycast. <b>Não existe broadcast no IPv6</b> (tarefas passadas ao multicast).\n• <b>Endereços Especiais:</b> Link-Local (fe80::/10, criado automaticamente para comunicação local não roteável na internet), Loopback (::1) e ULA (Unique Local, fd00::/8, similar ao IP privado).\n• <b>Cabeçalho IPv6:</b> Comprimento fixo de <b>40 bytes</b>. Campos simplificados. O campo <b>Next Header</b> aponta para o protocolo de nível superior (TCP/UDP) ou para cabeçalhos de extensão (Hop-by-Hop, Fragmentação, Roteamento, AH, ESP). Roteadores não fragmentam pacotes em trânsito; se o tamanho exceder o MTU, o pacote é descartado e um ICMPv6 de erro é enviado à origem para ajustar o tamanho (PMTUD)."
        },
        {
          title: "Protocolos de Roteamento",
          text: "Permitem descobrir rotas e preencher tabelas de roteamento automaticamente.\n• <b>Vetor de Distância (RIP):</b> Cada roteador conhece apenas seus vizinhos diretos e envia periodicamente sua tabela de rotas inteira. Baseia-se no algoritmo <b>Bellman-Ford</b>. Usa a métrica de <b>contagem de saltos (hops)</b> com limite máximo de 15 saltos (16 saltos = inalcançável). Envia atualizações a cada 30s usando UDP na porta 520.\n• <b>Estado de Enlace (OSPF):</b> Cada roteador constrói um mapa completo da rede (inundações de link-state packets) e aplica o algoritmo de <b>Dijkstra</b> para computar a árvore de caminhos mais curtos. Métrica baseada em <b>custo (inversamente proporcional à largura de banda)</b>. Suporta roteamento hierárquico estruturado em <b>Áreas</b> (ex: Área 0 - Backbone)."
        }
      ]
    },
    {
      id: 5,
      title: "Camada de Enlace",
      color: "var(--color-link)",
      concepts: [
        {
          title: "Funções Principais",
          text: "A camada de enlace lida com a comunicação nó a nó adjacentes no mesmo enlace físico.\n• <b>Enquadramento (Framing):</b> Delimita o fluxo de bits físicos em quadros inteligíveis (usando flags e caractere stuffing).\n• <b>Detecção e Correção de Erros:</b> Adiciona redundância. Métodos comuns: Bit de Paridade, Checksum e <b>CRC (Cyclic Redundancy Check)</b>.\n• <b>Endereçamento MAC:</b> Endereço físico único de 48 bits (gravado na placa de rede) necessário para mover o quadro na rede local.\n• <b>ARP (Address Resolution Protocol):</b> Protocolo fundamental para mapear um IP conhecido (Camada 3) ao seu respectivo endereço MAC (Camada 2). RARP faz o inverso.\n• <b>VLANs (Virtual LANs):</b> Permitem dividir de forma lógica uma infraestrutura de switches físicos em múltiplos domínios de broadcast independentes, aumentando segurança e reduzindo tráfego indesejado."
        },
        {
          title: "Acesso ao Meio & Dispositivos",
          text: "• <b>CSMA/CD (Carrier Sense Multiple Access / Collision Detection):</b> Usado em redes Ethernet de meio compartilhado. O dispositivo escuta o meio antes de transmitir (Carrier Sense). Se estiver livre, transmite. Se dois transmitirem ao mesmo tempo, ocorre uma <i>colisão</i>, que é detectada (Collision Detection), e ambos recuam por um tempo aleatório exponencial antes de tentar novamente.\n• <b>Token Passing:</b> Método determinístico de acesso onde um frame especial ('token') circula pela rede. Apenas quem possui o token pode transmitir, eliminando colisões. Ex: Redes Token Ring.\n• <b>Diferenças entre Equipamentos:</b>\n  - <b>Hub:</b> Dispositivo da camada física (Camada 1). Apenas repete o sinal elétrico em broadcast para todas as portas. Cria um único domínio de colisão e um único domínio de broadcast.\n  - <b>Switch:</b> Dispositivo da camada de enlace (Camada 2). Lê os endereços MAC de destino e comuta o quadro diretamente à porta correta. Cada porta do switch é um domínio de colisão independente, mas todos compartilham o mesmo domínio de broadcast.\n  - <b>Roteador:</b> Dispositivo da camada de rede (Camada 3). Lê endereços IP de destino e encaminha pacotes entre redes diferentes. Segmenta tanto domínios de colisão quanto domínios de broadcast."
        }
      ]
    },
    {
      id: 6,
      title: "Programação em Rede",
      color: "var(--color-java)",
      concepts: [
        {
          title: "Sockets TCP em Java",
          text: "Sockets TCP estabelecem conexões confiáveis e bidirecionais orientadas a fluxo de dados (streams):\n• <b>Lado Servidor:</b> Cria um objeto `ServerSocket` escutando em uma porta e aguarda conexões via método `.accept()`, que bloqueia a execução até uma conexão cliente chegar, retornando um objeto `Socket` dedicado.\n• <b>Lado Cliente:</b> Cria um objeto `Socket` informando o IP do servidor e a porta de conexão. Realiza a conexão imediatamente.\n• <b>Comunicação:</b> Ambos usam `InputStream` para ler e `OutputStream` para escrever dados na rede. A conexão deve ser fechada com `.close()`.\n\n<i>Regra de Execução:</i> O servidor TCP <b>deve</b> ser executado antes do cliente, pois o cliente falhará imediatamente ao tentar se conectar a uma porta onde não há nenhum servidor escutando ativamente."
        },
        {
          title: "Sockets UDP em Java",
          text: "UDP é orientado a datagramas sem conexão física:\n• <b>Lógica:</b> Não há handshake nem streams. Ambos os lados criam instâncias de `DatagramSocket`.\n• <b>Comunicação:</b> Os dados são encapsulados em objetos `DatagramPacket` (especificando os dados, tamanho, endereço IP de destino e porta). São transmitidos através do método `.send()` e recebidos com `.receive()`.\n\n<i>Regra de Execução:</i> O cliente UDP <b>pode</b> ser executado antes do servidor porque o envio UDP não realiza handshake ou validação de estado na origem (o socket apenas joga o datagrama na rede sem verificar se há um servidor ouvindo)."
        }
      ]
    }
  ],

  flashcards: [
    { term: "Porta 53", definition: "Porta utilizada pelo serviço DNS (Domain Name System), prioritariamente rodando sobre UDP." },
    { term: "Porta 25", definition: "Porta padrão tradicional do protocolo SMTP para transferência de e-mails entre servidores de e-mail." },
    { term: "Porta 587", definition: "Porta padrão recomendada para submissão autenticada de e-mails por agentes clientes ao servidor SMTP." },
    { term: "Porta 110", definition: "Porta padrão utilizada pelo protocolo POP3 para recebimento e download de e-mails do servidor." },
    { term: "Porta 143", definition: "Porta padrão utilizada pelo protocolo IMAP para leitura e sincronização estruturada de pastas de e-mail no servidor." },
    { term: "Next Header", definition: "Campo do cabeçalho IPv6 de 8 bits que aponta para o tipo do próximo cabeçalho de extensão ou para o protocolo de camada superior (TCP/UDP)." },
    { term: "Link-Local", definition: "Tipo de endereço IPv6 com escopo limitado à rede local (iniciado por fe80::/10), criado automaticamente em cada interface e não roteável na Internet." },
    { term: "Checksum", definition: "Soma de verificação de redundância matemática usada nas camadas de enlace, rede (IPv4) ou transporte (TCP/UDP) para detecção de erros em trânsito." },
    { term: "Métrica RIP", definition: "Métrica utilizada pelo protocolo RIP baseada na contagem de saltos (hops), possuindo limite máximo de 15 saltos (16 saltos indica destino inacessível)." },
    { term: "Métrica OSPF", definition: "Métrica baseada em custo computado pela fórmula Custo = Banda de Referência / Banda do Enlace. Quanto maior a largura de banda, menor o custo." },
    { term: "ARP", definition: "Address Resolution Protocol. Protocolo que opera entre as camadas de rede e enlace para mapear um IP conhecido a um endereço MAC correspondente." },
    { term: "CSMA/CD", definition: "Carrier Sense Multiple Access with Collision Detection. Protocolo de acesso ao meio usado em redes Ethernet compartilhadas para detectar e reagir a colisões." },
    { term: "Dijkstra", definition: "Algoritmo de caminho mais curto utilizado por protocolos de roteamento de estado de enlace (como OSPF) para calcular a tabela de rotas ideais." },
    { term: "Bellman-Ford", definition: "Algoritmo de vetor de distância utilizado por protocolos de roteamento como RIP para determinar rotas por meio do menor custo informado pelos vizinhos." }
  ],

  matchingData: {
    protocols: [
      { name: "HTTP", layer: "Aplicação", info: "Porta 80" },
      { name: "DNS", layer: "Aplicação", info: "Porta 53" },
      { name: "SMTP", layer: "Aplicação", info: "Porta 25/587" },
      { name: "TCP", layer: "Transporte", info: "Conexão confiável" },
      { name: "UDP", layer: "Transporte", info: "Sem conexão" },
      { name: "IP", layer: "Rede", info: "Endereçamento/Roteamento" },
      { name: "ICMP", layer: "Rede", info: "Mensagens de diagnóstico/Ping" },
      { name: "ARP", layer: "Enlace", info: "Mapeamento IP -> MAC" },
      { name: "Ethernet", layer: "Enlace", info: "CSMA/CD / Quadros MAC" }
    ]
  },

  questions: [
    {
      id: 1,
      module: 1,
      type: "multiple-choice",
      question: "Quais são as camadas do modelo de referência OSI da ISO que NÃO estão presentes na pilha TCP/IP padrão, tendo suas funções integradas na camada de aplicação do TCP/IP?",
      options: [
        "Sessão e Apresentação",
        "Transporte e Rede",
        "Enlace e Física",
        "Apresentação e Transporte"
      ],
      correctAnswer: 0,
      explanation: "As camadas de Sessão (responsável pelo diálogo e sincronismo de conexões) e Apresentação (sintaxe, semântica, compressão e criptografia) pertencem ao modelo OSI, mas na arquitetura TCP/IP, as funções dessas camadas são implementadas diretamente pelas aplicações (Camada de Aplicação)."
    },
    {
      id: 2,
      module: 1,
      type: "calculation",
      question: "Considere dois roteadores conectados diretamente através de um link de 5000 km, com velocidade de propagação de 2,5 x 10^8 m/s e velocidade de transmissão de 1 Mbps. Quanto tempo leva para mover um pacote de 1000 bytes de um roteador para o outro?",
      explanation: "O tempo total é a soma do Atraso de Transmissão ($d_{trans}$) e do Atraso de Propagação ($d_{prop}$).\n\n1. Tamanho do pacote $L = 1000$ bytes $= 8000$ bits.\n2. Taxa de transmissão $R = 1$ Mbps $= 1.000.000$ bits/s.\n3. Distância $d = 5000$ km $= 5.000.000$ metros.\n4. Velocidade $s = 2,5 \\times 10^8$ m/s.\n\n$d_{trans} = L/R = 8000 / 1.000.000 = 0,008$ segundos $= 8$ ms.\n$d_{prop} = d/s = 5.000.000 / 250.000.000 = 0,02$ segundos $= 20$ ms.\n\nTotal = $8$ ms $+ 20$ ms $= 28$ ms.",
      correctAnswer: "28",
      calculationSteps: "Atraso total = d_trans + d_prop\n• d_trans = L / R = (1000 bytes * 8 bits/byte) / 1.000.000 bps = 0,008s (8 ms)\n• d_prop = d / s = 5.000.000m / 250.000.000 m/s = 0,02s (20 ms)\n• Total = 8 ms + 20 ms = 28 ms"
    },
    {
      id: 3,
      module: 1,
      type: "true-false",
      question: "O atraso de transmissão representa o tempo que um único bit leva para viajar de um roteador ao outro no meio físico, enquanto o atraso de propagação é o tempo necessário para colocar todo o pacote no link de transmissão.",
      correctAnswer: false,
      explanation: "A afirmação inverte as definições: Atraso de transmissão é o tempo para colocar todos os bits do pacote no enlace ($L/R$). Atraso de propagação é o tempo que um bit leva para viajar pela distância do enlace físico ($d/s$)."
    },
    {
      id: 4,
      module: 1,
      type: "multiple-choice",
      question: "Qual é o número de conexões físicas necessárias ao considerar uma topologia de rede em malha completamente conectada para N máquinas?",
      options: [
        "N",
        "N + 1",
        "N(N-1) / 2",
        "N(N-1)"
      ],
      correctAnswer: 2,
      explanation: "Em uma topologia em malha completamente conectada, cada um dos N dispositivos deve possuir um link físico dedicado para cada um dos outros N-1 dispositivos. Como a conexão entre A e B é a mesma que entre B e A, dividimos o resultado por 2, resultando na fórmula N(N-1)/2."
    },
    {
      id: 5,
      module: 1,
      type: "calculation",
      question: "Quanto tempo leva para transmitir um arquivo de 843.435 bits de um host A a um host B em uma rede de comutação de circuitos com TDM, sabendo que todos os enlaces possuem taxa de 2 Mbps, são 20 slots por quadro TDM e são necessários 1,1 segundo para estabelecer a conexão do circuito antes do envio?",
      explanation: "Na comutação de circuitos TDM com 20 slots por quadro em um enlace de 2 Mbps:\n1. A taxa efetiva alocada ao circuito é de R_ef = 2 Mbps / 20 slots = 100.000 bps.\n2. O tempo de transmissão do arquivo é T_trans = Tamanho / R_ef = 843.435 bits / 100.000 bps = 8,43435 segundos.\n3. O atraso total leva em conta o tempo de estabelecimento da conexão inicial (1,1s).\nTotal = 1,1s + 8,43435s = 9,53435 segundos.",
      correctAnswer: "9.53",
      calculationSteps: "1. Banda efetiva = 2.000.000 bps / 20 = 100.000 bps\n2. Tempo de envio do arquivo = 843.435 bits / 100.000 bps = 8,43435 s\n3. Tempo de estabelecimento = 1,1 s\n4. Tempo total = 1,1 + 8,43435 = 9,53435 s (aprox 9.53s)"
    },
    {
      id: 6,
      module: 2,
      type: "multiple-choice",
      question: "Qual registro DNS estabelece a correspondência entre um nome canônico (alias) e um endereço IPv4 básico de host?",
      options: [
        "Registro MX",
        "Registro CNAME",
        "Registro A",
        "Registro PTR"
      ],
      correctAnswer: 2,
      explanation: "O registro básico que traduz um hostname padrão para um IP é o Registro A. O CNAME é usado para criar aliases (apelidos) de hostnames existentes, enquanto o MX aponta para servidores de e-mail e o PTR é usado para resoluções reversas (IP para nome)."
    },
    {
      id: 7,
      module: 2,
      type: "multiple-choice",
      question: "Qual protocolo da camada de aplicação do modelo TCP/IP gerencia o envio de e-mails entre servidores na internet e qual porta ele utiliza tradicionalmente para essa tarefa?",
      options: [
        "IMAP na porta 143",
        "POP3 na porta 110",
        "SMTP na porta 25",
        "HTTP na porta 80"
      ],
      correctAnswer: 2,
      explanation: "O SMTP (Simple Mail Transfer Protocol) é o protocolo padrão para envio e transferência de e-mails entre servidores, utilizando a porta 25 tradicionalmente. O IMAP e o POP3 são protocolos utilizados para a recuperação (recebimento) de e-mails pelos clientes finais."
    },
    {
      id: 8,
      module: 2,
      type: "true-false",
      question: "A diferença fundamental entre os protocolos de e-mail POP3 e IMAP é que o POP3 normalmente baixa os e-mails para a máquina local do usuário e os remove do servidor, enquanto o IMAP mantém as mensagens centralizadas no servidor e sincroniza pastas entre múltiplos dispositivos.",
      correctAnswer: true,
      explanation: "Correto. O POP3 é um protocolo 'ler-e-apagar' por padrão, operando localmente no cliente. O IMAP trabalha centralizado no servidor, permitindo sincronização em tempo real de lidos/não lidos e organização em pastas visíveis em qualquer dispositivo conectado."
    },
    {
      id: 9,
      module: 2,
      type: "calculation",
      question: "Você recebeu uma mensagem codificada em Base64 com o conteúdo 'SGVsbG8='. Ao decodificar essa string, quantos bytes de dados originais em texto ASCII ela representava?",
      explanation: "No Base64, cada caractere representa 6 bits de informação. Uma string de 8 caracteres codificados representa 8 * 6 = 48 bits (6 bytes).\nAqui, a string de entrada 'SGVsbG8=' tem 7 caracteres + 1 de preenchimento ('='), totalizando 8 caracteres de representação. \nA string útil é 'SGVsbG8', contendo 6 caracteres úteis. Cada caractere útil carrega 6 bits. 6 * 6 = 36 bits. \n36 bits equivalem a 4.5 bytes, mas como a codificação Base64 agrupa de 3 em 3 bytes (gerando 4 caracteres), o bloco 'SGVsbG8=' possui o padding '=' no final que sinaliza que sobrou 1 caractere a menos de bits significativos.\nEspecificamente, a palavra decodificada é 'Hello', que possui 5 bytes (5 letras ASCII de 8 bits cada: H-e-l-l-o).",
      correctAnswer: "5",
      calculationSteps: "1. A string útil 'SGVsbG8=' decodifica para 'Hello'\n2. Cada letra em texto padrão (H, e, l, l, o) representa 1 byte ASCII\n3. Portanto, a saída decodificada contém exatamente 5 bytes."
    },
    {
      id: 10,
      module: 2,
      type: "true-false",
      question: "Na resolução de nomes DNS, a consulta recursiva ocorre quando o servidor DNS consultado assume a responsabilidade de obter a resposta final, comunicando-se com outros servidores em nome do cliente e retornando a resposta final consolidada.",
      correctAnswer: true,
      explanation: "Correto. Na consulta recursiva, o servidor atua como um intermediário ativo e faz todo o trabalho de pesquisa até conseguir o IP, enquanto na consulta iterativa o servidor apenas devolve referências (dicas) de outros servidores de nomes para que o cliente continue perguntando."
    },
    {
      id: 11,
      module: 3,
      type: "multiple-choice",
      question: "Qual é o tamanho total fixo do cabeçalho do protocolo de transporte UDP em bytes?",
      options: [
        "20 bytes",
        "16 bytes",
        "8 bytes",
        "32 bytes"
      ],
      correctAnswer: 2,
      explanation: "O cabeçalho do protocolo UDP possui tamanho fixo de 8 bytes. Ele contém exatamente 4 campos de 16 bits (2 bytes) cada: Porta de Origem, Porta de Destino, Comprimento Total (cabeçalho + dados) e Checksum de verificação."
    },
    {
      id: 12,
      module: 3,
      type: "multiple-choice",
      question: "Durante o estabelecimento de conexão TCP (3-way handshake), quais flags de controle do cabeçalho são ativadas no primeiro e no segundo segmentos transmitidos, respectivamente?",
      options: [
        "1º: SYN | 2º: SYN e ACK",
        "1º: SYN | 2º: ACK",
        "1º: SYN-ACK | 2º: ACK",
        "1º: FIN | 2º: ACK"
      ],
      correctAnswer: 0,
      explanation: "No handshake de 3 vias do TCP:\n1. O cliente envia um segmento contendo a flag SYN (solicitação de sincronia).\n2. O servidor aceita e responde com as flags SYN e ACK ativadas simultaneamente (confirmação da solicitação + sua própria sincronia).\n3. O cliente finaliza enviando apenas a flag ACK de confirmação."
    },
    {
      id: 13,
      module: 3,
      type: "true-false",
      question: "No protocolo TCP, o campo 'Janela' (Window Size) no cabeçalho é usado principalmente para o controle de congestionamento na rede local.",
      correctAnswer: false,
      explanation: "O campo 'Janela' no cabeçalho TCP é usado para o controle de fluxo (flow control), informando o tamanho do buffer disponível no receptor para evitar que o transmissor envie dados mais rápido do que o receptor consegue ler da rede. O controle de congestionamento, por outro lado, é mantido dinamicamente pelo transmissor através da janela de congestionamento (cwnd), que não é um campo do cabeçalho."
    },
    {
      id: 14,
      module: 3,
      type: "calculation",
      question: "Um cabeçalho UDP dumpado em formato hexadecimal exibe os seguintes 8 bytes: '06 32 00 0D 00 1C E2 17'. Qual é o número decimal da porta de destino deste datagrama?",
      explanation: "O cabeçalho UDP é dividido em campos de 2 bytes (4 dígitos hexadecimais):\n• Bytes 1-2: Porta de Origem -> '06 32'\n• Bytes 3-4: Porta de Destino -> '00 0D'\n• Bytes 5-6: Comprimento -> '00 1C'\n• Bytes 7-8: Checksum -> 'E2 17'\n\nConvertendo '00 0D' em hexadecimal para decimal:\n$000D_{hex} = 0 \\times 16^3 + 0 \\times 16^2 + 0 \\times 16^1 + 13 \\times 16^0 = 13$. Porta de destino é 13.",
      correctAnswer: "13",
      calculationSteps: "1. Identificar o campo Porta de Destino nos bytes 3 e 4: '00 0D' em hexadecimal.\n2. Converter de hexadecimal para decimal:\n   - D em hexadecimal equivale a 13 em decimal.\n3. Portanto, a porta de destino decimal é 13."
    },
    {
      id: 15,
      module: 3,
      type: "calculation",
      question: "Considere uma conexão TCP estabelecida. O host B recebeu até o byte 126 enviado por A. Suponha que o host A envie dois segmentos para B sucessivamente. O primeiro possui 50 bytes de dados (número de sequência = 127). O segundo possui 70 bytes de dados. Qual é o número de sequência do segundo segmento enviado por A?",
      explanation: "No TCP, o número de sequência de um segmento aponta para o número do primeiro byte de dados que ele transporta.\nO primeiro segmento começa em 127 e carrega 50 bytes de dados, cobrindo a faixa de bytes de 127 a 176 (127 + 50 - 1 = 176).\nO segundo segmento começará imediatamente no byte seguinte livre, ou seja, no byte número 177. E transportará de 177 a 246 (70 bytes).",
      correctAnswer: "177",
      calculationSteps: "1. Seq do 1º segmento = 127\n2. Bytes carregados no 1º segmento = 50\n3. Próximo Seq (Seq do 2º segmento) = Seq anterior + bytes anteriores = 127 + 50 = 177."
    },
    {
      id: 16,
      module: 4,
      type: "multiple-choice",
      question: "Qual das seguintes características descreve corretamente a diferença entre o cabeçalho base do IPv6 em comparação com o cabeçalho do IPv4?",
      options: [
        "O IPv6 possui cabeçalho de comprimento fixo (40 bytes), removendo o checksum para acelerar o roteamento.",
        "O IPv6 aumentou o tamanho do cabeçalho de forma variável para suportar opções nativas em todos os pacotes.",
        "O IPv6 manteve o campo checksum e adicionou suporte a broadcast obrigatório.",
        "O IPv6 não possui nenhum mecanismo de fragmentação de pacotes, mesmo por parte do host de origem."
      ],
      correctAnswer: 0,
      explanation: "O cabeçalho do IPv6 possui um tamanho fixo de 40 bytes (diferente do cabeçalho variável do IPv4 de 20-60 bytes). Vários campos opcionais do IPv4 foram removidos ou movidos para cabeçalhos de extensão opcionais, incluindo o campo checksum da camada de rede, simplificando o processamento de pacotes por roteadores em trânsito."
    },
    {
      id: 17,
      module: 4,
      type: "calculation",
      question: "Para o endereço IP 192.168.10.33 com máscara de sub-rede 255.255.255.224 (/27), qual é o endereço de rede em formato decimal pontuado ao qual este host pertence?",
      explanation: "A máscara 255.255.255.224 (/27) indica sub-redes com blocos de tamanho 32 IPs (256 - 224 = 32).\nAs sub-redes nessa faixa de Classe C começam em múltiplos de 32:\n• Sub-rede 0: 192.168.10.0 a .31\n• Sub-rede 1: 192.168.10.32 a .63\n• Sub-rede 2: 192.168.10.64 a .95\n\nComo o IP do host é 192.168.10.33, ele cai dentro do intervalo da Sub-rede 1, que possui como IP de rede o primeiro endereço: 192.168.10.32.",
      correctAnswer: "192.168.10.32",
      calculationSteps: "1. Tamanho do bloco de sub-rede = 256 - 224 (último octeto da máscara) = 32 IPs.\n2. Sub-redes válidas: .0, .32, .64, .96...\n3. O IP de host .33 está no intervalo de 32 a 63.\n4. Portanto, o endereço de rede é 192.168.10.32."
    },
    {
      id: 18,
      module: 4,
      type: "true-false",
      question: "Na transição de redes do IPv4 para o IPv6, a técnica conhecida como Tunelamento (Tunneling) consiste em encapsular um pacote IPv6 completo dentro do payload de um pacote IPv4 para transportá-lo através de roteadores intermediários que suportam apenas IPv4.",
      correctAnswer: true,
      explanation: "Correto. O tunelamento é uma técnica chave de transição onde o pacote IPv6 é colocado como carga útil (payload) de um pacote IPv4 padrão, permitindo que ele passe por trechos da rede que ainda não suportam IPv6 nativamente até chegar a um roteador/host compatível."
    },
    {
      id: 19,
      module: 4,
      type: "multiple-choice",
      question: "Qual protocolo de roteamento da Internet baseia-se em algoritmos de Estado de Enlace (Link State), utiliza o algoritmo de Dijkstra para computar a árvore de menor caminho e tem como métrica principal o custo inversamente proporcional à largura de banda?",
      options: [
        "RIP (Routing Information Protocol)",
        "OSPF (Open Shortest Path First)",
        "BGP (Border Gateway Protocol)",
        "Bellman-Ford Protocol"
      ],
      correctAnswer: 1,
      explanation: "O OSPF é o principal protocolo interno de estado de enlace, que constrói um banco de dados completo da topologia da rede e aplica o algoritmo de Dijkstra para computar rotas ótimas baseando-se no custo das interfaces. O RIP, por outro lado, é do tipo vetor de distância e usa número de saltos como métrica."
    },
    {
      id: 20,
      module: 4,
      type: "calculation",
      question: "Um bloco CIDR de endereços é concedido a uma pequena empresa. Sabemos que um dos endereços é 205.16.37.39/28. Encontre a quantidade total de endereços IP presentes neste bloco (incluindo rede e broadcast).",
      explanation: "A notação /28 indica que 28 bits são usados para a rede, restando 4 bits para a identificação de hosts dentro do bloco (32 - 28 = 4 bits).\nO número total de endereços IP do bloco é calculado por $2^{bits\\_de\\_host} = 2^4 = 16$ endereços no total.",
      correctAnswer: "16",
      calculationSteps: "1. Bits de rede = 28.\n2. Bits de host = 32 - 28 = 4 bits.\n3. Total de endereços = 2^4 = 16 endereços."
    },
    {
      id: 21,
      module: 5,
      type: "multiple-choice",
      question: "Na camada de enlace, qual é a principal diferença no comportamento de domínio de colisão e broadcast entre um Hub e um Switch?",
      options: [
        "O Hub cria um único domínio de colisão e de broadcast. O Switch cria múltiplos domínios de colisão independentes (um por porta), mas todos compartilham o mesmo domínio de broadcast.",
        "O Switch elimina os domínios de broadcast, isolando o tráfego de rede completamente por porta física.",
        "O Hub divide a rede em domínios de colisão e o Switch atua apenas repetindo o sinal elétrico em todas as portas.",
        "Não existe diferença de domínios entre eles, pois ambos operam na mesma camada física do modelo OSI."
      ],
      correctAnswer: 0,
      explanation: "O Hub opera na Camada 1 (Física) apenas replicando eletricamente o sinal para todas as portas, mantendo um único domínio de colisão e broadcast. O Switch opera na Camada 2 (Enlace), filtrando tráfego via endereços MAC. Cada porta de um switch representa um domínio de colisão isolado. No entanto, o switch ainda repassa mensagens de broadcast (ex: ARP) para todas as portas, mantendo um único domínio de broadcast."
    },
    {
      id: 22,
      module: 5,
      type: "true-false",
      question: "O protocolo ARP (Address Resolution Protocol) é responsável por descobrir o endereço IP correspondente a um determinado endereço físico MAC já conhecido pelo host de origem.",
      correctAnswer: false,
      explanation: "O ARP faz o contrário: ele é usado para descobrir o endereço físico MAC correspondente a um endereço lógico IP conhecido. Quando o host conhece o IP físico de destino, mas não sabe o endereço de hardware MAC para montar o frame Ethernet, ele envia uma requisição ARP em broadcast solicitando que o dono daquele IP responda com o seu MAC."
    },
    {
      id: 23,
      module: 5,
      type: "multiple-choice",
      question: "Qual método de acesso ao meio é caracterizado pelo uso de um sinal de controle circulante que garante exclusividade de transmissão de dados ao host portador, eliminando completamente a ocorrência de colisões na rede local?",
      options: [
        "CSMA/CD",
        "CSMA/CA",
        "Token Passing",
        "Polling dinâmico"
      ],
      correctAnswer: 2,
      explanation: "O Token Passing circula um token de controle na rede de forma ordenada. Somente o dispositivo que capturar e possuir o token pode transmitir dados no meio físico, o que previne qualquer tipo de colisão. CSMA/CD permite colisões e foca em detectá-las e tratá-las."
    },
    {
      id: 24,
      module: 6,
      type: "true-false",
      question: "Na programação de sockets em Java, ao implementar uma conexão baseada em TCP, o programa servidor deve obrigatoriamente ser executado e colocado para escutar antes do cliente tentar realizar o método de conexão.",
      correctAnswer: true,
      explanation: "Verdadeiro. O TCP é orientado à conexão confiável. Quando o cliente tenta instanciar `new Socket(host, porta)`, o sistema operacional tenta realizar o handshake de 3 vias imediatamente. Se o servidor não estiver rodando na porta de destino, o handshake falhará e o Java lançará uma exceção do tipo `ConnectException` imediatamente. No UDP, por ser sem conexão, o cliente pode disparar datagramas mesmo sem servidor ativo."
    },
    {
      id: 25,
      module: 6,
      type: "multiple-choice",
      question: "Qual classe Java é utilizada no lado do servidor para abrir uma porta específica e aguardar por solicitações de conexões de clientes rodando sobre sockets TCP?",
      options: [
        "Socket",
        "ServerSocket",
        "DatagramSocket",
        "DatagramPacket"
      ],
      correctAnswer: 1,
      explanation: "Em Java, a classe `ServerSocket` é usada no servidor para escutar uma porta de rede e aceitar conexões TCP com o método `.accept()`. A classe `Socket` representa a conexão em si após estabelecida, tanto no cliente quanto no servidor. `DatagramSocket` e `DatagramPacket` são usados para conexões UDP."
    }
  ]
};
