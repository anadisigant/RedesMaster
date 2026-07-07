const SIMULADO_FINAL_DB = [
  {
    id: 1,
    question: "Os modelos de referência TCP/IP e OSI possuem camadas, cabendo a cada uma delas uma função bem definida. A camada de Aplicação del modelo TCP/IP agrupa funções que correspondem a quais camadas do modelo OSI?",
    options: [
      "A) Transporte e Rede.",
      "B) Aplicação e Sessão.",
      "C) Sessão, Apresentação e Aplicação.",
      "D) Rede, Enlace e Física.",
      "E) Aplicação e Apresentação."
    ],
    correctAnswer: 2,
    explanation: "A camada de Aplicação do TCP/IP agrega protocolos e semânticas que o modelo de referência clássico OSI dividiu minunciosamente em Aplicação, Sessão (pontos de sincronismo) e Apresentação (sintaxe e compressão de dados)."
  },
  {
    id: 2,
    question: "A comutação de pacotes oferece uma vantagem estrutural e de eficiência sobre a comutação de mensagens na Internet. Qual é a principal justificativa teórica para essa vantagem?",
    options: [
      "A) Exige um caminho físico dedicado de ponta a ponta.",
      "B) Garante que os pacotes sempre cheguem ordenados e sem perda.",
      "C) Divide as mensagens em pedaços menores, permitindo paralelismo (pipeline) e melhor utilização dos recursos da rede.",
      "D) É mais lenta no repasse, porém criptografa o meio físico em cada salto.",
      "E) Evita o uso de buffers nos roteadores, eliminando o atraso de enfileiramento."
    ],
    correctAnswer: 2,
    explanation: "A comutação de pacotes divide massivamente o fluxo da aplicação permitindo que blocos e recursos de rede sejam multiplexados estatisticamente sob demanda (uso de pipelines / trânsitos em paralelo em diferentes nós) gerando eficiência muito maior no uso da rede real quando comparada com o engessamento de mensagens ou reservas estritas de comutação."
  },
  {
    id: 3,
    question: "Qual é a principal vantagem que justifica o amplo uso de cabos de cobre de par trançado em redes locais (LANs) de computadores, em contraste com o uso de fibra óptica até as estações de trabalho?",
    options: [
      "A) Maior largura de banda em comparação com a fibra óptica multimodo.",
      "B) Imunidade total a interferências eletromagnéticas (EMI).",
      "C) Capacidade de transmitir sinais a distâncias oceânicas sem repetidores.",
      "D) Menor custo e enorme facilidade de instalação.",
      "E) Utilização do princípio de reflexão total interna no núcleo do fio."
    ],
    correctAnswer: 3,
    explanation: "O principal fator para o domínio do par trançado de cobre (UTP) até a estação de trabalho é o baixo custo de aquisição de cabos e equipamentos (placas NIC, switches) somado à enorme facilidade física de instalação, crimpagem e manutenção do cabeamento quando comparado à fibra óptica."
  },
  {
    id: 4,
    question: "Nas redes locais Ethernet tradicionais baseadas em barramento, múltiplos dispositivos compartilham o mesmo meio físico. Para lidar com acessos simultâneos, essas redes utilizam o protocolo CSMA/CD. O que ocorre nesse protocolo logo após uma colisão ser detectada pelas placas de rede?",
    options: [
      "A) As transmissões são imediatamente abortadas e as placas enviam um sinal de reforço (jam signal) para garantir que todos percebam a colisão.",
      "B) Os quadros são automaticamente corrigidos pela camada de rede usando bits de paridade de bidimensional.",
      "C) As placas continuam transmitindo até o fim do quadro, mas o receptor inverte o checksum.",
      "D) O roteador da rede aloca uma nova frequência de banda (FDM) para os hosts colidentes.",
      "E) Um token de permissão é gerado e passado para a máquina com o menor endereço MAC."
    ],
    correctAnswer: 0,
    explanation: "No CSMA/CD, assim que a colisão é detectada pelas placas transmissoras concorrentes, a transmissão do quadro é imediatamente interrompida e é transmitido um sinal de reforço (jam signal) de colisão para garantir que todas as outras placas na rede detectem a colisão e entrem no algoritmo de recuo exponencial (backoff)."
  },
  {
    id: 5,
    question: "Na camada de enlace, dispositivos como Hubs e Switches (Comutadores) tratam o fluxo de dados de formas diferentes. Qual das opções abaixo define corretamente uma característica fundamental do Switch Ethernet?",
    options: [
      "A) O Switch opera apenas na camada física e inunda todas as portas com os sinais elétricos que recebe.",
      "B) O Switch cria um único e enorme domínio de colisão compartilhado entre todas as suas portas.",
      "C) O Switch utiliza o protocolo de roteamento OSPF para definir o caminho mais curto na sub-rede.",
      "D) O Switch possui uma tabela de comutação construída via autoaprendizagem e repassa o quadro de forma seletiva utilizando endereços MAC.",
      "E) O Switch altera o endereço IP de origem do quadro antes de enviá-lo ao destino final."
    ],
    correctAnswer: 3,
    explanation: "O Switch Ethernet opera na camada de enlace (Camada 2) e constrói dinamicamente uma tabela de comutação baseada no autoaprendizado de endereços MAC (lendo os campos de origem dos quadros recebidos), o que permite o encaminhamento seletivo e direto de quadros unicast, isolando os domínios de colisão por porta."
  },
  {
    id: 6,
    question: "No modelo de comunicação da Internet, para que um hospedeiro consiga enviar um quadro Ethernet contendo um datagrama IP a outro hospedeiro ou roteador na mesma rede local, ele precisa saber o endereço físico (MAC) do destino. Qual protocolo é responsável por descobrir esse endereço?",
    options: [
      "A) DNS (Domain Name System).",
      "B) ICMP (Internet Control Message Protocol).",
      "C) ARP (Address Resolution Protocol).",
      "D) DHCP (Dynamic Host Configuration Protocol).",
      "E) BGP (Border Gateway Protocol)."
    ],
    correctAnswer: 2,
    explanation: "O ARP (Address Resolution Protocol) mapeia um endereço lógico de IP da camada de rede para o correspondente endereço físico MAC da camada de enlace dentro da mesma rede local localizando quem é o proprietário do IP solicitado via mensagens de broadcast."
  },
  {
    id: 7,
    question: "O protocolo PPP (Point-to-Point Protocol) foi amplamente utilizado para conectar usuários domésticos a provedores de acesso (ISPs) via enlaces discados. É uma característica ou serviço implementado no projeto do PPP:",
    options: [
      "A) O uso do protocolo CSMA/CA para lidar com colisões no cabo telefônico.",
      "B) A capacidade de detectar erros no quadro, mas sem realizar a correção ou recuperação automática de erros.",
      "C) O roteamento multicast baseado no protocolo PIM (Protocol Independent Multicast).",
      "D) A necessidade de múltiplos endereços MAC explícitos para lidar com o meio broadcast subjacente.",
      "E) O estabelecimento de um circuito virtual fixo na camada de transporte."
    ],
    correctAnswer: 1,
    explanation: "O PPP inclui detecção de erros no enquadramento (via checksum do campo FCS), contudo ele é um serviço não confiável na camada de enlace: quando detecta um erro, ele apenas descarta o quadro corrompido sem retransmiti-lo nem tentar recuperá-lo, deixando a confiabilidade de dados para a camada de transporte (TCP)."
  },
  {
    id: 8,
    question: "O modelo de serviço da Camada de Rede da Internet é caracterizado como uma rede de datagramas. Qual a implicação direta dessa arquitetura no núcleo da rede?",
    options: [
      "A) Os roteadores devem estabelecer uma chamada (setup) antes de permitir que os pacotes fluam de ponta a ponta.",
      "B) Recursos de banda e buffers são estritamente reservados ao longo do caminho, garantindo taxa de transferência constante.",
      "C) Não há conceito em nível de rede de uma \"conexão\", e os roteadores não mantêm estado sobre conexões fim a fim, repassando pacotes isoladamente usando o endereço do destino.",
      "D) O roteador atua transportando mensagens entre processos de aplicação por meio de portas virtuais.",
      "E) O serviço garante limite máximo de atraso e entrega sem perdas."
    ],
    correctAnswer: 2,
    explanation: "Em uma rede de datagramas (como o IP), não há reserva prévia de recursos ou estabelecimento de conexão em nível de rede. Roteadores são dispositivos stateless sobre as conexões de aplicação, tratando e encaminhando cada pacote de forma independente de acordo com o endereço de destino contido no cabeçalho."
  },
  {
    id: 9,
    question: "O IPv6 foi desenvolvido para sanar as limitações do IPv4. Uma mudança arquitetural de desempenho no cabeçalho e processamento do IPv6 em relação ao IPv4 diz respeito à fragmentação de pacotes. No IPv6:",
    options: [
      "A) A fragmentação é realizada por qualquer roteador intermediário que detecte um pacote maior que o MTU do próximo enlace.",
      "B) A fragmentação é realizada apenas no hospedeiro de origem; roteadores intermediários não fragmentam pacotes.",
      "C) A fragmentação ocorre de forma transparente na camada de enlace (Ethernet) e o cabeçalho IP não se envolve.",
      "D) Não há mais fragmentação, exigindo que todas as aplicações Web limitem seus dados a 1500 bytes.",
      "E) A fragmentação é substituída por túneis IPsec entre todos os hospedeiros."
    ],
    correctAnswer: 1,
    explanation: "Para a evolução de processamento de roteadores no núcleo, a fragmentação restringe-se exclusivamente na origem no IPv6; não é executada (nem permitida) em roteadores intermediários."
  },
  {
    id: 10,
    question: "Ao se observar os campos do cabeçalho IPv6 e compará-los com o IPv4, nota-se que o campo que indicava qual o protocolo da camada superior (como TCP ou UDP) encapsulado no payload mudou de nome. No IPv6, esse campo equivalente ao campo \"Protocolo\" do IPv4 é chamado de:",
    options: [
      "A) Flow Label.",
      "B) Traffic Class.",
      "C) Next Header.",
      "D) Hop Limit.",
      "E) Time to Live (TTL)."
    ],
    correctAnswer: 2,
    explanation: "Como abordado nas listas base de conversões comparativas (Questões IPv4 e IPv6), a informação Next Header atende exatamente à função e compatibilidade retroativa para apontar de forma similar o tipo de dado de camada mais alta (TCP, etc.) que seguem embutidos adiante (Campo Protocolo do IPv4)."
  },
  {
    id: 11,
    question: "Existem diversos protocolos de roteamento na arquitetura da Internet (como OSPF, RIP e BGP). Sobre o BGP (Border Gateway Protocol), é correto afirmar que sua principal função no núcleo da rede é:",
    options: [
      "A) O roteamento intra-AS focado exclusivamente na descoberta do caminho de menor custo computacional (estado de enlace).",
      "B) O roteamento inter-AS baseado ativamente em políticas administrativas, interesses econômicos e atributos de caminho, e não apenas no desempenho ou distância.",
      "C) O mapeamento local de endereços IPv4 para endereços físicos MAC nas bordas da rede.",
      "D) A fragmentação de datagramas longos antes de entrarem em Sistemas Autônomos (AS) concorrentes.",
      "E) Garantir o controle de congestionamento fim a fim usando AIMD antes que as tabelas de roteamento sejam inundadas."
    ],
    correctAnswer: 1,
    explanation: "Por trafegar as fronteiras complexas que conectam corporações (Inter-AS), a regra do roteamento em larga escala BGP adota essencialmente deliberações de regras comerciais com acordos de trânsitos contratuais usando \"policy-based decision\", diferente de um OSPF da rede local intra-AS focado somente em algoritmos métricos (distâncias) de link-state."
  },
  {
    id: 12,
    question: "O estabelecimento de uma conexão confiável via TCP (Transmission Control Protocol) é formalizado por uma apresentação de três vias (3-way handshake). Quais são as mensagens/flags de controle trocadas, em ordem, nesse procedimento inicial entre Cliente e Servidor?",
    options: [
      "A) SYN, ACK, FIN.",
      "B) SYN, SYN-ACK, ACK.",
      "C) HELO, DATA, QUIT.",
      "D) OPEN, UPDATE, KEEPALIVE.",
      "E) REQUEST, REPLY, ACK."
    ],
    correctAnswer: 1,
    explanation: "Conhecido na camada de Transporte clássica, exige obrigatoriamente a troca do comando SYN (solicitação), a resposta/confirmação SYN-ACK pelo servidor embutindo seus inícios, e concluído pelo ACK do remetente com alocação dos estados virtuais de conexões TCPs nos hosts pares."
  },
  {
    id: 13,
    question: "O TCP fornece um serviço orientado a conexão e controle de fluxo. Para evitar que o remetente sobrecarregue os buffers de memória do destinatário, o cabeçalho TCP utiliza um campo específico para informar quanto espaço de buffer ainda está disponível. Esse campo é o:",
    options: [
      "A) Window Size (Janela de Recepção).",
      "B) Acknowledgment Number.",
      "C) Checksum.",
      "D) Sequence Number.",
      "E) Urgent Pointer."
    ],
    correctAnswer: 0,
    explanation: "A janela de recepção do cabeçalho de fluxo providencia ao servidor (ou peer) a notificação vital rwnd (Window Size), denotando os octetos bytes marginais restantes e ainda intocados que podem fluir no buffer da placa antes do engasgamento/bloqueio real."
  },
  {
    id: 14,
    question: "O algoritmo de controle de congestionamento do TCP baseia-se em sondar a largura de banda disponível (comportamento \"dente de serra\"). Pela política clássica do AIMD (Aumento Aditivo, Diminuição Multiplicativa), o que ocorre com o tamanho da janela de congestionamento (cwnd) quando ocorre a perda de pacotes indicada pelo recebimento de três ACKs duplicados?",
    options: [
      "A) É aumentada de forma linear para compensar o atraso.",
      "B) É imediatamente zerada e a conexão recomeça.",
      "C) É diminuída pela metade (fator de 2) e o pacote perdido é retransmitido rapidamente.",
      "D) Permanece intacta, pois apenas timeouts zeram ou diminuem a janela.",
      "E) Multiplica-se pelo valor da janela de recepção (rwnd) do cliente."
    ],
    correctAnswer: 2,
    explanation: "Sob detecção heurística que desencadeia a fase retransmissão rápida (fast retransmit) gerada por pacotes corrompidos/atrasados sinalizando seq ACKS fora da janela 3x, a variável de controle da janela corta as asas estritamente pela metade, operando o lado M (diminuição de impacto em tráfego concorrente sem esgotamento de fluxo total) do AIMD global (Diminuição Multiplicativa)."
  },
  {
    id: 15,
    question: "A demultiplexação de pacotes na camada de Transporte garante que os dados cheguem ao processo (socket) correto. Para um protocolo orientado à conexão como o TCP em servidores Web modernos, como o sistema operacional identifica exclusivamente o socket alvo de um segmento que acaba de chegar da rede?",
    options: [
      "A) Usando apenas a porta de destino (por exemplo, 80).",
      "B) Lendo o PID do processo embutido no pseudo-cabeçalho IP.",
      "C) Mapeando os registros AAAA no DNS da máquina receptora.",
      "D) Utilizando uma tupla de 4 elementos: IP de origem, porta de origem, IP de destino e porta de destino.",
      "E) Usando a porta de origem e a flag SYN."
    ],
    correctAnswer: 3,
    explanation: "De forma análoga à demultiplexação, conexões completas em aplicações web rodam com thread-sockets que não dependem das portas isoladas do servidor (Porta 80 / HTTP); mas sim identificam o destino alvo preciso do roteador da porta origem emparelhada ao IP exato na tupla de 4 parâmetros: endereço IP e porta de origem junto com IP e porta de destino."
  },
  {
    id: 16,
    question: "O UDP (User Datagram Protocol) é um protocolo da camada de transporte sem conexão e extremamente simples. O seu cabeçalho fixo tem um tamanho de exatamente:",
    options: [
      "A) 4 bytes.",
      "B) 8 bytes.",
      "C) 16 bytes.",
      "D) 20 bytes.",
      "E) 32 bytes."
    ],
    correctAnswer: 1,
    explanation: "Fixo, restrito aos quatro simples campos definidos para operação overhead reduzido: Total de 8 bytes na estrutura global."
  },
  {
    id: 17,
    question: "Considerando o formato do segmento UDP, seus quatro campos básicos de cabeçalho são:",
    options: [
      "A) IP de Origem, IP de Destino, Comprimento, Dados.",
      "B) Número de Sequência, Reconhecimento, Janela, Checksum.",
      "C) Porta de Origem, Porta de Destino, Comprimento, Checksum.",
      "D) Tipo, Código, Checksum, Dados.",
      "E) Endereço MAC Origem, MAC Destino, Protocolo, Checksum."
    ],
    correctAnswer: 2,
    explanation: "(Como discutido nos requisitos acima nas opções 6 e 16), porta de Origem, porta de Destino, tamanho de Comprimento e Checksum encabeçam este datagrama."
  },
  {
    id: 18,
    question: "Ao iniciar uma navegação para a URL de um servidor e baixar o documento HTML base, percebe-se que ele contém 10 imagens referenciadas. No uso do HTTP/1.0 não persistente (clássico), sem suporte a conexões abertas continuamente, qual o padrão de fechamento para esse protocolo?",
    options: [
      "A) O servidor mantém a conexão aberta indefinitivamente, aguardando que o cliente a feche.",
      "B) Após transferir exatamente 5 objetos, a conexão exige uma renovação de chaves.",
      "C) Uma única conexão TCP é aberta, todos os objetos fluem via UDP secundário, e ela é fechada.",
      "D) Uma nova conexão TCP deve ser aberta e em seguida fechada para o envio e recebimento de cada um dos objetos individuais transferidos.",
      "E) O cliente agrupa os GETs usando pipeline e o servidor os devolve encapsulados em um pacote ZIP."
    ],
    correctAnswer: 3,
    explanation: "Esse é o ponto fraco de bloqueio e esgotamento do Handshake gerado na arquitetura 1.0 (não persistente): As limitações exigiam que a TCP Connection fosse montada rigorosamente por interações de requisição seguida do objeto, sendo em seguida a via finalizada TCP para todo conteúdo (Ex: imagens extras da página base) gerando penalidades RTT brutais no processo."
  },
  {
    id: 19,
    question: "O DNS é um serviço essencial para a navegação na Internet que mapeia nomes de hospedeiros em endereços IP. Para lidar eficientemente com as procuras, ele adota uma arquitetura descentralizada. Qual o comportamento de uma consulta de resolução DNS recursiva?",
    options: [
      "A) O cliente consulta todos os servidores da hierarquia mundial, de um em um, recebendo endereços do próximo salto (iterativo).",
      "B) O servidor local resolve a requisição completamente, transferindo o fardo de realizar novas consultas para si em nome do cliente, e só retorna a resposta final (ou erro).",
      "C) O cache do servidor é esvaziado, forçando as máquinas clientes a manterem tabelas hosts locais com IPs autoritativos.",
      "D) Não há troca de pacotes com os TLDs, uma vez que a porta 53 encaminha via BGP todas as strings do navegador diretamente para a raiz.",
      "E) O servidor raiz envia um broadcast global até que a máquina correspondente ecoe de volta a flag AA (Authoritative Answer)."
    ],
    correctAnswer: 1,
    explanation: "A delegação e a atuação transferem o fardo global no nome do cliente da borda, ou seja, o próprio servidor local contatado assume a tarefa de realizar as consultas recursivamente até retornar a resposta definitiva ou erro."
  },
  {
    id: 20,
    question: "Em mapas de domínio (zonas) de servidores DNS autoritativos, qual é a função exata do Registro de Recurso (RR) do tipo CNAME?",
    options: [
      "A) Indicar qual roteador é o gateway padrão do domínio da empresa.",
      "B) Apontar para o servidor oficial de e-mail encarregado de processar filas do domínio.",
      "C) Mapear um nome de domínio para um endereço IPv6 puro (128 bits).",
      "D) Fornecer resolução reversa, transformando um endereço IP de volta em um nome humano legível.",
      "E) Criar um alias (apelido) alternativo que mapeia diretamente para o nome canônico primário de um servidor."
    ],
    correctAnswer: 4,
    explanation: "O CNAME (Canonical Name) aloca pontes ou aliases (nomes fantasias, ex: www.) apontando internamente na base do domínio para os endereços literais canônicos escondidos da infra (ex: servereast.backup2.ibm.com)."
  },
  {
    id: 21,
    question: "O serviço de correio eletrônico na Internet depende de agentes de usuário e de servidores trabalhando em conjunto com protocolos da camada de aplicação. Qual das afirmações a seguir delimita adequadamente a função do SMTP?",
    options: [
      "A) O SMTP permite baixar as mensagens para o computador do cliente apagando-as permanentemente do servidor via portas 110.",
      "B) O SMTP é o protocolo padrão usado quase que exclusivamente para buscar e-mails armazenados e gerenciá-los através de sincronização de pastas (modo ler-e-guardar).",
      "C) O SMTP é o protocolo de envio de e-mails, tipicamente utilizando a porta TCP 25 entre os servidores e a porta 587 para os clientes autenticados submeterem e-mails.",
      "D) O SMTP substitui o uso do MIME para comprimir diretamente arquivos binários (imagens e vídeos) em canais half-duplex.",
      "E) O SMTP implementa criptografia ponta a ponta intrínseca por meio de troca de chaves públicas nos cabeçalhos MAIL FROM."
    ],
    correctAnswer: 2,
    explanation: "O papel das cores/filas entre provedores baseia-se em push clássico; logo o remetente inicial emprega o protocolo de camada de aplicação SMTP na porta tradicional do servidor (25) interdomínio, com envios de autenticação com segurança muitas vezes migrados à 587."
  },
  {
    id: 22,
    question: "Para transferir adequadamente dados binários ou acentuações textuais não ASCII pela infraestrutura SMTP clássica de 7 bits, o protocolo depende do uso de qual extensão e codificação combinadas?",
    options: [
      "A) Extensão BGP via codificação UTF-16.",
      "B) Padrão MIME muitas vezes associado à codificação Base64.",
      "C) Enquadramento IMAP via criptografia RSA.",
      "D) Formato CNAME sobre codificação ASCII-EBCDIC.",
      "E) Registro TXT do DNS empacotado dentro de blocos de HTML."
    ],
    correctAnswer: 1,
    explanation: "SMTP compreendia originalmente puro formato ASCII-7. A manipulação de áudio, imagens ou encriptação exige na subcamada o encoding Multipurpose Internet Mail Extensions MIME e sua transformação robusta para pacotes textuais Base64 transportados ilesos na internet."
  },
  {
    id: 23,
    question: "Qual protocolo de correio eletrônico moderno é o mais indicado quando o usuário deseja visualizar suas mensagens em múltiplos dispositivos (celular, desktop e tablet), mantendo o histórico de pastas em nuvem preservado em sincronia?",
    options: [
      "A) POP3 (Post Office Protocol v3).",
      "B) FTP (File Transfer Protocol).",
      "C) IMAP (Internet Mail Access Protocol).",
      "D) DHCP (Dynamic Host Configuration Protocol).",
      "E) SNMP (Simple Network Management Protocol)."
    ],
    correctAnswer: 2,
    explanation: "A flexibilidade moderna de caixas hospedadas repousa no IMAP, pois ele provê em servidores o mapeamento sincronizado bidirecional sem extermínio das lidas e não lidas como ocorria rotineiramente no formato mais antiquado do protocolo receptor POP3 (quando em modo não guardar)."
  },
  {
    id: 24,
    question: "Sobre a manutenção de sessões e estado de usuários sobre o protocolo HTTP, que em sua natureza nativa é um protocolo \"sem estado\" (stateless), a Internet depende em grande parte da tecnologia de cookies. Um cookie é implementado a partir de:",
    options: [
      "A) Quatro componentes principais: um cabeçalho na resposta do servidor, um cabeçalho nas próximas requisições do cliente, um arquivo salvo localmente pelo navegador do cliente e um banco de dados no servidor mantendo a identidade dos registros vinculados àquele ID único.",
      "B) Execução constante de códigos JavaScript no cache Web que reabrem conexões TCP invisíveis ao fundo (third party tracker) na porta 443.",
      "C) Uma alocação dinâmica no roteador de borda do provedor, que cria NAT persistente para garantir o login nos sites da Amazon ou eBay.",
      "D) O uso das diretivas Cache-Control: max-age no cabeçalho das respostas.",
      "E) Autenticação cruzada entre servidores IMAP e HTTP no momento do pipeline de objetos."
    ],
    correctAnswer: 0,
    explanation: "Esse recurso que viabiliza IDs persistentes como a navegação num e-commerce opera na engenharia mútua do navegador gerando arquivos vinculados em resposta a chaves Set-Cookie enviadas e lidas em banco de dados backend."
  },
  {
    id: 25,
    question: "O tamanho mínimo obrigatório do cabeçalho de um pacote TCP é de 20 bytes. Caso um sniffer (como o Wireshark) intercepte um pacote e observe no campo \"Comprimento do Cabeçalho\" (Offset) do TCP o valor binário 0111 (em múltiplos de 4 bytes, portanto 7×4), significa que esse cabeçalho contém:",
    options: [
      "A) Exatamente 20 bytes de dados úteis (payload).",
      "B) 28 bytes de opções TCP e nenhum cabeçalho base.",
      "C) 20 bytes do cabeçalho mínimo padrão somados a 8 bytes de dados de aplicação.",
      "D) 20 bytes obrigatórios do cabeçalho TCP somados a 8 bytes de Opções TCP extras.",
      "E) 7 bytes de cabeçalho TCP total."
    ],
    correctAnswer: 3,
    explanation: "Como o cabeçalho base de controle TCP mínimo sempre impõe overhead de rotina em exatos 20 Bytes, com marcação unitária de offset 0111 binário (7 palavras TCP), 7×4 bytes = 28 bytes cabeçalhos inseridos da janela. Os 28 - 20 estritamente equivalem a um total de 8 bytes preenchendo opções TCP adicionais."
  },
  {
    id: 26,
    question: "Suponha uma conexão TCP onde o host A está enviando dados ao host B em uma longa transferência de arquivo. Se o último segmento recebido pelo Host B terminou no byte número de sequência 15000 e chegou de maneira íntegra, qual será o comportamento de B no próximo segmento enviado a A?",
    options: [
      "A) O número de sequência será 15000 com o flag FIN habilitado.",
      "B) O campo de número de reconhecimento (ACK) emitido por B terá o valor 15001, informando implicitamente que recebeu tudo corretamente até o 15000.",
      "C) O campo da janela rwnd descerá para 0 para forçar um início lento.",
      "D) A flag RST será ligada para iniciar o sincronismo do roteador na porta 80.",
      "E) O B envia três ACKs idênticos (valor 15000) forçando o A a retransmitir o segmento imediatamente."
    ],
    correctAnswer: 1,
    explanation: "O design ACK (acknowledgment number) cumulativo das cadeias envia, de forma explícita, o byte seguinte iminente antecipado pela ponta (15000 + 1 = 15001), implicando implicitamente que toda a cadeia lógica anterior chegou perfeita até o byte de número referenciado."
  },
  {
    id: 27,
    question: "Sobre as diferenças técnicas entre as fibras ópticas monomodo e multimodo, aponte a afirmação precisa:",
    options: [
      "A) A fibra monomodo tem menor capacidade de largura de banda que a multimodo, devendo ser restrita a distâncias curtas corporativas (até 100m).",
      "B) O núcleo da fibra monomodo é menor do que a da fibra multimodo, o que restringe a luz a viajar em um único raio reto (reduzindo gravemente a dispersão modal), sendo por isso ideal para longas distâncias (rotas interurbanas).",
      "C) A fibra multimodo usa exclusivamente lasers altamente precisos e caros, enquanto a monomodo depende de LEDs de baixo custo para o princípio de refração.",
      "D) A estrutura monomodo necessita de cabos blindados de alumínio concêntrico (STP) por cima do vidro, ao passo que a fibra multimodo é imune à interferência.",
      "E) Fibra monomodo implementa topologias half-duplex estritas, enquanto a multimodo suporta sinalização full-duplex de difusão de satélite simultânea."
    ],
    correctAnswer: 1,
    explanation: "Como as refrações ocorrem pelas paredes por pulsos estreitos do monomodo em diâmetros exíguos (núcleo fino) sem variação em diversos modos (multi radiação rebatendo), o feixe percorre quase direto o filamento longo, resultando ideal de baixa distorção modal em cabeamentos urbanos submarinos longos."
  },
  {
    id: 28,
    question: "Se uma rede local requer segurança, anonimato, balanceamento de tráfego, ou mesmo se uma organização procura reduzir agressivamente o volume de tráfego que consome o seu enlace externo à Internet por meio do armazenamento de objetos requisitados por seus usuários em um intermediário, qual estrutura é empregada pelas máquinas locais para navegar?",
    options: [
      "A) Servidor DNS raiz.",
      "B) Cache Web (Servidor Proxy).",
      "C) Hubs repetidores de difusão.",
      "D) Roteador OSPF com porta efêmera.",
      "E) Rede IPsec em modo de transporte puro."
    ],
    correctAnswer: 1,
    explanation: "Servidores de Caching transparentes Web (ou Proxies) interceptam fluxos, provêem alívios colossais na banda consumida para fora e atuam localmente mantendo réplicas vivas proxy a requisições futuras do mesmo objeto de destino idêntico."
  },
  {
    id: 29,
    question: "Para que o serviço IPsec seja provido para confidencialidade e autenticação nativas, é recomendada a implantação de associações de segurança (SAs) no banco de dados do sistema operacional. Para a troca automatizada de chaves e o controle seguro desses túneis IPsec, as RFCs recomendam a adoção primária de qual protocolo auxiliar?",
    options: [
      "A) BGP (Border Gateway Protocol).",
      "B) SIP (Session Initiation Protocol).",
      "C) IKE (Internet Key Exchange).",
      "D) DHCPv6 Stateful.",
      "E) RARP (Reverse ARP)."
    ],
    correctAnswer: 2,
    explanation: "Na infraestrutura que empodera e viabiliza a negociação confidencial remota (IPsec VPN), protocolos satélites geradores seguros definem chaves dinâmicas pré-compartilhadas via túneis (Internet Key Exchange - IKE)."
  },
  {
    id: 30,
    question: "O protocolo HTTP/2, em evolução ao HTTP/1.1, apresentou uma nova tática mecânica para minimizar os impactos do bloqueio do início de fila (Head-of-Line Blocking, HOL) sobre a única conexão TCP persistente em vigor. Essa mitigação no HTTP/2 reside fundamentalmente em:",
    options: [
      "A) Abandonar completamente o TCP e passar a utilizar unicamente datagramas UDP desconectados e comutação de mensagens inteiras independentes.",
      "B) Dividir (fatiar) as mensagens de resposta dos diferentes objetos referenciados em múltiplos pequenos quadros, permitindo que a transmissão dos pedaços flua no TCP de forma intercalada, baseada nas prioridades especificadas.",
      "C) Compilar todos os objetos CSS e JPEG e empacotá-los dentro de um arquivo HTML gigante retornado ao cliente.",
      "D) Exigir obrigatoriamente a inicialização de tantas conexões TCP paralelas simultâneas quanto forem o total exato de objetos referenciados na página principal.",
      "E) Fazer com que o roteador descarte seletivamente ACKs da camada de transporte com timeout para forçar um refresh local no proxy."
    ],
    correctAnswer: 1,
    explanation: "O problema de empacotamento head-of-line bloqueando filas com grande gargalo gerava entraves no protocolo HTTP estrito; na v2 a requisição sofre divisão virtual flexível agendando os bytes intercalados ou fatiados como \"frames\", permitindo mitigar ativamente a ineficiência sem precisar recorrer à comutação de rede."
  },
  {
    id: 31,
    question: "Qual o tamanho exato de saída retornado pelo processo de codificação Base64 caso o sistema SMTP tente embutir um anexo (payload não-ASCII) contendo perfeitamente uma sequência original de 9 bytes?",
    options: [
      "A) 8 caracteres textuais imprimíveis.",
      "B) 12 caracteres textuais imprimíveis.",
      "C) 16 caracteres textuais imprimíveis.",
      "D) 24 caracteres textuais imprimíveis.",
      "E) 32 caracteres textuais imprimíveis."
    ],
    correctAnswer: 1,
    explanation: "A transformação puramente aritmética Base64 manipula blocos fixos com proporção extra na saída convertendo exatamente a cada trios (3 octetos) originais de entrada para uma expansão baseada em 4 unidades em caractere ASCII final. Entradas de exatos 9 bytes processados requerem, matematicamente, exatos 12 bytes."
  },
  {
    id: 32,
    question: "Em relação às arquiteturas lógicas das aplicações distribuídas, o modelo P2P (Peer-to-Peer ou Ponto a Ponto) difere do modelo cliente-servidor tradicional porque:",
    options: [
      "A) O modelo P2P possui um gargalo único e altamente vulnerável (ponto único de falha) devido ao concentrador.",
      "B) Todas as mensagens devem, invariavelmente, atravessar um banco de dados central pertencente ao provedor de acesso regional para serem mapeadas via CNAME.",
      "C) No modelo P2P, sistemas finais arbitrários se comunicam de forma direta (pares), servindo simultaneamente tanto funções de cliente quanto de servidor (oferecendo excelente auto escalabilidade com a entrada de novos pares na rede).",
      "D) No modelo P2P, hosts rodam IPsec em portas fixas para se passar pelo servidor raiz e forçar difusão ARP paralela.",
      "E) O modelo P2P não requer alocação de número de porta, pois todos os quadros fluem de forma broadcast em anéis token ring."
    ],
    correctAnswer: 2,
    explanation: "Peer-To-Peer garante arquiteturas nativas autossustentáveis não dependentes de hierarquias engessadas com servidores hospedados dedicados (always-on). Máquinas puramente normais ou desconhecidas requisitam recursos umas das outras de forma autônoma sem pontos de falha."
  },
  {
    id: 33,
    question: "Qual é a principal função atribuída ao processo de DHCP (Dynamic Host Configuration Protocol)?",
    options: [
      "A) Criptografar toda a transferência DNS recursiva nas bordas locais.",
      "B) Permitir que um roteador atue repassando o datagrama baseando-se nas signatures dos quadros virais.",
      "C) Permitir que as interfaces de máquinas em LANs obtenham informações parametrizadas dinamicamente sem intervenção manual (como concessões de endereço IP, servidor DNS e gateway).",
      "D) Garantir que cada e-mail disparado pelo cliente possua chaves MIME com codificação de Base64 blindadas por um token PIM estrito.",
      "E) Mapear em um arquivo texto as senhas dos computadores na infraestrutura ADSL (sinais analógicos)."
    ],
    correctAnswer: 2,
    explanation: "Endereçamentos locais \"plug and play\" do roteador provedor baseiam-se primordialmente no UDP atuando ativamente como daemon (Dynamic Host Configuration Protocol) do servidor no envio sem manual e sem configuração fixa nas bordas clientes."
  },
  {
    id: 34,
    question: "A Internet clássica não contava com recursos para prover confidencialidade diretamente a aplicativos e transações na Web sem a configuração manual de chaves. Essa lacuna originou a biblioteca TLS (e antes, o SSL). Em que nível de camada arquitetural o TLS é usualmente implementado?",
    options: [
      "A) Como um módulo nativo englobado profundamente no chip interno do roteador do núcleo de rede (Camada Física).",
      "B) No sub-bloco da Camada de Enlace junto ao CSMA/CD.",
      "C) Na Camada de Rede, substituindo funcionalmente o protocolo IPv6 de todo o Sistema Autônomo.",
      "D) Ele estende a interface dos sockets TCP via software na própria Camada de Aplicação, criptografando a payload Web ou E-mail da borda em texto ininteligível para transitar pela Internet.",
      "E) Na camada física de satélites geostacionários que rodam comutação celular."
    ],
    correctAnswer: 3,
    explanation: "SSL (Transport Layer Security) e suas contrapartes aplicam-se a camada mais alta rodando diretamente encapsuladas em aplicações na rede. Atua mascarando/criptografando todo input recebido ou emitido no Socket antes dos repasses à Camada TCP original do SO."
  },
  {
    id: 35,
    question: "No âmbito da transição de infraestrutura, clientes puramente IPv6 que precisam se conectar de forma inadiável a sites/servidores legados que só rodam o protocolo IPv4 devem utilizar, essencialmente, qual técnica de tradução conjunta padronizada recomendada em ISPs hoje em dia?",
    options: [
      "A) NAT64 agindo em conjunto com DNS64 para a conversão bidirecional de cabeçalhos e registros AAAA lógicos que camuflam os IPs de destino v4 em sub-redes pré-fixadas (ex: 64:ff9b::).",
      "B) NAT Puro nas extremidades P2P.",
      "C) Enfileiramento reverso OSPF-BGP, onde a colisão IP é mascarada na tag SMTP.",
      "D) Fragmentar toda a requisição IPv6 pela rede sem fio com TTL igual a 1 via PPPoE.",
      "E) Utilizar IPv4-Mapped Address associado ao protocolo HTTP 1.0 stateless que reverte as perdas."
    ],
    correctAnswer: 0,
    explanation: "Por designações de endereçamento puras do provedor que carecem de IPV4 público legível, mecanismos NAT64 na borda junto ao DNS especial modificado permitem encapsular requisições (IPv6 -> IPv4), mantendo comunicação pseudo-translacional direta."
  },
  {
    id: 36,
    question: "Qual conceito difere intrinsecamente a difusão \"Broadcast\" (suportada de forma explícita no IPv4) das ações Multicast e Anycast no IPv6?",
    options: [
      "A) O IPv6 extinguiu a figura nativa do \"Broadcast global\" (envio impositivo para tudo num segmento), absorvendo inteiramente e remapeando essas tarefas exigidas na rede para grupos orientados específicos de Multicast, como o \"all-nodes\".",
      "B) O IPv6 utiliza o broadcast incessantemente em vez de ARP, inundando o TLD a cada segundo.",
      "C) O Broadcast do IPv6 funciona sobre UDP na porta 143 apenas na vizinhança BGP de datagrama longo.",
      "D) O Multicast limita-se ao IPsec para criar Virtual LANs restritas (VLANs) limitadas a 16 máquinas com chaves curtas.",
      "E) O IPv4 limitou-se ao unicast; o conceito broadcast não existia nele."
    ],
    correctAnswer: 0,
    explanation: "Endereçamento MAC puramente broad não conta com escalabilidade, logo no protocolo v6 (Neighbor Discovery, RAs), todo o processo e fardo foi focado num tipo enxuto padronizado do multicast global otimizado como All-Nodes."
  },
  {
    id: 37,
    question: "Qual ferramenta clássica em rede é utilizada rotineiramente a partir da linha de comando para mapear os saltos dos sucessivos nós/roteadores presentes no roteamento de um datagrama IP do hospedeiro local de origem até o hospedeiro remoto?",
    options: [
      "A) nslookup.",
      "B) dig +short.",
      "C) traceroute (ou trace/tracert).",
      "D) netstat -rn.",
      "E) iptables."
    ],
    correctAnswer: 2,
    explanation: "Uma rotina ativa diagnóstica que avalia os \"Hops\" ou pulos repassados pela camada rede é comumente rastreada disparando tráfego ICMP iterativo por meio do comando traceroute do OS."
  },
  {
    id: 38,
    question: "Qual dos seguintes tipos de endereços IPv6 tem sua atuação deliberadamente restrita e contida para a mesma sub-rede/enlace físico local em que se originou, nunca sendo encaminhado livremente por um roteador ativo?",
    options: [
      "A) Global Unicast Address.",
      "B) Endereços Link-Local (começando tipicamente com fe80::).",
      "C) Endereços Multicast All-Routers.",
      "D) Unique Local Address em túnel IPsec.",
      "E) Loopback (::1/128)."
    ],
    correctAnswer: 1,
    explanation: "A configuração autônoma de nós dependentes ou rotinas estritas de MAC atrelam-se invariavelmente a perfis baseados no IPv6 de autoconfiguração de máquina FE80:: restrita, nunca fluindo datagrama com prefixos públicos em interfaces (roteador ignora links locais por natureza)."
  },
  {
    id: 39,
    question: "A rede Internet possui dois modelos de controle sob as instâncias de roteamento: intra-AS (Interno ao provedor) e inter-AS. Qual das tecnologias seguintes é listada como um clássico algoritmo e protocolo empregado unicamente no trânsito Interno de um AS para propagar topologias via \"estado do enlace\" (Link-State)?",
    options: [
      "A) BGP.",
      "B) SMTP.",
      "C) Token-Ring.",
      "D) OSPF (Open Shortest Path First).",
      "E) PIM Modo Esparso."
    ],
    correctAnswer: 3,
    explanation: "Os roteamentos baseados globalmente em bordas de domínios corporativos fechados baseiam a tabela via estado topológico dos caminhos no Open Shortest Path First (OSPF)."
  },
  {
    id: 40,
    question: "Imagine uma topologia com o cabo Ethernet possuindo taxa de transmissão igual a 100 Mbps em banda base e o tamanho de uma imagem sendo de 1024 x 768 pixels a 3 bytes/pixel sem compressão associada (total ≈ 2,36 Megabits ou 2.359.296 bits, ou seja, quase 3 MB descompactados). Ao calcular analiticamente na física o atraso puramente de transmissão L/R (desprezando todo overhead de cabeçalhos das camadas TCP/IP), qual fração representa, em ordem de grandeza, o tempo exigido para depositar os dados da imagem inteira nesse fio local veloz?",
    options: [
      "A) Cerca de 0,5 milissegundos.",
      "B) Cerca de 24 milissegundos (0,0236 segundos).",
      "C) Cerca de 2 minutos.",
      "D) Cerca de 10,5 segundos.",
      "E) Cerca de 3 horas."
    ],
    correctAnswer: 1,
    explanation: "A taxa limite real enviando 2.359.296 bits numa rede crua de 10^8 bps (100 Mbps) reflete, com equação da vazão simples de tempo de envio puro em um enlace sem filas, em L/R ≈ 0,02359 segundos (23,59 milissegundos) de injeção física pela placa NIC Ethernet local."
  }
];
