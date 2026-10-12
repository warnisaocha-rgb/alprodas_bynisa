/**
 * ALPRO-LAB INTERACTIVE VISUALIZERS
 * Modul 1: RAM Box & Type Overflow Inspector
 * Modul 2: Pre vs Post Increment, Truth Circuit, 8-Bit Bitwise Shifter
 * Modul 3: Struct vs Union RAM Allocation & Overwrite Simulator
 */

const Visualizers = {
  // ==========================================
  // MODUL 1: RAM TYPE & OVERFLOW INSPECTOR
  // ==========================================
  initModul1RAM: function() {
    const typeSelect = document.getElementById("ram-type-select");
    const valInput = document.getElementById("ram-val-input");
    if (!typeSelect || !valInput) return;

    const render = () => {
      const type = typeSelect.value;
      const rawVal = valInput.value.trim();
      const val = parseFloat(rawVal) || 0;
      const container = document.getElementById("ram-cells-container");
      const infoBox = document.getElementById("ram-info-box");
      const overflowNotice = document.getElementById("ram-overflow-notice");

      const specs = {
        char: { bytes: 1, min: -128, max: 127, signed: true, desc: "1 Byte = 8 bit. Range -128 s.d. 127" },
        unsigned_char: { bytes: 1, min: 0, max: 255, signed: false, desc: "1 Byte = 8 bit. Range 0 s.d. 255" },
        short_int: { bytes: 2, min: -32768, max: 32767, signed: true, desc: "2 Byte = 16 bit. Range -32.768 s.d. 32.767" },
        int: { bytes: 4, min: -2147483648, max: 2147483647, signed: true, desc: "4 Byte = 32 bit. Range ±2,1 Miliar" },
        unsigned_int: { bytes: 4, min: 0, max: 4294967295, signed: false, desc: "4 Byte = 32 bit. Range 0 s.d. 4,29 Miliar" },
        float: { bytes: 4, min: -3.4e38, max: 3.4e38, signed: true, desc: "4 Byte (Single Precision, 6-7 digit desimal)" },
        double: { bytes: 8, min: -1.7e308, max: 1.7e308, signed: true, desc: "8 Byte (Double Precision, 15-17 digit desimal)" },
        bool: { bytes: 1, min: 0, max: 1, signed: false, desc: "1 Byte. Hanya 0 (false) atau 1 (true)" }
      };

      const spec = specs[type] || specs.int;
      let isOverflow = false;
      let statusMsg = "";

      if (type === "bool") {
        if (val !== 0 && val !== 1) {
          statusMsg = "Nilai bukan 0/1, di C++ nilai selain 0 dievaluasi sebagai true (1)";
        }
      } else if (rawVal !== "") {
        if (val < spec.min || val > spec.max) {
          isOverflow = true;
          statusMsg = `⚠️ OVERFLOW TERDETEKSI! Nilai ${rawVal} berada di luar jangkauan [${spec.min.toLocaleString()} s.d. ${spec.max.toLocaleString()}]. Nilai akan berputar (wrap-around) atau memicu undefined behavior!`;
        }
      }

      // Render cells
      let cellsHtml = "";
      const baseAddress = 0x7FFE00;
      for (let i = 0; i < spec.bytes; i++) {
        const addr = "0x" + (baseAddress + i).toString(16).toUpperCase();
        cellsHtml += `
          <div class="flex-1 min-w-[70px] bg-slate-800 border-2 ${isOverflow ? 'border-rose-500 bg-rose-950/40 animate-pulse' : 'border-sky-500 bg-sky-950/30'} rounded-xl p-3 text-center shadow-lg transition-all duration-300">
            <div class="text-[11px] font-mono text-slate-400 mb-1">${addr}</div>
            <div class="text-sm font-bold ${isOverflow ? 'text-rose-400' : 'text-sky-300'}">Byte ${i + 1}</div>
            <div class="text-[11px] text-slate-400 mt-1 font-mono">8 Bit</div>
          </div>
        `;
      }
      container.innerHTML = cellsHtml;

      infoBox.innerHTML = `
        <div class="flex items-center justify-between text-sm flex-wrap gap-2">
          <span><strong class="text-sky-400 font-mono">${type}</strong>: ${spec.desc}</span>
          <span class="px-2.5 py-1 bg-slate-800 rounded-md font-mono text-xs text-amber-300 border border-slate-700">Total Alokasi: ${spec.bytes} Byte (${spec.bytes * 8} bit)</span>
        </div>
      `;

      if (isOverflow) {
        overflowNotice.classList.remove("hidden");
        overflowNotice.innerHTML = statusMsg;
      } else {
        overflowNotice.classList.add("hidden");
      }
    };

    typeSelect.addEventListener("change", render);
    valInput.addEventListener("input", render);
    render();
  },

  // ==========================================
  // MODUL 2: PRE-INCREMENT VS POST-INCREMENT
  // ==========================================
  incState: { a: 5, b: 0, step: 0, mode: "post" },

  initModul2Increment: function() {
    const modeSelect = document.getElementById("inc-mode-select");
    const stepBtn = document.getElementById("inc-step-btn");
    const resetBtn = document.getElementById("inc-reset-btn");
    if (!modeSelect || !stepBtn || !resetBtn) return;

    const updateDisplay = () => {
      const mode = modeSelect.value;
      const elA = document.getElementById("inc-val-a");
      const elB = document.getElementById("inc-val-b");
      const desc = document.getElementById("inc-step-desc");
      const codeSnippet = document.getElementById("inc-code-display");

      elA.textContent = this.incState.a;
      elB.textContent = this.incState.b;

      if (mode === "post") {
        codeSnippet.innerHTML = `int a = 5;<br>int b = a++; <span class="text-slate-400">// Post-increment</span>`;
        if (this.incState.step === 0) {
          desc.innerHTML = `<span class="text-slate-400">Kondisi Awal:</span> a = 5, b belum terdefinisi. Klik <strong>"Langkah Berikutnya"</strong>.`;
        } else if (this.incState.step === 1) {
          desc.innerHTML = `<span class="text-amber-400 font-semibold">Langkah 1:</span> Nilai a saat ini (5) disalin ke variabel b terlebih dahulu. Sekarang b = 5!`;
          elB.classList.add("ring-4", "ring-amber-400");
          setTimeout(() => elB.classList.remove("ring-4", "ring-amber-400"), 600);
        } else if (this.incState.step === 2) {
          desc.innerHTML = `<span class="text-emerald-400 font-semibold">Langkah 2:</span> Setelah nilai dievaluasi, variabel a baru dinaikkan 1 (a++). Nilai a sekarang = 6! Selesai.`;
          elA.classList.add("ring-4", "ring-emerald-400");
          setTimeout(() => elA.classList.remove("ring-4", "ring-emerald-400"), 600);
        }
      } else {
        codeSnippet.innerHTML = `int a = 5;<br>int b = ++a; <span class="text-slate-400">// Pre-increment</span>`;
        if (this.incState.step === 0) {
          desc.innerHTML = `<span class="text-slate-400">Kondisi Awal:</span> a = 5, b belum terdefinisi. Klik <strong>"Langkah Berikutnya"</strong>.`;
        } else if (this.incState.step === 1) {
          desc.innerHTML = `<span class="text-amber-400 font-semibold">Langkah 1:</span> Variabel a dinaikkan 1 DULU (++a). Nilai a sekarang menjadi 6!`;
          elA.classList.add("ring-4", "ring-amber-400");
          setTimeout(() => elA.classList.remove("ring-4", "ring-amber-400"), 600);
        } else if (this.incState.step === 2) {
          desc.innerHTML = `<span class="text-emerald-400 font-semibold">Langkah 2:</span> Nilai baru dari a (6) barulah disalin ke b. Sekarang b = 6! Selesai.`;
          elB.classList.add("ring-4", "ring-emerald-400");
          setTimeout(() => elB.classList.remove("ring-4", "ring-emerald-400"), 600);
        }
      }
    };

    modeSelect.addEventListener("change", () => {
      this.incState = { a: 5, b: 0, step: 0, mode: modeSelect.value };
      updateDisplay();
    });

    stepBtn.addEventListener("click", () => {
      const mode = modeSelect.value;
      if (this.incState.step === 0) {
        if (mode === "post") {
          this.incState.b = this.incState.a; // salin dulu
          this.incState.step = 1;
        } else {
          this.incState.a += 1; // tambah dulu
          this.incState.step = 1;
        }
      } else if (this.incState.step === 1) {
        if (mode === "post") {
          this.incState.a += 1; // baru tambah
          this.incState.step = 2;
        } else {
          this.incState.b = this.incState.a; // baru salin
          this.incState.step = 2;
        }
      } else {
        // restart
        this.incState = { a: 5, b: 0, step: 0, mode: modeSelect.value };
      }
      updateDisplay();
    });

    resetBtn.addEventListener("click", () => {
      this.incState = { a: 5, b: 0, step: 0, mode: modeSelect.value };
      updateDisplay();
    });

    updateDisplay();
  },

  // ==========================================
  // MODUL 2: 8-BIT BITWISE SHIFTER (LAPRAK 2.2)
  // ==========================================
  bitwiseVal: 1, // Default matching Laprak 2.2: a = 1, b = 10

  initModul2Bitwise: function() {
    const inputVal = document.getElementById("bitwise-number-input");
    const btnShiftLeft1 = document.getElementById("btn-shift-left-1");
    const btnShiftLeft3 = document.getElementById("btn-shift-left-3");
    const btnShiftRight1 = document.getElementById("btn-shift-right-1");
    const btnReset1 = document.getElementById("btn-bitwise-reset-1");
    const btnReset10 = document.getElementById("btn-bitwise-reset-10");
    if (!inputVal) return;

    const render = () => {
      let num = parseInt(this.bitwiseVal) || 0;
      num = num & 0xFF; // batasi 8-bit
      this.bitwiseVal = num;
      inputVal.value = num;

      const binStr = num.toString(2).padStart(8, '0');
      const bitsContainer = document.getElementById("bitwise-bits-row");
      const hexEl = document.getElementById("bitwise-hex");
      const decEl = document.getElementById("bitwise-dec");
      const calcNote = document.getElementById("bitwise-calc-note");

      let html = "";
      for (let i = 0; i < 8; i++) {
        const bit = binStr[i];
        const isOne = bit === '1';
        const bitPower = 7 - i;
        html += `
          <div class="flex flex-col items-center">
            <span class="text-[10px] text-slate-500 font-mono mb-1">2<sup>${bitPower}</sup></span>
            <div class="w-10 h-12 flex items-center justify-center font-mono text-xl font-bold rounded-lg border-2 transition-all duration-300 ${isOne ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 border-slate-700 text-slate-500'}">
              ${bit}
            </div>
          </div>
        `;
      }
      bitsContainer.innerHTML = html;
      hexEl.textContent = "0x" + num.toString(16).toUpperCase().padStart(2, '0');
      decEl.textContent = num;

      calcNote.innerHTML = `Representasi Biner: <code class="text-emerald-400">${binStr}</code> = ${num}`;
    };

    inputVal.addEventListener("change", () => {
      this.bitwiseVal = parseInt(inputVal.value) || 0;
      render();
    });

    if (btnShiftLeft1) {
      btnShiftLeft1.addEventListener("click", () => {
        this.bitwiseVal = (this.bitwiseVal << 1) & 0xFF;
        render();
      });
    }

    if (btnShiftLeft3) {
      btnShiftLeft3.addEventListener("click", () => {
        // Laprak 2.2: a = 1; a <<= 3 -> 8
        this.bitwiseVal = (this.bitwiseVal << 3) & 0xFF;
        render();
        const note = document.getElementById("bitwise-calc-note");
        note.innerHTML = `<span class="text-emerald-300 font-semibold">✨ Kasus Praktikum 2.2:</span> Operasi <code>a &lt;&lt;= 3</code> menggeser 3 bit ke kiri, setara dengan 1 × 2³ = <strong>8</strong>!`;
      });
    }

    if (btnShiftRight1) {
      btnShiftRight1.addEventListener("click", () => {
        // Laprak 2.2: b = 10; b >>= 1 -> 5
        this.bitwiseVal = (this.bitwiseVal >> 1) & 0xFF;
        render();
        const note = document.getElementById("bitwise-calc-note");
        note.innerHTML = `<span class="text-emerald-300 font-semibold">✨ Kasus Praktikum 2.2:</span> Operasi <code>b &gt;&gt;= 1</code> menggeser 1 bit ke kanan, setara dengan dibagi 2 = <strong>${this.bitwiseVal}</strong>!`;
      });
    }

    if (btnReset1) {
      btnReset1.addEventListener("click", () => {
        this.bitwiseVal = 1;
        render();
      });
    }

    if (btnReset10) {
      btnReset10.addEventListener("click", () => {
        this.bitwiseVal = 10;
        render();
      });
    }

    render();
  },

  // ==========================================
  // MODUL 2: LOGIC GATES & TRUTH TABLE
  // ==========================================
  initModul2Logic: function() {
    const swA = document.getElementById("logic-sw-a");
    const swB = document.getElementById("logic-sw-b");
    const opSelect = document.getElementById("logic-op-select");
    const resultBox = document.getElementById("logic-result-box");
    const explainBox = document.getElementById("logic-explain-box");
    if (!swA || !swB || !opSelect || !resultBox) return;

    const render = () => {
      const a = swA.checked;
      const b = swB.checked;
      const op = opSelect.value;
      let res = false;
      let explanation = "";

      if (op === "AND") {
        res = a && b;
        explanation = `<strong>AND (&&)</strong>: Menghasilkan TRUE hanya jika kedua saklar bernilai TRUE. Saat ini A=${a ? 'TRUE' : 'FALSE'} dan B=${b ? 'TRUE' : 'FALSE'} &rarr; Hasil: <strong>${res ? 'TRUE (1)' : 'FALSE (0)'}</strong>.`;
      } else if (op === "OR") {
        res = a || b;
        explanation = `<strong>OR (||)</strong>: Menghasilkan TRUE jika minimal salah satu saklar bernilai TRUE. Saat ini A=${a ? 'TRUE' : 'FALSE'} atau B=${b ? 'TRUE' : 'FALSE'} &rarr; Hasil: <strong>${res ? 'TRUE (1)' : 'FALSE (0)'}</strong>.`;
      } else if (op === "NOT") {
        res = !a;
        explanation = `<strong>NOT (!)</strong>: Membalikkan nilai saklar A. Saat ini A=${a ? 'TRUE' : 'FALSE'} &rarr; Hasil pembalikan: <strong>${res ? 'TRUE (1)' : 'FALSE (0)'}</strong>. (Saklar B diabaikan untuk operasi NOT).`;
      }

      resultBox.innerHTML = `
        <div class="text-xs uppercase font-mono tracking-wider ${res ? 'text-emerald-400' : 'text-slate-400'}">Hasil Output Logika</div>
        <div class="text-3xl font-extrabold font-mono mt-1 ${res ? 'text-emerald-400' : 'text-slate-500'}">
          ${res ? 'TRUE (1)' : 'FALSE (0)'}
        </div>
      `;

      explainBox.innerHTML = explanation;
    };

    swA.addEventListener("change", render);
    swB.addEventListener("change", render);
    opSelect.addEventListener("change", render);
    render();
  },

  // ==========================================
  // MODUL 3: STRUCT VS UNION MEMORY VISUALIZER
  // ==========================================
  initModul3StructUnion: function() {
    const modeStructBtn = document.getElementById("btn-mode-struct");
    const modeUnionBtn = document.getElementById("btn-mode-union");
    const inputVal1 = document.getElementById("su-input-1");
    const inputVal2 = document.getElementById("su-input-2");
    const inputVal3 = document.getElementById("su-input-3");
    if (!modeStructBtn || !modeUnionBtn) return;

    let isUnion = false;

    const render = () => {
      const v1 = parseFloat(inputVal1.value) || 0;
      const v2 = parseFloat(inputVal2.value) || 0;
      const v3 = parseFloat(inputVal3.value) || 0;

      const memDiagram = document.getElementById("su-memory-diagram");
      const summaryText = document.getElementById("su-summary-text");
      const titleBadge = document.getElementById("su-active-mode-title");

      if (!isUnion) {
        // Mode STRUCT
        titleBadge.textContent = "MODE STRUCT (Alokasi Memori Terpisah)";
        titleBadge.className = "px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full text-xs font-semibold";
        modeStructBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-purple-600 text-white shadow-lg shadow-purple-600/30";
        modeUnionBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";

        memDiagram.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
            <div class="bg-slate-800/90 border-2 border-purple-500/60 rounded-xl p-3 shadow-md">
              <div class="flex justify-between items-center text-xs font-mono text-purple-400 mb-1">
                <span>Alamat: 0x7FFE10</span>
                <span class="bg-purple-950 px-2 py-0.5 rounded text-[10px]">4 Byte</span>
              </div>
              <div class="text-sm font-semibold text-slate-200">member1: nilaiPengetahuan</div>
              <div class="text-xl font-bold font-mono text-purple-300 mt-2 bg-slate-900/80 p-2 rounded-lg text-center">
                ${v1}
              </div>
            </div>

            <div class="bg-slate-800/90 border-2 border-purple-500/60 rounded-xl p-3 shadow-md">
              <div class="flex justify-between items-center text-xs font-mono text-purple-400 mb-1">
                <span>Alamat: 0x7FFE14</span>
                <span class="bg-purple-950 px-2 py-0.5 rounded text-[10px]">4 Byte</span>
              </div>
              <div class="text-sm font-semibold text-slate-200">member2: nilaiSikap</div>
              <div class="text-xl font-bold font-mono text-purple-300 mt-2 bg-slate-900/80 p-2 rounded-lg text-center">
                ${v2}
              </div>
            </div>

            <div class="bg-slate-800/90 border-2 border-purple-500/60 rounded-xl p-3 shadow-md">
              <div class="flex justify-between items-center text-xs font-mono text-purple-400 mb-1">
                <span>Alamat: 0x7FFE18</span>
                <span class="bg-purple-950 px-2 py-0.5 rounded text-[10px]">4 Byte</span>
              </div>
              <div class="text-sm font-semibold text-slate-200">member3: nilaiPsikomotorik</div>
              <div class="text-xl font-bold font-mono text-purple-300 mt-2 bg-slate-900/80 p-2 rounded-lg text-center">
                ${v3}
              </div>
            </div>
          </div>
        `;

        summaryText.innerHTML = `
          <div class="p-4 bg-purple-950/30 border border-purple-500/30 rounded-xl text-sm">
            <div class="font-semibold text-purple-300 flex items-center gap-2">
              <span>🧠 Analisis Memori Struct:</span>
              <span class="bg-purple-800/50 px-2 py-0.5 rounded text-xs">Total sizeof: 12 Bytes</span>
            </div>
            <p class="text-slate-300 mt-1">
              Setiap variabel memiliki <strong>kapling memori sendiri</strong> (0x7FFE10, 0x7FFE14, 0x7FFE18). Mengubah nilai sikap <code>${v2}</code> tidak mengganggu nilai pengetahuan <code>${v1}</code>. Ketiganya aman dan valid bersamaan!
            </p>
          </div>
        `;
      } else {
        // Mode UNION (Laprak 3.2!)
        titleBadge.textContent = "MODE UNION (Memori Bersama / Shared Memory!)";
        titleBadge.className = "px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold animate-pulse";
        modeUnionBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-amber-600 text-white shadow-lg shadow-amber-600/30";
        modeStructBtn.className = "px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";

        // In union, the active/last modified value is shared by all
        const lastVal = v3 || v2 || v1;

        memDiagram.innerHTML = `
          <div class="w-full bg-slate-800/90 border-2 border-amber-500 rounded-xl p-4 shadow-xl">
            <div class="flex justify-between items-center text-xs font-mono text-amber-400 mb-2">
              <span class="font-bold">SATU ALAMAT BERSAMA: 0x7FFE10</span>
              <span class="bg-amber-950 text-amber-300 px-3 py-1 rounded text-xs font-semibold">Total sizeof: HANYA 4 Byte!</span>
            </div>
            
            <div class="grid grid-cols-3 gap-2 mb-3 text-center text-xs text-slate-400">
              <div class="p-2 bg-slate-900 rounded border border-slate-700">
                <div class="font-semibold text-slate-300">nilaiPengetahuan</div>
                <div class="font-mono text-amber-300 text-base font-bold mt-1">${lastVal}</div>
              </div>
              <div class="p-2 bg-slate-900 rounded border border-slate-700">
                <div class="font-semibold text-slate-300">nilaiSikap</div>
                <div class="font-mono text-amber-300 text-base font-bold mt-1">${lastVal}</div>
              </div>
              <div class="p-2 bg-slate-900 rounded border border-slate-700">
                <div class="font-semibold text-slate-300">nilaiPsikomotorik</div>
                <div class="font-mono text-amber-300 text-base font-bold mt-1">${lastVal}</div>
              </div>
            </div>

            <div class="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-xs text-amber-200 flex items-center gap-2">
              <span class="text-lg">⚠️</span>
              <span><strong>PERINGATAN OVERWRITE:</strong> Ketiga variabel membaca dan menulis ke kotak 4-byte yang sama persis! Nilai terakhir yang dimasukkan akan <strong>menimpa</strong> nilai sebelumnya.</span>
            </div>
          </div>
        `;

        summaryText.innerHTML = `
          <div class="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl text-sm">
            <div class="font-semibold text-amber-300 flex items-center gap-2">
              <span>💡 Kunci Pemahaman Laprak 3.2:</span>
              <span class="bg-amber-800/50 px-2 py-0.5 rounded text-xs">Fenomena Menimpa Nilai</span>
            </div>
            <p class="text-slate-300 mt-1">
              Di laprak Warnisyah Armin, saat <code>budi.nilaiPengetahuan = 85.5</code> diisi setelah <code>budi.nilaiSikap = 70.5</code>, nilai sikap ikut terbaca <strong>85.5</strong> karena keduanya berbagi alamat RAM yang sama! Ukuran objek budi pun tetap <strong>4 bytes</strong>.
            </p>
          </div>
        `;
      }
    };

    modeStructBtn.addEventListener("click", () => {
      isUnion = false;
      render();
    });

    modeUnionBtn.addEventListener("click", () => {
      isUnion = true;
      render();
    });

    [inputVal1, inputVal2, inputVal3].forEach(input => {
      if (input) input.addEventListener("input", render);
    });

    render();
  },

  // ==========================================
  // MODUL 3: UNION DENGAN TIPE DATA BERBEDA
  // ==========================================
  initModul3DifferentTypesUnion: function() {
    const btnChar = document.getElementById("btn-union-char");
    const btnInt = document.getElementById("btn-union-int");
    const btnFloat = document.getElementById("btn-union-float");
    const displayBox = document.getElementById("union-diff-display");
    if (!displayBox) return;

    let activeType = "char"; // "char", "int", "float"

    const render = () => {
      let charVal = "-";
      let intVal = "-";
      let floatVal = "-";
      let statusExplain = "";

      if (activeType === "char") {
        charVal = "'A' (ASCII: 65)";
        intVal = "65 (Membaca byte 1 dari 'A')";
        floatVal = "9.1e-44 (Bit terinterpretasi sebagai float)";
        statusExplain = "✅ Anda memasukkan <strong>huruf 'A'</strong>. Member <code>huruf</code> bernilai valid 'A'. Member <code>angkaBulat</code> membaca kode biner ASCII huruf A yaitu 65.";
      } else if (activeType === "int") {
        charVal = "'d' (ASCII 100 tertimpa!)";
        intVal = "100 (VALID)";
        floatVal = "1.4e-43 (Bit pecahan teracak)";
        statusExplain = "⚠️ Anda memasukkan <strong>angkaBulat = 100</strong>. Huruf 'A' tadi tertimpa! Karena 100 adalah kode ASCII huruf 'd', maka <code>huruf</code> otomatis terbaca menjadi <strong>'d'</strong>!";
      } else {
        charVal = "Karakter kontrol/acak";
        intVal = "1078530011 (Bit IEEE-754)";
        floatVal = "3.14 (VALID)";
        statusExplain = "⚠️ Anda memasukkan <strong>angkaKoma = 3.14f</strong>. Representasi biner pecahan IEEE 754 menimpa kotak memori. Jika <code>angkaBulat</code> dibaca sekarang, ia menghasilkan angka raksasa <strong>1078530011</strong>!";
      }

      // Update active button styles
      if (btnChar && btnInt && btnFloat) {
        btnChar.className = activeType === "char" ? "px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow-md" : "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
        btnInt.className = activeType === "int" ? "px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow-md" : "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
        btnFloat.className = activeType === "float" ? "px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow-md" : "px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700";
      }

      displayBox.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div class="p-3 bg-slate-900 border ${activeType === 'char' ? 'border-amber-400 bg-amber-500/10' : 'border-slate-800'} rounded-xl text-center">
            <span class="text-[11px] font-mono text-slate-400 block">Member char huruf (1 B)</span>
            <div class="text-base font-bold font-mono text-amber-300 mt-1">${charVal}</div>
          </div>
          <div class="p-3 bg-slate-900 border ${activeType === 'int' ? 'border-amber-400 bg-amber-500/10' : 'border-slate-800'} rounded-xl text-center">
            <span class="text-[11px] font-mono text-slate-400 block">Member int angkaBulat (4 B)</span>
            <div class="text-base font-bold font-mono text-amber-300 mt-1">${intVal}</div>
          </div>
          <div class="p-3 bg-slate-900 border ${activeType === 'float' ? 'border-amber-400 bg-amber-500/10' : 'border-slate-800'} rounded-xl text-center">
            <span class="text-[11px] font-mono text-slate-400 block">Member float angkaKoma (4 B)</span>
            <div class="text-base font-bold font-mono text-amber-300 mt-1">${floatVal}</div>
          </div>
        </div>
        <div class="p-3 bg-slate-850 border border-slate-700 rounded-xl text-xs text-slate-200 leading-relaxed">
          ${statusExplain}
        </div>
      `;
    };

    if (btnChar) btnChar.addEventListener("click", () => { activeType = "char"; render(); });
    if (btnInt) btnInt.addEventListener("click", () => { activeType = "int"; render(); });
    if (btnFloat) btnFloat.addEventListener("click", () => { activeType = "float"; render(); });

    render();
  },

  // ==========================================
  // MODUL 4: STRING METHODS LABORATORY
  // ==========================================
  initModul4StringLab: function() {
    const mainInput = document.getElementById("str-lab-input");
    const atIndexInput = document.getElementById("str-lab-at-idx");
    const findWordInput = document.getElementById("str-lab-find-kw");
    const replStartInput = document.getElementById("str-lab-repl-start");
    const replLenInput = document.getElementById("str-lab-repl-len");
    const replWordInput = document.getElementById("str-lab-repl-word");

    if (!mainInput) return;

    const render = () => {
      const text = mainInput.value;
      const atIdx = parseInt(atIndexInput ? atIndexInput.value : 0) || 0;
      const findKw = findWordInput ? findWordInput.value : "";
      const replStart = parseInt(replStartInput ? replStartInput.value : 0) || 0;
      const replLen = parseInt(replLenInput ? replLenInput.value : 0) || 0;
      const replWord = replWordInput ? replWordInput.value : "";

      // 1. Length
      const lenEl = document.getElementById("str-res-length");
      if (lenEl) lenEl.textContent = text.length;

      // 2. Character at
      const atEl = document.getElementById("str-res-at");
      if (atEl) {
        if (atIdx >= 0 && atIdx < text.length) {
          atEl.textContent = `'${text.charAt(atIdx)}' (indeks ${atIdx})`;
          atEl.className = "text-sm font-bold font-mono text-emerald-400";
        } else {
          atEl.textContent = "Out of Range!";
          atEl.className = "text-xs font-bold font-mono text-rose-400";
        }
      }

      // 3. Find
      const findEl = document.getElementById("str-res-find");
      if (findEl) {
        if (findKw.trim() === "") {
          findEl.textContent = "Masukkan kata kunci";
          findEl.className = "text-xs font-mono text-slate-400";
        } else {
          const pos = text.indexOf(findKw);
          if (pos !== -1) {
            findEl.textContent = `Ditemukan di indeks ${pos}`;
            findEl.className = "text-sm font-bold font-mono text-emerald-400";
          } else {
            findEl.textContent = "string::npos (Tidak Ada)";
            findEl.className = "text-xs font-bold font-mono text-amber-400";
          }
        }
      }

      // 4. Empty
      const emptyEl = document.getElementById("str-res-empty");
      if (emptyEl) {
        emptyEl.textContent = text.length === 0 ? "true (Kosong)" : "false (Ada isi)";
        emptyEl.className = text.length === 0 ? "text-sm font-bold font-mono text-amber-400" : "text-sm font-bold font-mono text-emerald-400";
      }

      // 5. Substr preview
      const subEl = document.getElementById("str-res-substr");
      if (subEl) {
        const sub = text.substring(0, Math.min(10, text.length));
        subEl.textContent = `"${sub}"`;
      }

      // 6. Replace preview
      const replEl = document.getElementById("str-res-replace");
      if (replEl) {
        if (replStart >= 0 && replStart <= text.length) {
          const before = text.substring(0, replStart);
          const after = text.substring(replStart + replLen);
          replEl.textContent = `"${before}${replWord}${after}"`;
        } else {
          replEl.textContent = `"${text}"`;
        }
      }
    };

    [mainInput, atIndexInput, findWordInput, replStartInput, replLenInput, replWordInput].forEach(inp => {
      if (inp) inp.addEventListener("input", render);
    });

    render();
  },

  // ==========================================
  // MODUL 5: SELEKSI KONDISI & KASIR DISKON
  // ==========================================
  initModul5DecisionLab: function() {
    // 1. Simulator Jalur Usia (if - else if)
    const ageInput = document.getElementById("dec-age-input");
    const ageOutputBox = document.getElementById("dec-age-result-box");
    const ageBranches = {
      bayi: document.getElementById("dec-branch-bayi"),
      anak: document.getElementById("dec-branch-anak"),
      remaja: document.getElementById("dec-branch-remaja"),
      dewasa: document.getElementById("dec-branch-dewasa"),
      lansia: document.getElementById("dec-branch-lansia")
    };

    const renderAgeBranch = () => {
      if (!ageInput) return;
      const age = parseInt(ageInput.value);
      if (isNaN(age) || age < 0) return;

      let matched = "";
      let categoryText = "";
      let whyText = "";

      if (age <= 1) {
        matched = "bayi";
        categoryText = "Usia bayi (0-1 tahun)";
        whyText = "Kondisi pertama <code>if (usia <= 1)</code> langsung bernilai <strong>TRUE</strong>! Program langsung mengeksekusi blok ini dan mengabaikan seluruh else-if di bawahnya.";
      } else if (age <= 10) {
        matched = "anak";
        categoryText = "Usia anak-anak (2-10 tahun)";
        whyText = "Kondisi pertama (<= 1) bernilai FALSE, lalu diuji kondisi kedua <code>else if (usia <= 10)</code> dan menghasilkan <strong>TRUE</strong>!";
      } else if (age <= 19) {
        matched = "remaja";
        categoryText = "Usia remaja (11-19 tahun)";
        whyText = "Kondisi bayi dan anak FALSE, masuk ke cabang ketiga <code>else if (usia <= 19)</code> bernilai <strong>TRUE</strong>!";
      } else if (age <= 60) {
        matched = "dewasa";
        categoryText = "Usia dewasa (20-60 tahun)";
        whyText = "Melewati pemeriksaan <= 1, <= 10, <= 19 (semuanya false), lalu cocok di cabang <code>else if (usia <= 60)</code> bernilai <strong>TRUE</strong>!";
      } else {
        matched = "lansia";
        categoryText = "Usia tua / Lansia (Lebih dari 60 tahun)";
        whyText = "Semua kondisi di atas bernilai FALSE. Program otomatis lari ke pelabuhan terakhir yaitu blok <code>else</code>!";
      }

      // Highlight active card
      Object.keys(ageBranches).forEach(k => {
        const el = ageBranches[k];
        if (!el) return;
        if (k === matched) {
          el.className = "p-3.5 rounded-xl border-2 border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/10 transition-all";
          const badge = el.querySelector(".branch-badge");
          if (badge) badge.className = "branch-badge px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 animate-pulse";
        } else {
          el.className = "p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 opacity-60 transition-all";
          const badge = el.querySelector(".branch-badge");
          if (badge) badge.className = "branch-badge px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-400";
        }
      });

      if (ageOutputBox) {
        ageOutputBox.innerHTML = `
          <div class="text-xs font-mono text-emerald-300 font-bold mb-1">
            Output Layar: "${categoryText}"
          </div>
          <div class="text-xs text-slate-300 leading-relaxed">
            ${whyText}
          </div>
        `;
      }
    };

    if (ageInput) {
      ageInput.addEventListener("input", renderAgeBranch);
      renderAgeBranch();
    }

    // 2. Simulator Kasir Diskon Pakaian (Praktikum 5.5)
    const qtyBajuInp = document.getElementById("dec-baju-qty");
    const qtyCelanaInp = document.getElementById("dec-celana-qty");
    const kasirStrukBox = document.getElementById("dec-kasir-struk");

    const renderKasir = () => {
      if (!qtyBajuInp || !qtyCelanaInp || !kasirStrukBox) return;

      const qtyBaju = Math.max(0, parseInt(qtyBajuInp.value) || 0);
      const qtyCelana = Math.max(0, parseInt(qtyCelanaInp.value) || 0);

      const hargaBaju = 60000;
      const hargaCelana = 40000;

      const totalBaju = qtyBaju * hargaBaju;
      const totalCelana = qtyCelana * hargaCelana;

      const dapetDiskonBaju = totalBaju > 100000;
      const diskonBaju = dapetDiskonBaju ? 0.2 * totalBaju : 0;

      const dapetDiskonCelana = totalCelana > 70000;
      const diskonCelana = dapetDiskonCelana ? 0.25 * totalCelana : 0;

      const totalBayar = (totalBaju - diskonBaju) + (totalCelana - diskonCelana);

      const fmt = (num) => num.toLocaleString("id-ID");

      kasirStrukBox.innerHTML = `
        <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
          <div class="text-center font-bold text-amber-300 pb-2 border-b border-slate-800">
            === RINCIAN PEMBAYARAN KASIR ===
          </div>

          <div class="space-y-1.5 text-slate-300">
            <div class="flex justify-between">
              <span>Beli Baju (${qtyBaju} pcs x Rp ${fmt(hargaBaju)})</span>
              <span class="text-white">Rp ${fmt(totalBaju)}</span>
            </div>
            <div class="flex justify-between items-center text-[11px] ${dapetDiskonBaju ? 'text-emerald-400 font-bold' : 'text-slate-500'}">
              <span>&gt; Syarat if (totalBaju &gt; 100000): ${dapetDiskonBaju ? 'TRUE (Diskon 20%)' : 'FALSE (Tanpa Diskon)'}</span>
              <span>- Rp ${fmt(diskonBaju)}</span>
            </div>

            <div class="flex justify-between pt-1 border-t border-slate-900">
              <span>Beli Celana (${qtyCelana} pcs x Rp ${fmt(hargaCelana)})</span>
              <span class="text-white">Rp ${fmt(totalCelana)}</span>
            </div>
            <div class="flex justify-between items-center text-[11px] ${dapetDiskonCelana ? 'text-emerald-400 font-bold' : 'text-slate-500'}">
              <span>&gt; Syarat if (totalCelana &gt; 70000): ${dapetDiskonCelana ? 'TRUE (Diskon 25%)' : 'FALSE (Tanpa Diskon)'}</span>
              <span>- Rp ${fmt(diskonCelana)}</span>
            </div>
          </div>

          <div class="pt-3 border-t-2 border-dashed border-slate-700 flex justify-between items-center text-sm font-bold">
            <span class="text-amber-400">Total Yang Harus Dibayar:</span>
            <span class="text-emerald-400 text-base">Rp ${fmt(totalBayar)}</span>
          </div>
        </div>
      `;

    };

    if (qtyBajuInp && qtyCelanaInp) {
      qtyBajuInp.addEventListener("input", renderKasir);
      qtyCelanaInp.addEventListener("input", renderKasir);
      renderKasir();
    }
  }
};
