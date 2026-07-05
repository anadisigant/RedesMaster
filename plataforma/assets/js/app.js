// RedesMaster Web Application Controller
// Orchestrates state management, dynamic UI rendering, calculations, matching games, and simulation quizzes.

class RedesMasterApp {
  constructor() {
    this.currentView = 'dashboard';
    this.currentModule = 1;
    this.answeredQuestions = this.loadProgress();
    
    // Quiz/Simulation State
    this.quizQuestions = [];
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizAnswers = []; // Records user's selected answers
    this.quizTimerInterval = null;
    this.quizSeconds = 0;

    // Matching Game State
    this.selectedLeftCard = null;
    this.matchedCount = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderDashboardModules();
    this.renderTOC();
    this.renderModuleConcepts(1);
    this.initMatchingGame();
    this.renderFlashcards();
    
    // Initial calculation bindings
    this.bindCalculators();
    this.calculateDelay();
    this.calculateSubnet();
    
    this.updateProgressUI();
  }

  // LocalStorage Progress Tracker
  loadProgress() {
    try {
      const saved = localStorage.getItem('redesmaster_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Error loading progress:", e);
      return {};
    }
  }

  saveProgress(questionId, isCorrect) {
    this.answeredQuestions[questionId] = isCorrect;
    try {
      localStorage.setItem('redesmaster_progress', JSON.stringify(this.answeredQuestions));
    } catch (e) {
      console.error("Error saving progress:", e);
    }
    this.updateProgressUI();
  }

  updateProgressUI() {
    const totalQuestions = REDES_DB.questions.length;
    const correctCount = Object.values(this.answeredQuestions).filter(val => val === true).length;
    
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    
    const fillEl = document.getElementById('study-progress-fill');
    const textEl = document.getElementById('study-progress-text');
    if (fillEl && textEl) {
      fillEl.style.width = `${percentage}%`;
      textEl.innerText = `${percentage}%`;
    }
  }

  // View Switching
  switchView(viewName) {
    this.currentView = viewName;
    
    // Manage active state of menu items
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Toggle section elements visibility
    document.querySelectorAll('.view-section').forEach(section => {
      if (section.id === `${viewName}-view`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update Header Text dynamically
    const mainTitle = document.getElementById('view-title');
    const subTitle = document.getElementById('view-subtitle');
    
    switch (viewName) {
      case 'dashboard':
        mainTitle.innerText = "Dashboard Principal";
        subTitle.innerText = "Bem-vindo à sua central de estudos. Escolha uma das atividades ao lado.";
        break;
      case 'concepts':
        mainTitle.innerText = "Revisão de Conteúdos";
        subTitle.innerText = "Navegue pelas camadas para fixar a teoria e resolver mini-quizzes integrados.";
        this.renderModuleConcepts(this.currentModule);
        break;
      case 'matching':
        mainTitle.innerText = "Associação de Colunas";
        subTitle.innerText = "Pratique a associação rápida de protocolos às suas portas e camadas.";
        break;
      case 'flashcards':
        mainTitle.innerText = "Flashcards de Memorização";
        subTitle.innerText = "Clique nos cartões para revelar definições cruciais e portas de comunicação.";
        break;
      case 'calculators':
        mainTitle.innerText = "Playground de Cálculos";
        subTitle.innerText = "Pratique atrasos de rede e divisão de sub-redes em tempo real com resoluções passo a passo.";
        break;
      case 'simulado':
        mainTitle.innerText = "Simulado Geral de Rede";
        subTitle.innerText = "Monitore seu tempo e estude em condições reais de prova final.";
        break;
      case 'game':
        mainTitle.innerText = "Defensor de Rede (Firewall)";
        subTitle.innerText = "Bloqueie os pacotes que infringem as regras do firewall e proteja o servidor!";
        break;
    }

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupEventListeners() {
    // Menu navigation click
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.getAttribute('data-view');
        this.switchView(view);
      });
    });

    // Quick review button (starts a quick random 5-question quiz)
    const quickQuizBtn = document.getElementById('quick-quiz-btn');
    if (quickQuizBtn) {
      quickQuizBtn.addEventListener('click', () => {
        this.switchView('simulado');
        document.getElementById('simulado-topic').value = 'all';
        document.getElementById('simulado-size').value = '5';
        this.startSimulado();
      });
    }

    // Simulado setup
    const startSimBtn = document.getElementById('start-simulado-btn');
    if (startSimBtn) {
      startSimBtn.addEventListener('click', () => this.startSimulado());
    }

    const prevQuizBtn = document.getElementById('quiz-prev-btn');
    if (prevQuizBtn) {
      prevQuizBtn.addEventListener('click', () => this.navigateQuiz(-1));
    }

    const nextQuizBtn = document.getElementById('quiz-next-btn');
    if (nextQuizBtn) {
      nextQuizBtn.addEventListener('click', () => this.navigateQuiz(1));
    }

    const restartSetupBtn = document.getElementById('restart-simulado-setup-btn');
    if (restartSetupBtn) {
      restartSetupBtn.addEventListener('click', () => {
        document.getElementById('simulado-result-screen').style.display = 'none';
        document.getElementById('simulado-setup').style.display = 'block';
      });
    }

    // Matching reset
    const resetMatchBtn = document.getElementById('reset-matching-btn');
    if (resetMatchBtn) {
      resetMatchBtn.addEventListener('click', () => this.initMatchingGame());
    }
  }

  // Dashboard Renderer
  renderDashboardModules() {
    const grid = document.getElementById('dashboard-modules');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    REDES_DB.modules.forEach(mod => {
      const card = document.createElement('div');
      card.className = 'module-card';
      card.style.setProperty('--module-color', mod.color);
      
      const qCount = REDES_DB.questions.filter(q => q.module === mod.id).length;
      
      card.innerHTML = `
        <div class="module-header">
          <span class="module-badge" style="color: ${mod.color}">Módulo ${mod.id}</span>
          <span class="module-quiz-indicator">${qCount} Questões</span>
        </div>
        <div class="module-info">
          <h3>${mod.title}</h3>
          <p>Revisão teórica detalhada com exercícios intercalados de fixação ativa.</p>
        </div>
        <div class="module-footer">
          <button class="btn btn-secondary" onclick="app.loadModuleReview(${mod.id})" style="padding: 0.5rem 1rem; font-size: 0.85rem">Estudar</button>
          <button class="btn" onclick="app.startModuleQuiz(${mod.id})" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: ${mod.color}; box-shadow: none">Testar</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  loadModuleReview(moduleId) {
    this.currentModule = moduleId;
    this.switchView('concepts');
  }

  startModuleQuiz(moduleId) {
    this.switchView('simulado');
    document.getElementById('simulado-topic').value = moduleId.toString();
    document.getElementById('simulado-size').value = '5';
    this.startSimulado();
  }

  // TOC (Table of Contents) Renderer
  renderTOC() {
    const list = document.getElementById('concepts-toc-list');
    if (!list) return;
    
    list.innerHTML = '';
    REDES_DB.modules.forEach(mod => {
      const item = document.createElement('div');
      item.className = 'toc-item';
      if (mod.id === this.currentModule) item.classList.add('active');
      item.style.setProperty('--active-color', mod.color);
      item.innerText = `Módulo ${mod.id}: ${mod.title}`;
      item.addEventListener('click', () => {
        document.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        this.currentModule = mod.id;
        this.renderModuleConcepts(mod.id);
      });
      list.appendChild(item);
    });
  }

  // Render module concepts on concepts pane
  renderModuleConcepts(moduleId) {
    const contentArea = document.getElementById('concepts-content-area');
    if (!contentArea) return;
    
    const mod = REDES_DB.modules.find(m => m.id === moduleId);
    if (!mod) return;
    
    contentArea.innerHTML = '';

    // Render Module Title/Intro Card
    const headerCard = document.createElement('div');
    headerCard.className = 'concept-block';
    headerCard.style.borderTop = `5px solid ${mod.color}`;
    headerCard.innerHTML = `
      <span class="module-badge" style="color: ${mod.color}; margin-bottom: 1rem; display: inline-block;">Módulo ${mod.id}</span>
      <h2 class="concept-title" style="border:none; margin-bottom:0.5rem">${mod.title}</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6">Leia os conceitos consolidados abaixo. Ao final de cada tópico, responda ao mini-quiz de fixação rápida. Suas respostas corretas contam para a sua barra de progresso geral.</p>
    `;
    contentArea.appendChild(headerCard);

    // Render each concept with its own embedded mini quiz
    mod.concepts.forEach((concept, index) => {
      const block = document.createElement('div');
      block.className = 'concept-block';
      
      block.innerHTML = `
        <h3 class="concept-title">${concept.title}</h3>
        <div class="concept-text">${concept.text.replace(/\n/g, '<br>')}</div>
      `;

      // Find an associated question from db to embed as mini-quiz
      // We look for questions of this module. To make it dynamic, we select questions sequentially based on concept index.
      const moduleQuestions = REDES_DB.questions.filter(q => q.module === moduleId);
      const question = moduleQuestions[index % moduleQuestions.length];
      
      if (question) {
        const miniQuiz = document.createElement('div');
        miniQuiz.className = 'mini-quiz';
        miniQuiz.style.setProperty('--active-color', mod.color);
        
        let badgeTypeText = "Múltipla Escolha";
        if (question.type === 'true-false') badgeTypeText = "Verdaderio ou Falso (V/F)";
        if (question.type === 'calculation') badgeTypeText = "Cálculo / Resposta Rápida";

        let optionsHTML = '';
        if (question.type === 'multiple-choice') {
          question.options.forEach((opt, optIdx) => {
            optionsHTML += `
              <button class="option-btn" onclick="app.answerMiniQuiz(this, ${question.id}, ${optIdx})">${opt}</button>
            `;
          });
        } else if (question.type === 'true-false') {
          optionsHTML += `
            <div style="display: flex; gap: 1rem">
              <button class="option-btn" style="flex: 1; text-align: center" onclick="app.answerMiniQuiz(this, ${question.id}, true)">Verdadeiro (V)</button>
              <button class="option-btn" style="flex: 1; text-align: center" onclick="app.answerMiniQuiz(this, ${question.id}, false)">Falso (F)</button>
            </div>
          `;
        } else if (question.type === 'calculation') {
          optionsHTML += `
            <div class="calculation-input-container">
              <input type="text" class="form-control calculation-input" placeholder="Digite sua resposta numérica/texto..." id="mini-calc-${question.id}">
              <button class="btn" onclick="app.answerMiniQuizCalc(${question.id})">Confirmar</button>
            </div>
            <button class="btn btn-secondary" onclick="app.revealMiniCalcAnswer(${question.id})" style="font-size:0.85rem; padding: 0.5rem 1rem">Ver Resolução Passo a Passo</button>
          `;
        }

        miniQuiz.innerHTML = `
          <div class="mini-quiz-header">Questão Prática — ${badgeTypeText}</div>
          <div class="question-text">${question.question}</div>
          <div class="options-list" id="mini-opts-${question.id}">
            ${optionsHTML}
          </div>
          <div class="explanation-block" id="mini-explain-${question.id}" style="display: none;"></div>
        `;
        block.appendChild(miniQuiz);
      }

      contentArea.appendChild(block);
    });
  }

  // Answer handlers for mini quizzes
  answerMiniQuiz(btn, questionId, selection) {
    const question = REDES_DB.questions.find(q => q.id === questionId);
    if (!question) return;

    const parent = btn.parentElement;
    
    // Disable all options
    parent.querySelectorAll('.option-btn').forEach(b => {
      b.disabled = true;
      b.style.pointerEvents = 'none';
    });

    const isCorrect = (selection === question.correctAnswer);
    
    if (isCorrect) {
      btn.classList.add('correct');
    } else {
      btn.classList.add('wrong');
      // Highlight the correct one
      if (question.type === 'multiple-choice') {
        parent.querySelectorAll('.option-btn')[question.correctAnswer].classList.add('correct');
      } else if (question.type === 'true-false') {
        // True/False highlight
        parent.querySelectorAll('.option-btn')[question.correctAnswer ? 0 : 1].classList.add('correct');
      }
    }

    // Show explanation
    const expBlock = document.getElementById(`mini-explain-${questionId}`);
    if (expBlock) {
      expBlock.style.display = 'block';
      expBlock.innerHTML = `
        <strong>${isCorrect ? '✅ Resposta Correta!' : '❌ Resposta Incorreta.'}</strong><br>
        ${question.explanation.replace(/\n/g, '<br>')}
      `;
    }

    this.saveProgress(questionId, isCorrect);
  }

  answerMiniQuizCalc(questionId) {
    const question = REDES_DB.questions.find(q => q.id === questionId);
    const input = document.getElementById(`mini-calc-${questionId}`);
    if (!question || !input) return;

    const val = input.value.trim();
    if (val === '') return;

    // Check numerical match by stripping symbols or fuzzy matching
    const cleanAnswer = question.correctAnswer.toLowerCase();
    const cleanVal = val.toLowerCase();
    
    const isCorrect = cleanVal.includes(cleanAnswer) || cleanAnswer.includes(cleanVal);

    // Disable input and button
    input.disabled = true;
    const btn = input.nextElementSibling;
    if (btn) btn.disabled = true;

    const expBlock = document.getElementById(`mini-explain-${questionId}`);
    if (expBlock) {
      expBlock.style.display = 'block';
      expBlock.innerHTML = `
        <strong>${isCorrect ? '✅ Resposta Correta!' : '❌ Resposta Incorreta.'} (Esperado: ${question.correctAnswer})</strong><br>
        ${question.explanation.replace(/\n/g, '<br>')}
      `;
      if (question.calculationSteps) {
        expBlock.innerHTML += `<div class="calc-steps" style="margin-top:0.75rem">${question.calculationSteps}</div>`;
      }
    }

    this.saveProgress(questionId, isCorrect);
  }

  revealMiniCalcAnswer(questionId) {
    const question = REDES_DB.questions.find(q => q.id === questionId);
    if (!question) return;
    
    // Disable inputs
    const input = document.getElementById(`mini-calc-${questionId}`);
    if (input) {
      input.disabled = true;
      const btn = input.nextElementSibling;
      if (btn) btn.disabled = true;
    }

    const expBlock = document.getElementById(`mini-explain-${questionId}`);
    if (expBlock) {
      expBlock.style.display = 'block';
      expBlock.innerHTML = `
        <strong>💡 Resolução Demonstrada:</strong><br>
        ${question.explanation.replace(/\n/g, '<br>')}
      `;
      if (question.calculationSteps) {
        expBlock.innerHTML += `<div class="calc-steps" style="margin-top:0.75rem">${question.calculationSteps}</div>`;
      }
    }
  }

  // Columns Matching Logic
  initMatchingGame() {
    this.selectedLeftCard = null;
    this.matchedCount = 0;
    
    const scoreText = document.getElementById('matching-score');
    if (scoreText) scoreText.innerText = `Acertos: 0 / ${REDES_DB.matchingData.protocols.length}`;

    const leftCol = document.getElementById('matching-left-col');
    const rightCol = document.getElementById('matching-right-col');
    if (!leftCol || !rightCol) return;

    leftCol.innerHTML = '<h4>Protocolo</h4>';
    rightCol.innerHTML = '<h4>Camada / Informação</h4>';

    // Shallow copy protocols list
    const leftData = [...REDES_DB.matchingData.protocols];
    const rightData = [...REDES_DB.matchingData.protocols];

    // Shuffle both independently
    leftData.sort(() => Math.random() - 0.5);
    rightData.sort(() => Math.random() - 0.5);

    leftData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'matching-card';
      card.dataset.name = item.name;
      card.innerHTML = `${item.name} <span class="matching-badge">Protocolo</span>`;
      
      card.addEventListener('click', () => this.selectLeftMatchingCard(card));
      leftCol.appendChild(card);
    });

    rightData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'matching-card';
      card.dataset.match = item.name;
      card.innerHTML = `${item.layer} (${item.info}) <span class="matching-badge">Camada</span>`;
      
      card.addEventListener('click', () => this.selectRightMatchingCard(card));
      rightCol.appendChild(card);
    });
  }

  selectLeftMatchingCard(card) {
    if (card.classList.contains('matched')) return;

    document.querySelectorAll('#matching-left-col .matching-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    this.selectedLeftCard = card;
  }

  selectRightMatchingCard(card) {
    if (card.classList.contains('matched') || !this.selectedLeftCard) return;

    const protocolName = this.selectedLeftCard.dataset.name;
    const matchesTarget = card.dataset.match;

    if (protocolName === matchesTarget) {
      // It's a match!
      this.selectedLeftCard.classList.remove('selected');
      this.selectedLeftCard.classList.add('matched');
      card.classList.add('matched');
      
      this.selectedLeftCard = null;
      this.matchedCount++;
      
      const scoreText = document.getElementById('matching-score');
      if (scoreText) scoreText.innerText = `Acertos: ${this.matchedCount} / ${REDES_DB.matchingData.protocols.length}`;

      if (this.matchedCount === REDES_DB.matchingData.protocols.length) {
        setTimeout(() => {
          alert("🎉 Incrível! Você associou todos os protocolos corretamente!");
        }, 300);
      }
    } else {
      // Mismatch effect
      card.style.borderColor = 'var(--error)';
      card.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.4)';
      this.selectedLeftCard.style.borderColor = 'var(--error)';
      this.selectedLeftCard.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.4)';
      
      const wrongLeft = this.selectedLeftCard;
      wrongLeft.classList.remove('selected');
      this.selectedLeftCard = null;

      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
        wrongLeft.style.borderColor = '';
        wrongLeft.style.boxShadow = '';
      }, 800);
    }
  }

  // Flashcards Renderer
  renderFlashcards() {
    const container = document.getElementById('flashcards-container');
    if (!container) return;

    container.innerHTML = '';
    
    // Shuffle flashcards
    const cards = [...REDES_DB.flashcards].sort(() => Math.random() - 0.5);

    cards.forEach(cardData => {
      const card = document.createElement('div');
      card.className = 'flashcard';
      
      card.innerHTML = `
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div>${cardData.term}</div>
            <div class="card-hint">Clique para revelar</div>
          </div>
          <div class="flashcard-back">
            <div>${cardData.definition}</div>
            <div class="card-hint">Clique para voltar</div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });

      container.appendChild(card);
    });
  }

  // Bind Listeners to Delay and Subnet calculators
  bindCalculators() {
    // Delay Calculator events
    const delayInputs = ['calc-delay-L', 'calc-delay-L-unit', 'calc-delay-R', 'calc-delay-R-unit', 'calc-delay-d', 'calc-delay-d-unit', 'calc-delay-s', 'calc-delay-s-unit'];
    delayInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateDelay());
        el.addEventListener('change', () => this.calculateDelay());
      }
    });

    // Subnet Calculator events
    const subnetInputs = ['calc-subnet-ip', 'calc-subnet-cidr'];
    subnetInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateSubnet());
        el.addEventListener('change', () => this.calculateSubnet());
      }
    });
  }

  // Delay Calculator Math
  calculateDelay() {
    const L = parseFloat(document.getElementById('calc-delay-L').value) || 0;
    const L_unit = document.getElementById('calc-delay-L-unit').value;
    const R = parseFloat(document.getElementById('calc-delay-R').value) || 0;
    const R_unit = document.getElementById('calc-delay-R-unit').value;
    const d = parseFloat(document.getElementById('calc-delay-d').value) || 0;
    const d_unit = document.getElementById('calc-delay-d-unit').value;
    const s = parseFloat(document.getElementById('calc-delay-s').value) || 0;
    const s_unit = document.getElementById('calc-delay-s-unit').value;

    // Convert Packet Size to bits
    let L_bits = L;
    if (L_unit === 'bytes') L_bits = L * 8;

    // Convert Transmission Rate to bps
    let R_bps = R;
    if (R_unit === 'Mbps') R_bps = R * 1000000;
    else if (R_unit === 'Kbps') R_bps = R * 1000;

    // Convert Distance to meters
    let d_m = d;
    if (d_unit === 'km') d_m = d * 1000;

    // Convert Propagation Speed to m/s
    let s_mps = s;
    if (s_unit === 'km_s') s_mps = s * 1000;

    // Calculate Delays in seconds
    let d_trans = R_bps > 0 ? L_bits / R_bps : 0;
    let d_prop = s_mps > 0 ? d_m / s_mps : 0;

    // Convert to milliseconds
    let d_trans_ms = d_trans * 1000;
    let d_prop_ms = d_prop * 1000;
    let d_total_ms = d_trans_ms + d_prop_ms;

    // Display
    document.getElementById('res-dtrans').innerText = `${d_trans_ms.toFixed(3)} ms`;
    document.getElementById('res-dprop').innerText = `${d_prop_ms.toFixed(3)} ms`;
    document.getElementById('res-dtotal').innerText = `${d_total_ms.toFixed(3)} ms`;

    // Render Steps
    const stepsEl = document.getElementById('delay-steps');
    if (stepsEl) {
      stepsEl.innerHTML = `
<b>📝 Resolução Passo a Passo:</b>
1. Converter unidades para o padrão científico:
   • L = ${L} ${L_unit} = <b>${L_bits.toLocaleString()} bits</b>
   • R = ${R} ${R_unit} = <b>${R_bps.toLocaleString()} bps</b>
   • d = ${d} ${d_unit} = <b>${d_m.toLocaleString()} metros</b>
   • s = ${s} ${s_unit} = <b>${s_mps.toLocaleString()} m/s</b>

2. Atraso de Transmissão (d_trans = L / R):
   d_trans = ${L_bits.toLocaleString()} bits / ${R_bps.toLocaleString()} bps
   d_trans = ${d_trans.toFixed(8)} segundos
   d_trans = <b>${d_trans_ms.toFixed(3)} ms</b>

3. Atraso de Propagação (d_prop = d / s):
   d_prop = ${d_m.toLocaleString()} metros / ${s_mps.toLocaleString()} m/s
   d_prop = ${d_prop.toFixed(8)} segundos
   d_prop = <b>${d_prop_ms.toFixed(3)} ms</b>

4. Atraso Total (d_total = d_trans + d_prop):
   d_total = ${d_trans_ms.toFixed(3)} ms + ${d_prop_ms.toFixed(3)} ms
   d_total = <b>${d_total_ms.toFixed(3)} ms</b>
      `.trim();
    }
  }

  // IPv4 Subnetting Math
  calculateSubnet() {
    const ipStr = document.getElementById('calc-subnet-ip').value.trim();
    const cidr = parseInt(document.getElementById('calc-subnet-cidr').value);
    
    // IP Regex Validation
    const ipRegex = /^^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipRegex.test(ipStr)) {
      document.getElementById('sub-res-net').innerText = "IP Inválido";
      document.getElementById('sub-res-mask').innerText = "-";
      document.getElementById('sub-res-first').innerText = "-";
      document.getElementById('sub-res-last').innerText = "-";
      document.getElementById('sub-res-broad').innerText = "-";
      document.getElementById('sub-res-count').innerText = "-";
      document.getElementById('subnet-steps').innerText = "Aguardando IP válido (formato: X.X.X.X)...";
      return;
    }

    const ipOctets = ipStr.split('.').map(Number);
    
    // Convert octets to 32-bit integer
    let ipInt = (ipOctets[0] << 24) | (ipOctets[1] << 16) | (ipOctets[2] << 8) | ipOctets[3];
    
    // Create Subnet Mask
    let maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr));
    
    // Compute Network and Broadcast
    let netInt = ipInt & maskInt;
    let broadInt = netInt | ~maskInt;
    
    // Decimal conversions helper
    const intToIp = (num) => {
      return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');
    };

    const netIp = intToIp(netInt);
    const maskIp = intToIp(maskInt);
    const broadIp = intToIp(broadInt);
    
    let firstIp = "-", lastIp = "-", usableCount = 0;
    
    if (cidr <= 30) {
      firstIp = intToIp(netInt + 1);
      lastIp = intToIp(broadInt - 1);
      usableCount = Math.pow(2, 32 - cidr) - 2;
    } else if (cidr === 31) {
      firstIp = intToIp(netInt);
      lastIp = intToIp(broadInt);
      usableCount = 2; // Point-to-point RFC 3021
    } else if (cidr === 32) {
      firstIp = intToIp(netInt);
      lastIp = intToIp(netInt);
      usableCount = 1;
    }

    // Display
    document.getElementById('sub-res-net').innerText = netIp;
    document.getElementById('sub-res-mask').innerText = maskIp;
    document.getElementById('sub-res-first').innerText = firstIp;
    document.getElementById('sub-res-last').innerText = lastIp;
    document.getElementById('sub-res-broad').innerText = broadIp;
    document.getElementById('sub-res-count').innerText = usableCount;

    // Binary layout for steps
    const toBinStr = (num) => {
      let b = (num >>> 0).toString(2);
      return ("00000000000000000000000000000000" + b).slice(-32).match(/.{8}/g).join('.');
    };

    const ipBin = toBinStr(ipInt);
    const maskBin = toBinStr(maskInt);
    const netBin = toBinStr(netInt);

    const stepsEl = document.getElementById('subnet-steps');
    if (stepsEl) {
      stepsEl.innerHTML = `
<b>📝 Resolução Binária:</b>
• IP do Host:  ${ipStr}
  Binário:     ${ipBin}
• Máscara /${cidr}: ${maskIp}
  Binário:     ${maskBin}

• IP de Rede (AND Lógico):
  IP & Mask:   ${netBin} -> <b>${netIp}</b>

• IPs de Hosts Válidos:
  Faixa:       <b>${firstIp}</b> até <b>${lastIp}</b>
• IP de Broadcast (Rede + bits de host em 1):
  Broadcast:   <b>${broadIp}</b>

• Total de Hosts: 2^(32 - ${cidr}) - 2 = 2^${32 - cidr} - 2 = <b>${usableCount} hosts válidos</b>.
      `.trim();
    }
  }

  // Quiz / Exam Simulator logic
  startSimulado() {
    const topicVal = document.getElementById('simulado-topic').value;
    const sizeVal = parseInt(document.getElementById('simulado-size').value);

    // Filter questions
    let pool = [...REDES_DB.questions];
    if (topicVal !== 'all') {
      const modId = parseInt(topicVal);
      pool = pool.filter(q => q.module === modId);
    }

    if (pool.length === 0) {
      alert("Não há questões disponíveis para este módulo específico.");
      return;
    }

    // Shuffle pool and select size
    pool.sort(() => Math.random() - 0.5);
    this.quizQuestions = pool.slice(0, Math.min(sizeVal, pool.length));

    // Reset quiz state
    this.currentQuizIndex = 0;
    this.quizScore = 0;
    this.quizAnswers = new Array(this.quizQuestions.length).fill(null);
    this.quizSeconds = 0;

    // Toggle Screen views
    document.getElementById('simulado-setup').style.display = 'none';
    document.getElementById('simulado-result-screen').style.display = 'none';
    document.getElementById('simulado-quiz-screen').style.display = 'block';

    // Start Timer
    this.startQuizTimer();
    this.renderQuizQuestion();
  }

  startQuizTimer() {
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);
    
    const display = document.getElementById('timer-display');
    if (display) display.innerText = "00:00";

    this.quizTimerInterval = setInterval(() => {
      this.quizSeconds++;
      const mins = Math.floor(this.quizSeconds / 60).toString().padStart(2, '0');
      const secs = (this.quizSeconds % 60).toString().padStart(2, '0');
      if (display) display.innerText = `${mins}:${secs}`;
    }, 1000);
  }

  renderQuizQuestion() {
    const container = document.getElementById('quiz-question-card');
    if (!container) return;

    const q = this.quizQuestions[this.currentQuizIndex];
    const prevAnswer = this.quizAnswers[this.currentQuizIndex];

    // Progress text
    document.getElementById('quiz-progress-text').innerText = `Questão ${this.currentQuizIndex + 1} de ${this.quizQuestions.length}`;

    // Manage Prev Button visibility
    const prevBtn = document.getElementById('quiz-prev-btn');
    if (prevBtn) {
      prevBtn.style.visibility = this.currentQuizIndex === 0 ? 'hidden' : 'visible';
    }

    // Set Next button text
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      nextBtn.innerText = this.currentQuizIndex === this.quizQuestions.length - 1 ? 'Finalizar' : 'Avançar';
    }

    const mod = REDES_DB.modules.find(m => m.id === q.module);
    const modTitle = mod ? mod.title : '';

    let contentHTML = `
      <span class="question-badge" style="background: rgba(255,255,255,0.05); color: ${mod ? mod.color : 'white'}">${modTitle}</span>
      <div class="question-text">${q.question}</div>
      <div class="options-list">
    `;

    if (q.type === 'multiple-choice') {
      q.options.forEach((opt, idx) => {
        let activeClass = prevAnswer === idx ? 'correct' : ''; // simple highlighting of selection
        contentHTML += `
          <button class="option-btn ${activeClass}" onclick="app.selectQuizOption(${idx})">${opt}</button>
        `;
      });
    } else if (q.type === 'true-false') {
      const activeTrue = prevAnswer === true ? 'correct' : '';
      const activeFalse = prevAnswer === false ? 'correct' : '';
      contentHTML += `
        <div style="display: flex; gap: 1rem">
          <button class="option-btn ${activeTrue}" style="flex: 1; text-align: center" onclick="app.selectQuizOption(true)">Verdadeiro (V)</button>
          <button class="option-btn ${activeFalse}" style="flex: 1; text-align: center" onclick="app.selectQuizOption(false)">Falso (F)</button>
        </div>
      `;
    } else if (q.type === 'calculation') {
      const val = prevAnswer !== null ? prevAnswer : '';
      contentHTML += `
        <div class="calculation-input-container">
          <input type="text" class="form-control calculation-input" placeholder="Digite sua resposta numérica..." id="quiz-calc-input" value="${val}" oninput="app.selectQuizOption(this.value)">
        </div>
      `;
    }

    contentHTML += `</div>`;
    container.innerHTML = contentHTML;
  }

  selectQuizOption(val) {
    this.quizAnswers[this.currentQuizIndex] = val;
    
    // Highlight UI immediately for non-text inputs
    if (typeof val === 'number') {
      const btns = document.querySelectorAll('#quiz-question-card .option-btn');
      btns.forEach((btn, idx) => {
        if (idx === val) btn.classList.add('correct');
        else btn.classList.remove('correct');
      });
    } else if (typeof val === 'boolean') {
      const btns = document.querySelectorAll('#quiz-question-card .option-btn');
      if (val) {
        btns[0].classList.add('correct');
        btns[1].classList.remove('correct');
      } else {
        btns[0].classList.remove('correct');
        btns[1].classList.add('correct');
      }
    }
  }

  navigateQuiz(direction) {
    // Save current index selection checking
    const curAns = this.quizAnswers[this.currentQuizIndex];
    if (direction === 1 && curAns === null) {
      alert("Por favor, selecione ou digite uma resposta antes de prosseguir.");
      return;
    }

    this.currentQuizIndex += direction;

    if (this.currentQuizIndex < 0) {
      this.currentQuizIndex = 0;
    } else if (this.currentQuizIndex >= this.quizQuestions.length) {
      // Completed! Compute results
      this.finishSimulado();
    } else {
      this.renderQuizQuestion();
    }
  }

  finishSimulado() {
    clearInterval(this.quizTimerInterval);

    // Compute Score
    let correct = 0;
    this.quizQuestions.forEach((q, idx) => {
      const userAns = this.quizAnswers[idx];
      let isCorrect = false;

      if (q.type === 'multiple-choice' || q.type === 'true-false') {
        isCorrect = (userAns === q.correctAnswer);
      } else if (q.type === 'calculation') {
        const cleanAnswer = q.correctAnswer.toLowerCase();
        const cleanUser = String(userAns).toLowerCase().trim();
        isCorrect = cleanUser.includes(cleanAnswer) || cleanAnswer.includes(cleanUser);
      }

      if (isCorrect) correct++;
      
      // Save progress to LocalStorage for study metrics
      this.saveProgress(q.id, isCorrect);
    });

    const percent = Math.round((correct / this.quizQuestions.length) * 100);
    
    // Result displays
    document.getElementById('score-percent').innerText = `${percent}%`;
    document.getElementById('result-correct-count').innerText = correct;
    document.getElementById('result-wrong-count').innerText = this.quizQuestions.length - correct;

    const minutes = Math.floor(this.quizSeconds / 60).toString().padStart(2, '0');
    const seconds = (this.quizSeconds % 60).toString().padStart(2, '0');
    document.getElementById('score-details-text').innerText = `Você acertou ${correct} de ${this.quizQuestions.length} questões em ${minutes}:${seconds}.`;

    // Apply color class to circle
    const circle = document.getElementById('score-circle-element');
    circle.className = 'score-circle';
    if (percent >= 70) {
      circle.classList.add('success');
      document.getElementById('score-feedback-text').innerText = "Excelente desempenho! Pronto para a Prova.";
    } else if (percent >= 50) {
      circle.classList.add('warning');
      document.getElementById('score-feedback-text').innerText = "Bom esforço, mas vale a pena revisar mais.";
    } else {
      circle.classList.add('error');
      document.getElementById('score-feedback-text').innerText = "Recomenda-se revisar bastante os conceitos das camadas.";
    }

    // Toggle views
    document.getElementById('simulado-quiz-screen').style.display = 'none';
    document.getElementById('simulado-result-screen').style.display = 'block';
  }
}

// Global App reference
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new RedesMasterApp();
});
