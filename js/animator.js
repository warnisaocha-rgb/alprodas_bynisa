/**
 * ALPRO-LAB ANIMATED SIMULATION ENGINE ("Bioskop Edukasi C++")
 * HTML5 Canvas + Web Audio API untuk animasi ramah orang awam & pemula
 */

const Animator = {
  canvas: null,
  ctx: null,
  currentVideoId: "sim-vid-1",
  isPlaying: false,
  currentTime: 0,
  playbackSpeed: 1,
  animationFrameId: null,
  isMuted: false,
  audioCtx: null,

  init: function() {
    this.canvas = document.getElementById("anim-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    // Resize canvas internal resolution
    this.canvas.width = 800;
    this.canvas.height = 420;

    this.setupControls();
    this.loadVideo("sim-vid-1");
  },

  setupControls: function() {
    const playBtn = document.getElementById("anim-play-btn");
    const restartBtn = document.getElementById("anim-restart-btn");
    const scrubSlider = document.getElementById("anim-scrub-slider");
    const vidSelect = document.getElementById("anim-video-select");
    const speedSelect = document.getElementById("anim-speed-select");
    const muteBtn = document.getElementById("anim-mute-btn");

    if (playBtn) {
      playBtn.addEventListener("click", () => this.togglePlay());
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        this.currentTime = 0;
        if (scrubSlider) scrubSlider.value = 0;
        this.drawCurrentFrame();
      });
    }

    if (scrubSlider) {
      scrubSlider.addEventListener("input", (e) => {
        this.currentTime = parseFloat(e.target.value);
        this.drawCurrentFrame();
      });
    }

    if (vidSelect) {
      vidSelect.addEventListener("change", (e) => {
        this.loadVideo(e.target.value);
      });
    }

    if (speedSelect) {
      speedSelect.addEventListener("change", (e) => {
        this.playbackSpeed = parseFloat(e.target.value) || 1;
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        this.isMuted = !this.isMuted;
        muteBtn.textContent = this.isMuted ? "🔇 Suara Mati" : "🔊 Suara Aktif";
      });
    }
  },

  initAudio: function() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  },

  playSound: function(type) {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === "pop") {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "chime") {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "bump") {
        osc.type = "square";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio context might be restricted before gesture
    }
  },

  loadVideo: function(vidId) {
    this.currentVideoId = vidId;
    this.currentTime = 0;
    this.pause();

    const videoData = ALPRO_DATA.videoSimulations.find(v => v.id === vidId) || ALPRO_DATA.videoSimulations[0];
    const scrubSlider = document.getElementById("anim-scrub-slider");
    const titleEl = document.getElementById("anim-video-title");
    const taglineEl = document.getElementById("anim-video-tagline");

    if (titleEl) titleEl.textContent = videoData.title;
    if (taglineEl) taglineEl.textContent = videoData.tagline;

    if (scrubSlider) {
      scrubSlider.max = videoData.durationSec;
      scrubSlider.value = 0;
    }

    this.drawCurrentFrame();
  },

  togglePlay: function() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  play: function() {
    this.isPlaying = true;
    const playBtn = document.getElementById("anim-play-btn");
    if (playBtn) playBtn.innerHTML = "⏸️ Jeda";
    this.playSound("pop");
    this.lastTimestamp = performance.now();
    this.loop();
  },

  pause: function() {
    this.isPlaying = false;
    const playBtn = document.getElementById("anim-play-btn");
    if (playBtn) playBtn.innerHTML = "▶️ Putar Animasi";
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },

  loop: function(timestamp) {
    if (!this.isPlaying) return;

    if (this.lastTimestamp) {
      const dt = (timestamp - this.lastTimestamp) / 1000;
      this.currentTime += dt * this.playbackSpeed;
    }
    this.lastTimestamp = timestamp;

    const videoData = ALPRO_DATA.videoSimulations.find(v => v.id === this.currentVideoId);
    const scrubSlider = document.getElementById("anim-scrub-slider");

    if (this.currentTime >= videoData.durationSec) {
      this.currentTime = videoData.durationSec;
      this.pause();
    }

    if (scrubSlider) scrubSlider.value = this.currentTime;

    this.drawCurrentFrame();

    if (this.isPlaying) {
      this.animationFrameId = requestAnimationFrame((ts) => this.loop(ts));
    }
  },

  drawCurrentFrame: function() {
    if (!this.ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const t = this.currentTime;

    // Detect active theme
    const isPinkTheme = document.documentElement.classList.contains("theme-pink-sorbet");

    // Background fill
    if (isPinkTheme) {
      const grad = this.ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#FFF5F8");
      grad.addColorStop(1, "#FFE6EE");
      this.ctx.fillStyle = grad;
    } else {
      const grad = this.ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#0b0f19");
      grad.addColorStop(1, "#111827");
      this.ctx.fillStyle = grad;
    }
    this.ctx.fillRect(0, 0, w, h);

    if (this.currentVideoId === "sim-vid-1") {
      this.drawVideo1(t, isPinkTheme);
    } else if (this.currentVideoId === "sim-vid-2") {
      this.drawVideo2(t, isPinkTheme);
    } else {
      this.drawVideo3(t, isPinkTheme);
    }

    this.updateSubtitle(t);
  },

  updateSubtitle: function(t) {
    const videoData = ALPRO_DATA.videoSimulations.find(v => v.id === this.currentVideoId);
    const subtitleEl = document.getElementById("anim-subtitle-text");
    if (!subtitleEl) return;

    let activeStep = videoData.steps[0];
    for (const s of videoData.steps) {
      if (t >= s.time) {
        activeStep = s;
      }
    }

    subtitleEl.innerHTML = `
      <strong class="text-sky-400 font-bold">${activeStep.title}:</strong>
      <span class="text-slate-200 ml-1.5">${activeStep.desc}</span>
    `;
  },

  // -------------------------------------------------------------
  // ANIMASI 1: FOKUS PERBEDAAN TIPE DATA (LAPRAK 1)
  // -------------------------------------------------------------
  drawVideo1: function(t, isPink) {
    const ctx = this.ctx;
    const w = this.canvas.width;

    ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = isPink ? "#F44F83" : "#38BDF8";
    ctx.textAlign = "center";
    ctx.fillText("PERBEDAAN KARAKTERISTIK TIPE DATA C++ (LAPRAK 1)", w / 2, 32);

    // 4 Bento Cards for: 1. int, 2. float/double, 3. char/string, 4. bool
    const cardY = 65;
    const cardW = 160;
    const cardH = 255;
    const startX = 40;
    const gap = 25;

    // CARD 1: int (Bilangan Bulat)
    const isAct1 = t < 7;
    const x1 = startX;
    ctx.fillStyle = isAct1 ? (isPink ? "#FFE4EE" : "#1E293B") : (isPink ? "#FFF0F5" : "#111827");
    ctx.strokeStyle = isAct1 ? (isPink ? "#F44F83" : "#38BDF8") : (isPink ? "#EE9DBD" : "#334155");
    ctx.lineWidth = isAct1 ? 3 : 1.5;
    ctx.beginPath();
    ctx.roundRect(x1, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPink ? "#F44F83" : "#38BDF8";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("1. Integer (int)", x1 + cardW / 2, cardY + 28);
    ctx.font = "10px monospace";
    ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
    ctx.fillText("Bilangan Bulat (4 Byte)", x1 + cardW / 2, cardY + 45);

    // Visual int box
    ctx.fillStyle = isPink ? "#F44F83" : "#0284C7";
    ctx.beginPath();
    ctx.roundRect(x1 + 20, cardY + 65, cardW - 40, 60, 8);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px monospace";
    ctx.fillText("10", x1 + cardW / 2, cardY + 102);

    // Truncate demo if active
    if (isAct1) {
      ctx.fillStyle = "#EF4444";
      ctx.font = "bold 10px sans-serif";
      ctx.fillText("⚠️ Uji Isi 3.14:", x1 + cardW / 2, cardY + 155);
      ctx.font = "10px monospace";
      ctx.fillStyle = isPink ? "#4C0519" : "#E2E8F0";
      ctx.fillText(".14 DIBUANG!", x1 + cardW / 2, cardY + 175);
      ctx.fillText("Hasil simpan: 3", x1 + cardW / 2, cardY + 195);
    } else {
      ctx.font = "10px sans-serif";
      ctx.fillStyle = isPink ? "#A24268" : "#64748B";
      ctx.fillText("Contoh: 10, -5, 50000", x1 + cardW / 2, cardY + 160);
      ctx.fillText("Tidak ada koma!", x1 + cardW / 2, cardY + 180);
    }

    // CARD 2: float & double (Pecahan Desimal)
    const isAct2 = t >= 7 && t < 14;
    const x2 = startX + (cardW + gap);
    ctx.fillStyle = isAct2 ? (isPink ? "#FFE4EE" : "#1E293B") : (isPink ? "#FFF0F5" : "#111827");
    ctx.strokeStyle = isAct2 ? (isPink ? "#F44F83" : "#10B981") : (isPink ? "#EE9DBD" : "#334155");
    ctx.lineWidth = isAct2 ? 3 : 1.5;
    ctx.beginPath();
    ctx.roundRect(x2, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPink ? "#F44F83" : "#10B981";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("2. float & double", x2 + cardW / 2, cardY + 28);
    ctx.font = "10px monospace";
    ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
    ctx.fillText("Pecahan Riil (4/8 Byte)", x2 + cardW / 2, cardY + 45);

    // Visual float box
    ctx.fillStyle = isPink ? "#F44F83" : "#059669";
    ctx.beginPath();
    ctx.roundRect(x2 + 20, cardY + 65, cardW - 40, 60, 8);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 18px monospace";
    ctx.fillText("3.14f", x2 + cardW / 2, cardY + 102);

    ctx.fillStyle = isPink ? "#4C0519" : "#E2E8F0";
    ctx.font = "10px sans-serif";
    ctx.fillText("Ada koma desimal!", x2 + cardW / 2, cardY + 155);
    ctx.font = "10px monospace";
    ctx.fillText("float : 7 digit", x2 + cardW / 2, cardY + 175);
    ctx.fillText("double: 15 digit", x2 + cardW / 2, cardY + 195);

    // CARD 3: char vs string (Teks)
    const isAct3 = t >= 14 && t < 20;
    const x3 = startX + 2 * (cardW + gap);
    ctx.fillStyle = isAct3 ? (isPink ? "#FFE4EE" : "#1E293B") : (isPink ? "#FFF0F5" : "#111827");
    ctx.strokeStyle = isAct3 ? (isPink ? "#F44F83" : "#F59E0B") : (isPink ? "#EE9DBD" : "#334155");
    ctx.lineWidth = isAct3 ? 3 : 1.5;
    ctx.beginPath();
    ctx.roundRect(x3, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPink ? "#F44F83" : "#F59E0B";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("3. char vs string", x3 + cardW / 2, cardY + 28);
    ctx.font = "10px monospace";
    ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
    ctx.fillText("Teks & Karakter", x3 + cardW / 2, cardY + 45);

    // Visual char vs string
    ctx.fillStyle = isPink ? "#F44F83" : "#D97706";
    ctx.beginPath();
    ctx.roundRect(x3 + 15, cardY + 65, cardW - 30, 32, 6);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 14px monospace";
    ctx.fillText("'A' (char 1B)", x3 + cardW / 2, cardY + 86);

    ctx.fillStyle = isPink ? "#E9CBE5" : "#475569";
    ctx.beginPath();
    ctx.roundRect(x3 + 15, cardY + 105, cardW - 30, 32, 6);
    ctx.fill();
    ctx.fillStyle = isPink ? "#4C0519" : "#FFFFFF";
    ctx.font = "bold 12px monospace";
    ctx.fillText('"UNM" (string)', x3 + cardW / 2, cardY + 126);

    ctx.fillStyle = isPink ? "#4C0519" : "#E2E8F0";
    ctx.font = "10px sans-serif";
    ctx.fillText("char: petik tunggal ' '", x3 + cardW / 2, cardY + 165);
    ctx.fillText("string: petik ganda \" \"", x3 + cardW / 2, cardY + 185);

    // CARD 4: bool (Logika True/False)
    const isAct4 = t >= 20;
    const x4 = startX + 3 * (cardW + gap);
    ctx.fillStyle = isAct4 ? (isPink ? "#FFE4EE" : "#1E293B") : (isPink ? "#FFF0F5" : "#111827");
    ctx.strokeStyle = isAct4 ? (isPink ? "#F44F83" : "#A855F7") : (isPink ? "#EE9DBD" : "#334155");
    ctx.lineWidth = isAct4 ? 3 : 1.5;
    ctx.beginPath();
    ctx.roundRect(x4, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPink ? "#F44F83" : "#A855F7";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("4. Boolean (bool)", x4 + cardW / 2, cardY + 28);
    ctx.font = "10px monospace";
    ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
    ctx.fillText("Logika (1 Byte)", x4 + cardW / 2, cardY + 45);

    // Visual bool switch
    ctx.fillStyle = isPink ? "#F44F83" : "#9333EA";
    ctx.beginPath();
    ctx.roundRect(x4 + 20, cardY + 65, cardW - 40, 60, 8);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px monospace";
    ctx.fillText("true (1)", x4 + cardW / 2, cardY + 102);

    ctx.fillStyle = isPink ? "#4C0519" : "#E2E8F0";
    ctx.font = "10px sans-serif";
    ctx.fillText("Hanya 2 keadaan:", x4 + cardW / 2, cardY + 155);
    ctx.font = "10px monospace";
    ctx.fillText("true  = 1", x4 + cardW / 2, cardY + 175);
    ctx.fillText("false = 0", x4 + cardW / 2, cardY + 195);

    // Mascot
    this.drawMascot(60, 360, "Kak Asdos (Tipe Data) 🎓", isPink);
  },

  // -------------------------------------------------------------
  // ANIMASI 2: FOKUS OPERATOR PENUGASAN (LAPRAK 2)
  // -------------------------------------------------------------
  drawVideo2: function(t, isPink) {
    const ctx = this.ctx;
    const w = this.canvas.width;

    ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = isPink ? "#F44F83" : "#10B981";
    ctx.textAlign = "center";
    ctx.fillText("OPERATOR PENUGASAN (ASSIGNMENT) C++ (LAPRAK 2)", w / 2, 32);

    // Dynamic state based on time
    let cmdStr = "int x = 10;";
    let currentVal = 10;
    let descTitle = "1. Penugasan Dasar (=)";
    let descDetail = "Memasukkan nilai 10 dari sisi kanan ke variabel x.";

    if (t < 6) {
      cmdStr = "x = 10;";
      currentVal = 10;
      descTitle = "1. Penugasan Nilai Awal: x = 10";
      descDetail = "Nilai 10 dimasukkan ke wadah memori variabel x.";
    } else if (t < 11) {
      cmdStr = "x += 5; // x = x + 5";
      currentVal = 15;
      descTitle = "2. Compound Addition: x += 5";
      descDetail = "Nilai awal (10) ditambah 5, sekarang isi variabel x = 15!";
    } else if (t < 17) {
      cmdStr = "x *= 2; // x = x * 2";
      currentVal = 30;
      descTitle = "3. Compound Multiplication: x *= 2";
      descDetail = "Nilai (15) dikalikan 2, sekarang isi variabel x = 30!";
    } else {
      cmdStr = "x %= 4; // x = x % 4";
      currentVal = 2;
      descTitle = "4. Compound Modulo: x %= 4";
      descDetail = "30 dibagi 4 bersisa 2. Sisa pembagian (2) disimpan ke x!";
    }

    // Code Box (Left)
    const codeBoxX = 70;
    const codeBoxY = 80;
    const codeBoxW = 280;
    const codeBoxH = 170;

    ctx.fillStyle = isPink ? "#FFF0F5" : "#111827";
    ctx.strokeStyle = isPink ? "#EE9DBD" : "#334155";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(codeBoxX, codeBoxY, codeBoxW, codeBoxH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "left";
    ctx.fillText("// Baris Perintah yang Berjalan:", codeBoxX + 16, codeBoxY + 30);

    ctx.fillStyle = isPink ? "#F44F83" : "#38BDF8";
    ctx.font = "bold 16px monospace";
    ctx.fillText(cmdStr, codeBoxX + 16, codeBoxY + 70);

    ctx.fillStyle = isPink ? "#4C0519" : "#E2E8F0";
    ctx.font = "12px sans-serif";
    ctx.fillText(descTitle, codeBoxX + 16, codeBoxY + 115);
    ctx.font = "11px sans-serif";
    ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
    ctx.fillText(descDetail, codeBoxX + 16, codeBoxY + 140);

    // Arrow to Variable Safe
    ctx.fillStyle = isPink ? "#F44F83" : "#10B981";
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("➔", w / 2 + 10, codeBoxY + codeBoxH / 2 + 10);

    // Variable Safe/Container (Right)
    const safeX = 450;
    const safeY = 80;
    const safeW = 280;
    const safeH = 170;

    ctx.fillStyle = isPink ? "#FFE4EE" : "#0F172A";
    ctx.strokeStyle = isPink ? "#F44F83" : "#10B981";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(safeX, safeY, safeW, safeH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPink ? "#F44F83" : "#10B981";
    ctx.font = "bold 13px monospace";
    ctx.fillText("WADAH VARIABEL: x (int)", safeX + safeW / 2, safeY + 35);

    // Value Display
    ctx.fillStyle = isPink ? "#F44F83" : "#34D399";
    ctx.font = "bold 56px monospace";
    ctx.fillText(currentVal.toString(), safeX + safeW / 2, safeY + 115);

    // Warning Banner at bottom
    ctx.fillStyle = isPink ? "#FFCAD6" : "#1E293B";
    ctx.beginPath();
    ctx.roundRect(w / 2 - 270, 275, 540, 45, 10);
    ctx.fill();

    ctx.fillStyle = isPink ? "#881337" : "#FCD34D";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("⚠️ PENTING: '=' adalah Penugasan (Isi Nilai), BUKAN '==' (Perbandingan)!", w / 2, 303);

    this.drawMascot(60, 360, "Asisten Operator ⚡", isPink);
  },

  // -------------------------------------------------------------
  // ANIMASI 3: FOKUS TIPE DATA BENTUKAN (LAPRAK 3)
  // -------------------------------------------------------------
  drawVideo3: function(t, isPink) {
    const ctx = this.ctx;
    const w = this.canvas.width;

    ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = isPink ? "#F44F83" : "#C084FC";
    ctx.textAlign = "center";
    ctx.fillText("TIPE DATA BENTUKAN / USER-DEFINED TYPES (LAPRAK 3)", w / 2, 32);

    if (t < 7) {
      // 1. Kenapa butuh Tipe Bentukan? (Laprak 3.1)
      ctx.fillStyle = isPink ? "#881337" : "#E2E8F0";
      ctx.font = "13px sans-serif";
      ctx.fillText("1. Mengapa Butuh Tipe Bentukan? Objek Nyata Punya Banyak Atribut!", w / 2, 65);

      // Package Box
      const boxX = w / 2 - 160;
      const boxY = 90;
      const boxW = 320;
      const boxH = 150;

      ctx.fillStyle = isPink ? "#FFE4EE" : "#1E293B";
      ctx.strokeStyle = isPink ? "#F44F83" : "#A855F7";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPink ? "#F44F83" : "#C084FC";
      ctx.font = "bold 13px monospace";
      ctx.fillText("struct paket_internet { ... } begadang;", w / 2, boxY + 30);

      ctx.font = "12px monospace";
      ctx.fillStyle = isPink ? "#4C0519" : "#E2E8F0";
      ctx.fillText("• nama_paket    : \"Begadang\" (string)", w / 2, boxY + 65);
      ctx.fillText("• kouta_telpon  : 50 Menit (int)", w / 2, boxY + 95);
      ctx.fillText("• kouta_internet: 25 GB (int)", w / 2, boxY + 125);

      ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
      ctx.font = "12px sans-serif";
      ctx.fillText("Tipe data dasar tak bisa menampung ketiganya sekaligus dalam 1 wadah!", w / 2, 275);

    } else if (t < 14) {
      // 2. Struct: Memori Terpisah
      ctx.fillStyle = isPink ? "#881337" : "#E2E8F0";
      ctx.font = "13px sans-serif";
      ctx.fillText("2. STRUCT: Setiap Member Punya Alamat Memori Sendiri (12 Bytes)", w / 2, 65);

      const roomY = 100;
      const roomW = 190;
      const roomH = 110;

      // 3 Rooms
      const rooms = [
        { name: "nama_paket", val: '"Begadang"', addr: "0x7FFE10" },
        { name: "kouta_telpon", val: "50 Menit", addr: "0x7FFE14" },
        { name: "kouta_internet", val: "25 GB", addr: "0x7FFE18" }
      ];

      rooms.forEach((r, idx) => {
        const rx = 80 + idx * 220;
        ctx.fillStyle = isPink ? "#FFE4EE" : "#1E293B";
        ctx.strokeStyle = isPink ? "#EE9DBD" : "#A855F7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(rx, roomY, roomW, roomH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isPink ? "#F44F83" : "#C084FC";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(r.name, rx + roomW / 2, roomY + 30);
        ctx.font = "16px monospace";
        ctx.fillText(r.val, rx + roomW / 2, roomY + 65);
        ctx.font = "10px monospace";
        ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
        ctx.fillText(`Alamat: ${r.addr}`, rx + roomW / 2, roomY + 95);
      });

      ctx.fillStyle = isPink ? "#881337" : "#E2E8F0";
      ctx.font = "12px sans-serif";
      ctx.fillText("Semua member tersimpan aman dan tidak saling mengganggu! Di akses: begadang.nama_member", w / 2, 260);

    } else if (t < 20) {
      // 3. Union: Memori Bersama (Laprak 3.2)
      ctx.fillStyle = isPink ? "#881337" : "#E2E8F0";
      ctx.font = "13px sans-serif";
      ctx.fillText("3. UNION: Hanya Ada 1 Alamat Memori Bersama (Total 4 Byte!) (Laprak 3.2)", w / 2, 65);

      const uX = w / 2 - 140;
      const uY = 100;
      const uW = 280;
      const uH = 110;

      ctx.fillStyle = isPink ? "#FFE4EE" : "#1E293B";
      ctx.strokeStyle = isPink ? "#F44F83" : "#F59E0B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(uX, uY, uW, uH, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPink ? "#F44F83" : "#F59E0B";
      ctx.font = "bold 12px monospace";
      ctx.fillText("SATU KOTAK MEMORI BERSAMA (0x7FFE10)", w / 2, uY + 30);
      ctx.font = "bold 26px monospace";
      ctx.fillText("85.5", w / 2, uY + 70);
      ctx.font = "11px sans-serif";
      ctx.fillStyle = isPink ? "#A24268" : "#94A3B8";
      ctx.fillText("(Diisi oleh: budi.nilaiPengetahuan)", w / 2, uY + 95);

      ctx.fillStyle = "#EF4444";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("⚠️ TERTIMPA: Nilai sikap (70.5) tertimpa menjadi 85.5 karena 1 alamat!", w / 2, 255);

    } else {
      // 4. Enum & Typedef (Laprak 3.3 & 3.5)
      ctx.fillStyle = isPink ? "#881337" : "#E2E8F0";
      ctx.font = "13px sans-serif";
      ctx.fillText("4. ENUM & TYPEDEF: Konstanta Berindeks & Nama Panggilan Baru", w / 2, 65);

      // Enum ribbon
      const eY = 95;
      ctx.fillStyle = isPink ? "#FFF0F5" : "#111827";
      ctx.strokeStyle = isPink ? "#EE9DBD" : "#334155";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(80, eY, 640, 55, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPink ? "#F44F83" : "#38BDF8";
      ctx.font = "bold 11px monospace";
      ctx.fillText("enum namaPresiden { Soekarno(0), Soeharto(1), Habibie(2), Megawati(3), Gusdur(4), SBY(5), Jokowi(6) };", w / 2, eY + 32);

      // Typedef box
      const tY = 165;
      ctx.beginPath();
      ctx.roundRect(80, tY, 640, 55, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPink ? "#F44F83" : "#10B981";
      ctx.font = "bold 12px monospace";
      ctx.fillText("typedef float angkaPecahan;  --> Membuat alias baru untuk tipe float!", w / 2, tY + 32);

      ctx.fillStyle = isPink ? "#881337" : "#E2E8F0";
      ctx.font = "12px sans-serif";
      ctx.fillText("Habibie bernilai 2 (+1 = Presiden Ke-3). Jokowi bernilai 6 (+1 = Presiden Ke-7)!", w / 2, 260);
    }

    this.drawMascot(60, 360, "Kak Asdos (Tipe Bentukan) 🎓", isPink);
  },

  drawMascot: function(x, y, label, isPink) {
    const ctx = this.ctx;

    // Cat Face Badge
    ctx.fillStyle = isPink ? "#F44F83" : "#38BDF8";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Cat ears
    ctx.beginPath();
    ctx.moveTo(x - 18, y - 10);
    ctx.lineTo(x - 10, y - 26);
    ctx.lineTo(x - 2, y - 18);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 2, y - 18);
    ctx.lineTo(x + 10, y - 26);
    ctx.lineTo(x + 18, y - 10);
    ctx.fill();

    // Eyes
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(x - 7, y - 2, 3, 0, Math.PI * 2);
    ctx.arc(x + 7, y - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = isPink ? "#F44F83" : "#94A3B8";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(label, x + 30, y + 4);
  }
};
