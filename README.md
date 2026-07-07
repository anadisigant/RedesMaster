# 🖥️ RedesMaster - Plataforma de Estudo e Revisão de Redes

Uma plataforma interativa desenvolvida para consolidação teórica e prática de conceitos de Redes de Computadores. Este sistema foi projetado para auxiliar no aprendizado ativo de protocolos, arquiteturas, camadas do modelo OSI/TCP-IP e cálculos fundamentais de redes.

---

## ⚠️ Isenção de Responsabilidade & Finalidade Educacional
Este projeto é **exclusivamente um ambiente de estudo e revisão acadêmica**. Todo o conteúdo teórico, diagramas de blocos, exercícios e o Simulado Final foram baseados e consolidados a partir dos **materiais didáticos da disciplina de Redes de Computadores** e em bancos de questões de exames oficiais como **ENADE** e **POSCOMP**.

Esta ferramenta não possui fins comerciais e visa apenas facilitar a memorização ativa e a preparação de estudantes para exames finais e avaliações de redes de computadores.

---

## 🚀 Principais Recursos da Plataforma

A plataforma está organizada em seções interativas acessíveis através do menu lateral:

1. **🔥 Visão Geral (Dashboard):** Central que exibe o progresso de estudo acumulado (baseado nas questões corretas respondidas nos mini-quizzes).
2. **📖 Revisão de Conceitos:** Resumos detalhados estruturados por camadas (Módulos 1 a 6: Introdução/OSI, Aplicação, Transporte, Rede, Enlace e Programação com Sockets em Java) acompanhados de mini-quizzes práticos ao final de cada conceito.
3. **🔗 Associação de Colunas:** Jogo de correspondência rápida para conectar protocolos clássicos (HTTP, DNS, SMTP, TCP, UDP, etc.) às suas respectivas camadas e portas de comunicação.
4. **🃏 Flashcards de Memorização:** Cartões interativos que revelam termos importantes, definições e portas de rede ao serem clicados.
5. **🧮 Playground de Cálculos:**
   - **Calculadora de Atrasos:** Simula e demonstra passo a passo o cálculo matemático de Atraso de Transmissão ($d_{trans} = L/R$), Atraso de Propagação ($d_{prop} = d/s$) e atraso total fim-a-fim.
   - **Calculadora de Sub-redes IPv4:** Exibe a faixa de IPs úteis, endereço de rede, máscara decimal, endereço de broadcast e número total de hosts a partir de um IP e máscara CIDR, apresentando a resolução em representação binária e AND lógico.
6. **🏆 Simulado Final (Estilo ENADE / POSCOMP):**
   - Um simulado completo contendo **40 questões avançadas** de exames reais.
   - **Painel de Questões Lateral:** Navegação livre que permite ao usuário pular para qualquer uma das 40 questões em qualquer ordem.
   - **Marcar para Revisão (Flag):** Permite destacar questões em que haja dúvida para que o aluno retorne a elas antes de finalizar o exame.
   - **Gabarito Comentado:** Ao encerrar o simulado, a tela de revisão detalha cada item respondido, informando o status de acerto/erro, exibindo a alternativa correta em relação à escolha do usuário e fornecendo o texto da **Explicação Acadêmica Oficial** do gabarito.
7. **🛡️ Network Defender (Mini-game):** Um jogo interativo de ação onde o usuário atua como administrador de um Firewall, descartando (DROP) pacotes de dados nocivos que violam as diretivas ativas (como portas de e-mail incorretas ou IPs de classe inválida) enquanto deixa passar o tráfego legítimo para salvar o servidor.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído puramente na camada de front-end cliente, prezando por simplicidade e velocidade:
- **HTML5:** Estruturação semântica de toda a plataforma.
- **CSS3 (Vanilla):** Estilização moderna inspirada em *glassmorphism* e *dark mode*, com suporte a layouts responsivos (CSS Grid/Flexbox) e microanimações para aprimorar a experiência visual.
- **JavaScript (ES6):** Toda a inteligência da aplicação de forma reativa (controle de estado, lógica dos simulados, manipulação do DOM e cálculos matemáticos), sem dependência de bibliotecas externas complexas.

---

## 📦 Como Executar o Projeto Localmente

Como a aplicação é estática e roda inteiramente no navegador:
1. Faça o download ou clone este repositório.
2. Abra o arquivo `index.html` na raiz do projeto diretamente com qualquer navegador moderno (Chrome, Firefox, Edge, Safari, etc.).
3. *Opcional:* Se preferir rodar através de um servidor local simples, você pode utilizar extensões como o *Live Server* do VS Code ou executar no terminal do repositório:
   ```bash
   # Utilizando Python
   python -m http.server 8080
   
   # Ou utilizando Node.js (se tiver o pacote http-server)
   npx http-server -p 8080
   ```
   Em seguida, acesse `http://localhost:8080` no seu navegador.
