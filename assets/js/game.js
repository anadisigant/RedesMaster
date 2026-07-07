// Network Defender - Mini-game for RedesMaster
// Gamifies ports, protocols, IP classes, and packet analysis using procedural packet generation,
// dynamic firewall directives, visual explosion particles, and a retro synth synthesizer (Web Audio API).

class WebAudioSynth {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  playLaser() {
    if (!this.soundEnabled) return;
    this.init();
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("AudioContext block:", e);
    }
  }

  playExplosion() {
    if (!this.soundEnabled) return;
    this.init();
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.35);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("AudioContext block:", e);
    }
  }

  playHit() {
    if (!this.soundEnabled) return;
    this.init();
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.setValueAtTime(50, now + 0.1);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn("AudioContext block:", e);
    }
  }
}

class NetworkDefenderGame {
  constructor() {
    this.synth = new WebAudioSynth();
    this.isPlaying = false;
    this.score = 0;
    this.health = 3;
    this.level = 1;
    this.packets = [];
    
    // Core game parameters
    this.spawnRate = 2200; // ms between packet spawns
    this.baseSpeed = 1.6;  // falling speed
    this.lastSpawnTime = 0;
    
    this.directives = [
      {
        id: "smtp",
        text: "DIRETIVA: Bloquear Porta 25 (SMTP)",
        check: (p) => p.port === 25
      },
      {
        id: "dns",
        text: "DIRETIVA: Bloquear Porta 53 (DNS)",
        check: (p) => p.port === 53
      },
      {
        id: "udp",
        text: "DIRETIVA: Bloquear pacotes UDP",
        check: (p) => p.protocol === 'UDP'
      },
      {
        id: "class_a",
        text: "DIRETIVA: Bloquear IPs de Classe A (Início 1-126)",
        check: (p) => {
          const firstOctet = parseInt(p.ip.split('.')[0]);
          return firstOctet >= 1 && firstOctet <= 126;
        }
      },
      {
        id: "pop3",
        text: "DIRETIVA: Bloquear conexões POP3 (Porta 110)",
        check: (p) => p.port === 110
      },
      {
        id: "http",
        text: "DIRETIVA: Bloquear tráfego sem criptografia HTTP (Porta 80)",
        check: (p) => p.port === 80
      },
      {
        id: "malicious",
        text: "DIRETIVA: Bloquear pacotes na Porta 666 (Porta suspeita/Malware)",
        check: (p) => p.port === 666
      }
    ];

    this.currentDirective = null;
    this.directiveTimeLeft = 20; // seconds before directive changes
    this.directiveInterval = null;
    this.animationFrameId = null;

    this.packetProtocols = [
      { name: 'HTTP', port: 80, protocol: 'TCP', color: '#ec4899' },
      { name: 'HTTPS', port: 443, protocol: 'TCP', color: '#10b981' },
      { name: 'DNS', port: 53, protocol: 'UDP', color: '#3b82f6' },
      { name: 'SMTP', port: 25, protocol: 'TCP', color: '#f59e0b' },
      { name: 'POP3', port: 110, protocol: 'TCP', color: '#a855f7' },
      { name: 'IMAP', port: 143, protocol: 'TCP', color: '#06b6d4' },
      { name: 'PING', port: 0, protocol: 'ICMP', color: '#6366f1' },
      { name: 'TROJAN', port: 666, protocol: 'UDP', color: '#ef4444' }
    ];

    this.ips = [
      '192.168.1.15', // Class C
      '10.0.0.4',      // Class A
      '172.16.0.44',   // Class B
      '200.223.226.5', // Class C
      '8.8.8.8',       // Class A
      '127.0.0.1',     // Loopback
      '10.12.30.85',   // Class A
      '192.168.10.33'  // Class C
    ];

    this.initElements();
  }

