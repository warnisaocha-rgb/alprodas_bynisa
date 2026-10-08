/**
 * ALPRO-LAB VIRTUAL C++ CODE PLAYGROUND & COMPILER SIMULATOR
 * Menjalankan dan mensimulasikan kode program C++ dari Laprak 1 - 3
 * Dilengkapi dengan terminal console interaktif dan trace eksekusi
 */

const Simulator = {
  activeCaseId: "case-1-1",

  init: function() {
    const selector = document.getElementById("sim-case-selector");
    const runBtn = document.getElementById("sim-run-btn");
    const resetBtn = document.getElementById("sim-reset-btn");
    if (!selector) return;

    // Populate cases in selector
    let optionsHtml = "";
    ALPRO_DATA.modules.forEach(mod => {
      optionsHtml += `<optgroup label="Modul ${mod.number}: ${mod.title}">`;
      mod.cases.forEach(c => {
        optionsHtml += `<option value="${c.id}">${c.title}</option>`;
      });
      optionsHtml += `</optgroup>`;
    });
    selector.innerHTML = optionsHtml;

    selector.addEventListener("change", (e) => {
      this.loadCase(e.target.value);
    });

    if (runBtn) {
      runBtn.addEventListener("click", () => {
        this.runCode();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.loadCase(this.activeCaseId);
      });
    }

    // Load initial case
    this.loadCase("case-1-1");
  },

  getCaseById: function(id) {
    for (const mod of ALPRO_DATA.modules) {
      const found = mod.cases.find(c => c.id === id);
      if (found) return found;
    }
    return null;
  },

  loadCase: function(caseId) {
    this.activeCaseId = caseId;
    const c = this.getCaseById(caseId);
    if (!c) return;

    const editor = document.getElementById("sim-code-editor");
    const titleEl = document.getElementById("sim-case-title");
    const descEl = document.getElementById("sim-case-desc");
    const consoleEl = document.getElementById("sim-terminal-output");

    if (titleEl) titleEl.textContent = c.title;
    if (descEl) descEl.textContent = c.description;
    if (editor) editor.value = c.code;

    if (consoleEl) {
      consoleEl.innerHTML = `<span class="text-slate-500">// Siap dikompilasi. Klik tombol "Jalankan Program (g++)" di atas...</span>`;
    }

    this.renderCustomParams(caseId);
  },

  renderCustomParams: function(caseId) {
    const paramsContainer = document.getElementById("sim-params-container");
    if (!paramsContainer) return;

    let html = "";
    if (caseId === "case-1-1") {
      html = `
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Jari-jari (r):</label>
            <input type="number" id="p_r" step="0.5" value="2.5" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Nilai PHI:</label>
            <input type="number" id="p_phi" step="0.01" value="3.14" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
        </div>
      `;
    } else if (caseId === "case-1-2") {
      html = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Nama Pasien:</label>
            <input type="text" id="p_nama" value="Ferdi sambo" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Umur (tahun):</label>
            <input type="number" id="p_umur" value="55" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Harga (Rp):</label>
            <input type="number" id="p_harga" value="2147483" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Diskon (Rp):</label>
            <input type="number" id="p_diskon" value="5000" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
        </div>
      `;
    } else if (caseId === "case-2-1") {
      html = `
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Nilai awal a:</label>
            <input type="number" id="p_a" value="10" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Nilai awal b:</label>
            <input type="number" id="p_b" value="5" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
        </div>
      `;
    } else if (caseId === "case-2-2") {
      html = `
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Nilai a (akan di << 3):</label>
            <input type="number" id="p_bit_a" value="1" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Nilai b (akan di >> 1):</label>
            <input type="number" id="p_bit_b" value="10" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
        </div>
      `;
    } else if (caseId === "case-3-1") {
      html = `
        <div class="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Nama Paket:</label>
            <input type="text" id="p_paket" value="Begadang" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Kouta Telpon (menit):</label>
            <input type="number" id="p_telpon" value="50" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Kouta Internet (GB):</label>
            <input type="number" id="p_kuota" value="25" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono">
          </div>
        </div>
      `;
    } else if (caseId === "case-3-2") {
      html = `
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">1. Isi Nilai Sikap Pertama:</label>
            <input type="number" id="p_sikap" step="0.5" value="70.5" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">2. Lalu Isi Nilai Pengetahuan:</label>
            <input type="number" id="p_tahu" step="0.5" value="85.5" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
          </div>
        </div>
      `;
    } else if (caseId === "case-3-3") {
      html = `
        <div class="text-xs">
          <label class="block text-slate-400 mb-1">Pilih Presiden dari Enum:</label>
          <select id="p_presiden" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono">
            <option value="0">Soekarno (Index 0)</option>
            <option value="1">Soeharto (Index 1)</option>
            <option value="2" selected>Habibie (Index 2 -> Presiden Ke-3)</option>
            <option value="3">Megawati (Index 3)</option>
            <option value="4">Gusdur (Index 4)</option>
            <option value="5">SBY (Index 5)</option>
            <option value="6">Jokowi (Index 6 -> Presiden Ke-7)</option>
          </select>
        </div>
      `;
    } else {
      html = `<div class="text-xs text-slate-400 italic">Gunakan tombol "Jalankan Program (g++)" di atas untuk mengeksekusi kode ini.</div>`;
    }

    paramsContainer.innerHTML = html;
  },

  runCode: function() {
    const consoleEl = document.getElementById("sim-terminal-output");
    if (!consoleEl) return;

    consoleEl.innerHTML = `
      <div class="text-sky-400 animate-pulse font-mono">
        &gt; g++ -O2 -Wall main.cpp -o main<br>
        &gt; ./main
      </div>
    `;

    setTimeout(() => {
      let output = "";
      const caseId = this.activeCaseId;

      if (caseId === "case-1-1") {
        const r = parseFloat(document.getElementById("p_r")?.value) || 2.5;
        const phi = parseFloat(document.getElementById("p_phi")?.value) || 3.14;
        const L = phi * r * r;
        output = `=================================
  PROGRAM HITUNG LUAS LINGKARAN  
=================================
Jari-jari (r)   : ${r} cm
Nilai PHI       : ${phi}
Luas lingkaran  : ${L} cm^2`;
      } else if (caseId === "case-1-2") {
        const nama = document.getElementById("p_nama")?.value || "Ferdi sambo";
        const umur = document.getElementById("p_umur")?.value || 55;
        const harga = parseInt(document.getElementById("p_harga")?.value) || 2147483;
        const diskon = parseInt(document.getElementById("p_diskon")?.value) || 5000;
        const total = harga - diskon;
        output = `===== STRUK TRANSAKSI OPTIK =====
Nama Pasien     : ${nama}
Umur Pasien     : ${umur} Tahun
Ukuran Kacamata : -2.5 Dioptri
Harga Kacamata  : Rp ${harga}
Diskon          : Rp ${diskon}
---------------------------------
Total Bayar     : Rp ${total}`;
      } else if (caseId === "case-1-3") {
        output = `Tanpa setprecision:
Tinggi Badan: 155.123
Berat Badan : 50.1235

Dengan setprecision:
Tinggi (8 digit): 155.12346
Berat (11 digit): 50.123456789`;
      } else if (caseId === "case-2-1") {
        let a = parseInt(document.getElementById("p_a")?.value) || 10;
        let b = parseInt(document.getElementById("p_b")?.value) || 5;
        a++;
        b--;
        const hasil = a * b;
        output = `Nilai a setelah a++ : ${a}
Nilai b setelah b-- : ${b}
Variabel hasil berisi nilai: ${hasil}`;
      } else if (caseId === "case-2-2") {
        let a = parseInt(document.getElementById("p_bit_a")?.value) || 1;
        let b = parseInt(document.getElementById("p_bit_b")?.value) || 10;
        a = (a << 3);
        b = (b >> 1);
        output = `Isi variabel a saat ini adalah ${a}
Isi variabel b saat ini adalah ${b}`;
      } else if (caseId === "case-2-3") {
        output = `Hasil perbandingan a < b : false
Hasil perbandingan a > b : true
Hasil (a > b) && (a != b): true`;
      } else if (caseId === "case-3-1") {
        const paket = document.getElementById("p_paket")?.value || "Begadang";
        const telpon = document.getElementById("p_telpon")?.value || 50;
        const kuota = document.getElementById("p_kuota")?.value || 25;
        output = `===== DETAIL PAKET INTERNET =====
Nama paket     : ${paket}
Kouta telpon   : ${telpon} Menit
Kouta internet : ${kuota} GB`;
      } else if (caseId === "case-3-2") {
        const tahu = parseFloat(document.getElementById("p_tahu")?.value) || 85.5;
        output = `Nilai Pengetahuan : ${tahu}
Nilai Sikap       : ${tahu}  <-- IKUT TERTIMPA!
Nilai Psikomotorik: ${tahu}  <-- IKUT MEMBACA MEMORI BERSAMA!
Ukuran Objek      : 4 bytes`;
      } else if (caseId === "case-3-3") {
        const pIdx = parseInt(document.getElementById("p_presiden")?.value) || 2;
        const names = ["Ir. Soekarno", "Soeharto", "B.J. Habibie", "Megawati Soekarnoputri", "Abdurrahman Wahid (Gus Dur)", "Susilo Bambang Yudhoyono (SBY)", "Joko Widodo"];
        output = `Presiden Indonesia Ke-${pIdx + 1} : ${names[pIdx] || 'Presiden RI'}`;
      } else if (caseId === "case-3-5") {
        output = `===== Si Merah =====
Panjang: 10, Lebar: 2.5, Tinggi: 2
Volume : 50 cm^3

===== Si Kuning =====
Panjang: 5.5, Lebar: 3, Tinggi: 0
Volume : 0 cm^3

===== Si Hijau =====
Panjang: 2, Lebar: 1.5, Tinggi: 1
Volume : 3 cm^3`;
      } else {
        const currentCase = this.getCaseById(caseId);
        output = currentCase ? currentCase.expectedOutput : "Program selesai dijalankan.";
      }

      consoleEl.innerHTML = `
        <div class="text-emerald-400 font-mono whitespace-pre-wrap">${output}</div>
        <div class="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-500">
          --------------------------------------------------<br>
          Process returned 0 (0x0)   execution time : 0.038 s<br>
          Press any key to continue . . .
        </div>
      `;
    }, 400);
  }
};
