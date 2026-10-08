/**
 * ALPRO-LAB SIMULASI UTS LIVE CODING ENGINE
 * Format: Live Coding Mengisi Titik-Titik Kode Program (Laprak 1 - 3 Gabungan)
 */

const UTSEngine = {
  activePackageId: "uts-paket-a",
  timerInterval: null,
  timeRemainingSeconds: 900, // 15 menit
  isTimerRunning: false,
  studentName: "Praktikan Alprodas",
  studentNim: "250210500001",
  examSubmitted: false,

  init: function() {
    const pkgSelect = document.getElementById("uts-package-select");
    const nameInput = document.getElementById("uts-student-name");
    const nimInput = document.getElementById("uts-student-nim");
    const timerBtn = document.getElementById("uts-timer-toggle-btn");
    const submitBtn = document.getElementById("uts-submit-btn");
    const resetBtn = document.getElementById("uts-reset-btn");

    if (pkgSelect) {
      pkgSelect.addEventListener("change", (e) => {
        this.loadPackage(e.target.value);
      });
    }

    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        this.studentName = e.target.value.trim() || "Praktikan Alprodas";
      });
    }

    if (nimInput) {
      nimInput.addEventListener("input", (e) => {
        this.studentNim = e.target.value.trim() || "250210500001";
      });
    }

    if (timerBtn) {
      timerBtn.addEventListener("click", () => this.toggleTimer());
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => this.submitExam());
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.loadPackage(this.activePackageId));
    }

    this.loadPackage("uts-paket-a");
  },

  getPackage: function(pkgId) {
    return ALPRO_DATA.utsPackages.find(p => p.id === pkgId) || ALPRO_DATA.utsPackages[0];
  },

  loadPackage: function(pkgId) {
    this.activePackageId = pkgId;
    this.examSubmitted = false;
    const pkg = this.getPackage(pkgId);

    // Reset timer
    this.stopTimer();
    this.timeRemainingSeconds = pkg.durationMinutes * 60;
    this.updateTimerDisplay();

    // Set UI Texts
    const titleEl = document.getElementById("uts-scenario-title");
    const scenarioEl = document.getElementById("uts-scenario-desc");
    const modulesEl = document.getElementById("uts-covered-modules");
    const resultBox = document.getElementById("uts-result-box");
    const terminalEl = document.getElementById("uts-terminal-output");

    if (titleEl) titleEl.textContent = pkg.title;
    if (scenarioEl) scenarioEl.textContent = pkg.scenario;
    if (modulesEl) modulesEl.textContent = pkg.coveredModules;
    if (resultBox) resultBox.classList.add("hidden");

    if (terminalEl) {
      terminalEl.innerHTML = `<span class="text-slate-500">// Terminal Siaga. Isi titik-titik kode dan klik "Uji & Kompilasi UTS (g++)"...</span>`;
    }

    this.renderInteractiveCode(pkg);
  },

  renderInteractiveCode: function(pkg) {
    const editorContainer = document.getElementById("uts-code-interactive-area");
    if (!editorContainer) return;

    // Replace ___BLANK_X___ with interactive input boxes
    let codeHtml = pkg.rawCode;
    pkg.blanks.forEach(b => {
      const placeholder = b.hint;
      const blankInputHtml = `<input type="text" id="uts_input_${b.id}" data-blank-id="${b.id}" class="uts-blank-input px-2.5 py-0.5 rounded-md font-mono font-bold text-xs outline-none transition-all duration-200" style="min-width: 120px;" placeholder="[ ${b.label} ]" title="${placeholder}">`;
      codeHtml = codeHtml.replace(`___${b.id}___`, blankInputHtml);
    });

    // Format into line numbered blocks with syntax styling
    const lines = codeHtml.split('\n');
    let finalHtml = "";
    lines.forEach((line, idx) => {
      // Split and style inline comments
      let formattedLine = line;
      const commentIdx = formattedLine.indexOf("//");
      if (commentIdx !== -1) {
        const codePart = formattedLine.substring(0, commentIdx);
        const commentPart = formattedLine.substring(commentIdx);
        formattedLine = `${codePart}<span class="uts-code-comment">${commentPart}</span>`;
      }

      finalHtml += `
        <div class="uts-code-row flex items-center px-3 py-0.5 rounded">
          <span class="uts-code-lineno w-8 text-right pr-3 font-mono text-[11px] select-none">${idx + 1}</span>
          <span class="uts-code-text font-mono text-xs whitespace-pre">${formattedLine}</span>
        </div>
      `;
    });

    editorContainer.innerHTML = finalHtml;

    // Auto start timer when student starts typing
    const inputs = editorContainer.querySelectorAll(".uts-blank-input");
    inputs.forEach(inp => {
      inp.addEventListener("focus", () => {
        if (!this.isTimerRunning && !this.examSubmitted) {
          this.startTimer();
        }
      });
    });
  },

  toggleTimer: function() {
    if (this.isTimerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  },

  startTimer: function() {
    this.isTimerRunning = true;
    const btn = document.getElementById("uts-timer-toggle-btn");
    if (btn) btn.innerHTML = "⏸️ Jeda Waktu";

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.timeRemainingSeconds > 0) {
        this.timeRemainingSeconds--;
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
        alert("⏰ Waktu UTS Telah Habis! Sistem akan mengevaluasi jawaban Anda sekarang.");
        this.submitExam();
      }
    }, 1000);
  },

  stopTimer: function() {
    this.isTimerRunning = false;
    const btn = document.getElementById("uts-timer-toggle-btn");
    if (btn) btn.innerHTML = "▶️ Lanjutkan Timer";
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  updateTimerDisplay: function() {
    const timerEl = document.getElementById("uts-timer-display");
    if (!timerEl) return;
    const m = Math.floor(this.timeRemainingSeconds / 60);
    const s = this.timeRemainingSeconds % 60;
    timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    if (this.timeRemainingSeconds < 180) {
      timerEl.className = "text-rose-400 font-mono font-bold text-lg animate-pulse";
    } else {
      timerEl.className = "text-amber-400 font-mono font-bold text-lg";
    }
  },

  submitExam: function() {
    this.stopTimer();
    this.examSubmitted = true;
    const pkg = this.getPackage(this.activePackageId);
    let correctCount = 0;
    const feedbackList = [];

    pkg.blanks.forEach(b => {
      const inputEl = document.getElementById(`uts_input_${b.id}`);
      if (!inputEl) return;
      const userVal = inputEl.value.trim();

      // Check case-insensitive against acceptable answers
      const isCorrect = b.answers.some(ans => ans.toLowerCase() === userVal.toLowerCase());

      if (isCorrect) {
        correctCount++;
        inputEl.className = "uts-blank-input uts-blank-correct px-2.5 py-0.5 rounded-md font-mono font-bold text-xs";
      } else {
        inputEl.className = "uts-blank-input uts-blank-wrong px-2.5 py-0.5 rounded-md font-mono font-bold text-xs";
        feedbackList.push({
          label: b.label,
          userAns: userVal || "(Dikosongkan)",
          hint: b.hint,
          explanation: b.explanation,
          correctAns: b.answers[0]
        });
      }
    });

    const total = pkg.blanks.length;
    const score = Math.round((correctCount / total) * 100);
    const isPassed = score >= 70;

    // Terminal compilation animation
    const terminalEl = document.getElementById("uts-terminal-output");
    if (terminalEl) {
      terminalEl.innerHTML = `
        <div class="text-sky-400 animate-pulse font-mono">
          &gt; g++ -O2 -Wall uts_ujian.cpp -o uts_ujian<br>
          ${isPassed ? '&gt; [Kompilasi Sukses! 0 Galat, 0 Peringatan]' : '&gt; [Galat Sintaks Terdeteksi! Periksa titik-titik bertanda merah]'}
        </div>
      `;

      setTimeout(() => {
        if (isPassed) {
          terminalEl.innerHTML = `
            <div class="text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">${pkg.expectedOutput}</div>
          `;
          if (typeof Animator !== "undefined") Animator.playSound("chime");
        } else {
          terminalEl.innerHTML = `
            <div class="text-rose-400 font-mono whitespace-pre-wrap leading-relaxed">
[COMPILE ERROR]
uts_ujian.cpp: error: simbol tidak dikenali atau salah sintaks pada titik-titik yang masih kosong!
Ditemukan ${total - correctCount} kesalahan pengisian sintaks.
Silakan periksa lembar evaluasi dan pembahasannya di bawah.
            </div>
          `;
          if (typeof Animator !== "undefined") Animator.playSound("bump");
        }
      }, 500);
    }

    // Render Grade Report
    const resultBox = document.getElementById("uts-result-box");
    if (!resultBox) return;

    let gradeLetter = "A";
    if (score < 60) gradeLetter = "E";
    else if (score < 70) gradeLetter = "C";
    else if (score < 85) gradeLetter = "B";

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      <div class="bg-gradient-to-br from-slate-900 to-indigo-950/60 border-2 ${isPassed ? 'border-emerald-500/60' : 'border-rose-500/60'} rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700 pb-4 gap-4">
          <div>
            <div class="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">HASIL EVALUASI LIVE CODING UTS</div>
            <h3 class="text-xl font-bold text-white mt-1">${pkg.title}</h3>
            <div class="text-xs text-slate-400 mt-0.5">Praktikan: <strong class="text-slate-200">${this.studentName}</strong> (NIM: ${this.studentNim})</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-center px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
              <div class="text-[10px] text-slate-400 uppercase font-mono">Skor Akhir</div>
              <div class="text-2xl font-extrabold ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${score} / 100</div>
            </div>
            <div class="text-center px-4 py-2 bg-slate-800 rounded-xl border border-slate-700">
              <div class="text-[10px] text-slate-400 uppercase font-mono">Nilai Mutu</div>
              <div class="text-2xl font-extrabold ${isPassed ? 'text-emerald-400' : 'text-rose-400'}">${gradeLetter}</div>
            </div>
          </div>
        </div>

        ${!isPassed ? `
          <div class="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl space-y-3">
            <h4 class="font-bold text-sm text-rose-300">Catatan Perbaikan Asdos:</h4>
            <div class="space-y-2 text-xs">
              ${feedbackList.map(f => `
                <div class="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <div class="font-bold text-slate-300">${f.label}: Jawaban Anda <code class="text-rose-400">"${f.userAns}"</code></div>
                  <div class="text-slate-400 mt-1">Kunci Jawaban yang Tepat: <strong class="text-emerald-400 font-mono">${f.correctAns}</strong></div>
                  <div class="text-slate-500 mt-0.5 italic">Penjelasan: ${f.explanation}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <div class="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
            🎉 <strong>Selamat!</strong> Semua titik-titik berhasil dilengkapi dengan tepat. Program C++ terkompilasi sempurna dan memenuhi semua spesifikasi Laprak 1 s.d. 3!
          </div>
        `}

        <div class="flex justify-end gap-3 pt-2">
          <button onclick="UTSEngine.loadPackage('${this.activePackageId}')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700">
            Coba Lagi Paket Ini
          </button>
          <button onclick="window.print()" class="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-lg shadow-md shadow-sky-500/20">
            🖨️ Cetak Lembar Hasil Nilai
          </button>
        </div>

      </div>
    `;

    resultBox.scrollIntoView({ behavior: 'smooth' });
  }
};