  initElements() {
    this.laneContainer = document.getElementById('game-lanes');
    this.startScreen = document.getElementById('game-start-screen');
    this.gameScreen = document.getElementById('game-play-screen');
    this.gameOverScreen = document.getElementById('game-over-screen');
    
    // Bind buttons
    document.getElementById('game-start-btn').addEventListener('click', () => this.startGame());
    document.getElementById('game-retry-btn').addEventListener('click', () => this.startGame());
    
    const soundToggle = document.getElementById('game-sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        const enabled = this.synth.toggleSound();
        soundToggle.innerText = enabled ? '🔊 Som Ativo' : '🔇 Som Mudo';
      });
    }
  }

  startGame() {
    this.isPlaying = true;
    this.score = 0;
    this.health = 3;
    this.level = 1;
    this.packets = [];
    this.spawnRate = 2200;
    this.baseSpeed = 1.6;
    
    // Clean old packets from DOM
    if (this.laneContainer) this.laneContainer.innerHTML = '';
    
    this.updateStatsUI();

    // Toggle screens
    this.startScreen.style.display = 'none';
    this.gameOverScreen.style.display = 'none';
    this.gameScreen.style.display = 'block';

    // Set first directive
    this.changeDirective();
    this.startDirectiveTimer();

    // Run Game Loop
    this.lastSpawnTime = performance.now();
    this.animationFrameId = requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  startDirectiveTimer() {
    if (this.directiveInterval) clearInterval(this.directiveInterval);
    this.directiveTimeLeft = 20;
    this.updateDirectiveUI();

    this.directiveInterval = setInterval(() => {
      this.directiveTimeLeft--;
      this.updateDirectiveUI();
      
      if (this.directiveTimeLeft <= 0) {
        this.changeDirective();
        this.directiveTimeLeft = 20;
        this.updateDirectiveUI();
      }
    }, 1000);
  }

  changeDirective() {
    // Pick another random directive
    let newDir;
    do {
      newDir = this.directives[Math.floor(Math.random() * this.directives.length)];
    } while (this.currentDirective && newDir.id === this.currentDirective.id && this.directives.length > 1);

    this.currentDirective = newDir;
    document.getElementById('game-directive-banner').innerText = this.currentDirective.text;
    
    // Flash directive banner
    const banner = document.getElementById('game-directive-banner');
    banner.style.animation = 'none';
    setTimeout(() => {
      banner.style.animation = 'pulseGlow 1s ease-in-out infinite';
    }, 50);

    // Audio cue
    this.synth.playLaser();
  }

  updateDirectiveUI() {
    const timerText = document.getElementById('game-directive-timer');
    if (timerText) timerText.innerText = `Próxima diretiva em: ${this.directiveTimeLeft}s`;
  }

  updateStatsUI() {
    document.getElementById('game-score-val').innerText = this.score;
    document.getElementById('game-level-val').innerText = this.level;
    
    // Update HP dots
    const hpContainer = document.getElementById('game-hp-container');
    if (hpContainer) {
      hpContainer.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = `hp-dot ${i < this.health ? 'active' : ''}`;
        hpContainer.appendChild(dot);
      }
    }
  }

  generatePacket() {
    const protoObj = this.packetProtocols[Math.floor(Math.random() * this.packetProtocols.length)];
    const ip = this.ips[Math.floor(Math.random() * this.ips.length)];
    
    // Create random x position percentage (avoiding extreme edges)
    const xPos = Math.random() * 80 + 10; // 10% to 90%
    
    // Create packet DOM element
    const el = document.createElement('div');
    el.className = 'game-packet';
    el.style.left = `${xPos}%`;
    el.style.top = `-80px`;
    el.style.setProperty('--packet-color', protoObj.color);

    el.innerHTML = `
      <div class="packet-proto">${protoObj.name}</div>
      <div class="packet-detail">P: ${protoObj.port === 0 ? 'N/A' : protoObj.port}</div>
      <div class="packet-detail">${protoObj.protocol}</div>
      <div class="packet-detail" style="font-size: 0.65rem; opacity:0.8">${ip}</div>
    `;

    this.laneContainer.appendChild(el);

    const packetObj = {
      element: el,
      y: -80,
      speed: this.baseSpeed + Math.random() * 0.6,
      port: protoObj.port,
      protocol: protoObj.protocol,
      ip: ip,
      name: protoObj.name,
      color: protoObj.color
    };

    // Add click event for drop action
    el.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      this.dropPacket(packetObj);
    });

    this.packets.push(packetObj);
  }

  dropPacket(packet) {
    this.synth.playLaser();
    this.createExplosionEffect(packet);
    
    // Remove from array and DOM
    this.removePacket(packet);

    // Score evaluation
    const violates = this.currentDirective.check(packet);
    if (violates) {
      // Good drop!
      this.score += 15;
      this.synth.playExplosion();
      this.checkLevelProgression();
    } else {
      // Bad drop! (User blocked legitimate traffic)
      this.score = Math.max(0, this.score - 10);
      this.health--;
      this.synth.playHit();
      this.triggerServerDamage();
    }
    this.updateStatsUI();

    if (this.health <= 0) {
      this.endGame();
    }
  }

  removePacket(packet) {
    if (packet.element && packet.element.parentElement) {
      packet.element.parentElement.removeChild(packet.element);
    }
    this.packets = this.packets.filter(p => p !== packet);
  }

  createExplosionEffect(packet) {
    // Spawn simple floating particle fragments
    const rect = packet.element.getBoundingClientRect();
    const parentRect = this.laneContainer.getBoundingClientRect();
    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const part = document.createElement('div');
      part.className = 'game-particle';
      part.style.left = `${x}px`;
      part.style.top = `${y}px`;
      part.style.background = packet.color;
      
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 40 + 20;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      part.style.setProperty('--dx', `${dx}px`);
      part.style.setProperty('--dy', `${dy}px`);

      this.laneContainer.appendChild(part);
      
      // Auto cleanup particles
      setTimeout(() => {
        if (part.parentElement) part.parentElement.removeChild(part);
      }, 600);
    }
  }

  triggerServerDamage() {
    const lane = document.getElementById('game-lanes');
    if (lane) {
      lane.classList.add('damage-shake');
      setTimeout(() => {
        lane.classList.remove('damage-shake');
      }, 500);
    }
  }

  checkLevelProgression() {
    const oldLevel = this.level;
    this.level = Math.floor(this.score / 150) + 1;
    
    if (this.level > oldLevel) {
      // Speed up and scale level
      this.baseSpeed += 0.3;
      this.spawnRate = Math.max(900, this.spawnRate - 250);
      this.synth.playLaser();
      
      // Level up visual notification
      const banner = document.getElementById('game-directive-banner');
      if (banner) {
        banner.innerText = `LEVEL UP! LEVEL ${this.level} ALCANÇADO!`;
        banner.style.color = '#10b981';
        
        setTimeout(() => {
          banner.style.color = '';
          if (this.currentDirective) banner.innerText = this.currentDirective.text;
        }, 2500);
      }
    }
  }

  gameLoop(timestamp) {
    if (!this.isPlaying) return;

    // Spawn packets
    if (timestamp - this.lastSpawnTime > this.spawnRate) {
      this.generatePacket();
      this.lastSpawnTime = timestamp;
    }

    // Move packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.y += p.speed;
      p.element.style.top = `${p.y}px`;

      // Check if packet reached server (bottom of lanes container, let's say 440px)
      const containerHeight = this.laneContainer.clientHeight || 460;
      if (p.y > containerHeight - 50) {
        // Evaluate packet passing through
        const violates = this.currentDirective.check(p);
        this.removePacket(p);

        if (violates) {
          // Allowed malicious packet through! Server gets hit
          this.health--;
          this.synth.playHit();
          this.triggerServerDamage();
          this.updateStatsUI();
        } else {
          // Allowed legitimate packet through! Good!
          this.score += 5;
          this.checkLevelProgression();
          this.updateStatsUI();
        }

        if (this.health <= 0) {
          this.endGame();
          return;
        }
      }
    }

    this.animationFrameId = requestAnimationFrame((ts) => this.gameLoop(ts));
  }

  endGame() {
    this.isPlaying = false;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.directiveInterval) clearInterval(this.directiveInterval);

    // Save score metrics to parent study manager if loaded
    if (window.app) {
      window.app.saveProgress('game_highscore', this.score > 200);
    }

    // Toggle screens
    this.gameScreen.style.display = 'none';
    this.gameOverScreen.style.display = 'block';
    
    document.getElementById('game-final-score').innerText = this.score;
    document.getElementById('game-final-level').innerText = this.level;
  }
}

// Bind game instantiation to window load alongside index views
let ndGame;
window.addEventListener('DOMContentLoaded', () => {
  ndGame = new NetworkDefenderGame();
  
  // Link to sidebar view controller
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      // If leaving game view, make sure game is stopped
      if (view !== 'game' && ndGame && ndGame.isPlaying) {
        ndGame.endGame();
      }
    });
  });
});
