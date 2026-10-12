/**
 * ALPRO-LAB CORE APPLICATION CONTROLLER
 * Menghubungkan modul materi, visualizer, simulator, dan kuis
 */

document.addEventListener("DOMContentLoaded", function() {
  App.init();
});

const App = {
  currentTab: "tab-home",

  init: function() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.renderModuleOverview();
    this.renderModule1Content();
    this.renderModule2Content();
    this.renderModule3Content();
    this.renderModule4Content();
    this.renderModule5Content();
    this.renderFlowchartContent();

    // Inisialisasi sub-sistem interaktif
    if (typeof Visualizers !== "undefined") {
      Visualizers.initModul1RAM();
      Visualizers.initModul2Increment();
      Visualizers.initModul2Bitwise();
      Visualizers.initModul2Logic();
      Visualizers.initModul3StructUnion();
      Visualizers.initModul3DifferentTypesUnion();
      Visualizers.initModul4StringLab();
      Visualizers.initModul5DecisionLab();
    }

    if (typeof Simulator !== "undefined") {
      Simulator.init();
    }


    if (typeof Animator !== "undefined") {
      Animator.init();
    }

    if (typeof UTSEngine !== "undefined") {
      UTSEngine.init();
    }
  },

  setupNavigation: function() {
    const navButtons = document.querySelectorAll("[data-target-tab]");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-target-tab");
        this.switchTab(targetTab);
      });
    });
  },

  switchTab: function(tabId) {
    this.currentTab = tabId;

    // Sembunyikan semua tab section
    document.querySelectorAll(".tab-content-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    // Tampilkan tab yang dipilih
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Update active nav styling
    document.querySelectorAll("[data-target-tab]").forEach(btn => {
      const isTarget = btn.getAttribute("data-target-tab") === tabId;
      if (isTarget) {
        btn.classList.add("bg-sky-500/10", "text-sky-400", "border-sky-500/30");
        btn.classList.remove("text-slate-400", "border-transparent");
      } else {
        btn.classList.remove("bg-sky-500/10", "text-sky-400", "border-sky-500/30");
        btn.classList.add("text-slate-400", "border-transparent");
      }
    });

    // Redraw animation frame if entering cinema tab
    if (tabId === "tab-cinema" && typeof Animator !== "undefined") {
      setTimeout(() => Animator.drawCurrentFrame(), 50);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setupThemeToggle: function() {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const html = document.documentElement;
      const isPink = html.classList.contains("theme-pink-sorbet");
      if (isPink) {
        html.classList.remove("theme-pink-sorbet");
        toggleBtn.innerHTML = `🌸 <span class="hidden md:inline text-xs font-bold">Pink & Sorbet</span>`;
        toggleBtn.title = "Ganti ke Tema Imut Pink & Sorbet (@cattobiens)";
      } else {
        html.classList.add("theme-pink-sorbet");
        toggleBtn.innerHTML = `🌙 <span class="hidden md:inline text-xs font-bold">Cyber Dark</span>`;
        toggleBtn.title = "Ganti ke Tema Cyber Dark";
      }

      if (typeof Animator !== "undefined") {
        Animator.drawCurrentFrame();
      }
    });
  },

  renderModuleOverview: function() {
    const container = document.getElementById("home-modules-grid");
    if (!container) return;

    let html = "";
    ALPRO_DATA.modules.forEach(mod => {
      html += `
        <div class="bg-slate-800/80 border border-slate-700 hover:border-sky-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Praktikum ${mod.number}
              </span>
              <span class="text-xs text-slate-500 font-mono">${mod.badge}</span>
            </div>
            <h3 class="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
              ${mod.title}
            </h3>
            <p class="text-slate-400 text-xs mt-2 leading-relaxed">
              ${mod.summary}
            </p>
            <div class="mt-4 pt-4 border-t border-slate-700/60">
              <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Capaian Utama:</div>
              <ul class="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                ${mod.objectives.slice(0, 3).map(o => `<li class="truncate">${o}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="mt-6">
            <button onclick="App.switchTab('tab-${mod.id}')" class="w-full py-2.5 px-4 bg-slate-700/60 hover:bg-sky-500 hover:text-slate-900 text-slate-200 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
              <span>Buka Modul ${mod.number}</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderModule1Content: function() {
    const tableContainer = document.getElementById("mod1-types-table-body");
    const anatomyContainer = document.getElementById("mod1-anatomy-container");
    if (!tableContainer) return;

    // Render Data Types Table
    let tableHtml = "";
    ALPRO_DATA.modules[0].theory.dataTypesTable.forEach(row => {
      tableHtml += `
        <tr class="border-b border-slate-700/60 hover:bg-slate-800/40 transition-colors">
          <td class="p-3 font-mono font-bold text-sky-400 text-xs">${row.type}</td>
          <td class="p-3 text-xs text-amber-300 font-mono">${row.size}</td>
          <td class="p-3 text-xs text-slate-300 font-mono">${row.range}</td>
          <td class="p-3 text-xs text-slate-400">${row.desc}</td>
          <td class="p-3 text-xs font-mono text-emerald-400 bg-slate-900/40 rounded">${row.example}</td>
        </tr>
      `;
    });
    tableContainer.innerHTML = tableHtml;

    // Render Code Anatomy
    if (anatomyContainer) {
      let anatomyHtml = "";
      ALPRO_DATA.modules[0].theory.codeAnatomy.forEach((item, idx) => {
        anatomyHtml += `
          <div class="p-3.5 bg-slate-800/60 border border-slate-700/70 rounded-xl hover:border-sky-500/40 transition-all">
            <div class="flex items-center gap-2 text-xs font-mono text-sky-300 mb-1">
              <span class="w-5 h-5 rounded bg-sky-500/20 flex items-center justify-center text-[10px] text-sky-400 font-bold">${idx + 1}</span>
              <code>${item.line}</code>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed pl-7">${item.explanation}</p>
          </div>
        `;
      });
      anatomyContainer.innerHTML = anatomyHtml;
    }
  },

  renderModule2Content: function() {
    const catContainer = document.getElementById("mod2-categories-container");
    if (!catContainer) return;

    let html = "";
    ALPRO_DATA.modules[1].theory.categories.forEach(cat => {
      html += `
        <div class="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 shadow-sm">
          <h4 class="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <span>${cat.category}</span>
          </h4>
          <div class="space-y-2">
            ${cat.items.map(item => `
              <div class="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono font-bold rounded text-xs">${item.op}</span>
                  <span class="text-slate-300">${item.desc}</span>
                </div>
                <div class="font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded text-[11px] self-start md:self-auto">
                  ${item.contoh}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    catContainer.innerHTML = html;
  },

  renderModule3Content: function() {
    const compTableBody = document.getElementById("mod3-comp-table-body");
    if (!compTableBody) return;

    let html = "";
    ALPRO_DATA.modules[2].theory.comparisonTable.forEach(row => {
      html += `
        <tr class="border-b border-slate-700/60 hover:bg-slate-800/40 transition-colors">
          <td class="p-3 text-xs font-semibold text-slate-200">${row.feature}</td>
          <td class="p-3 text-xs text-purple-300 bg-purple-950/10 font-mono">${row.structVal}</td>
          <td class="p-3 text-xs text-amber-300 bg-amber-950/10 font-mono">${row.unionVal}</td>
        </tr>
      `;
    });
    compTableBody.innerHTML = html;
  },

  renderModule4Content: function() {
    const compTableBody = document.getElementById("mod4-comp-table-body");
    const methodsContainer = document.getElementById("mod4-methods-container");
    const mod4 = ALPRO_DATA.modules[3];
    if (!mod4) return;

    if (compTableBody && mod4.theory.comparisonTable) {
      let html = "";
      mod4.theory.comparisonTable.forEach(row => {
        html += `
          <tr class="border-b border-slate-700/60 hover:bg-slate-800/40 transition-colors">
            <td class="p-3 text-xs font-semibold text-slate-200">${row.feature}</td>
            <td class="p-3 text-xs text-rose-300 bg-rose-950/10 font-mono">${row.cStyle}</td>
            <td class="p-3 text-xs text-emerald-300 bg-emerald-950/10 font-mono">${row.cppStyle}</td>
          </tr>
        `;
      });
      compTableBody.innerHTML = html;
    }

    if (methodsContainer && mod4.theory.stringMethodsCatalog) {
      let mHtml = "";
      mod4.theory.stringMethodsCatalog.forEach(m => {
        mHtml += `
          <div class="bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-4 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg font-mono font-bold text-xs">
                ${m.method}
              </span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed mb-3">
              ${m.desc}
            </p>
            <div class="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 flex items-center justify-between">
              <code>${m.example}</code>
            </div>
          </div>
        `;
      });
      methodsContainer.innerHTML = mHtml;
    }
  },

  renderModule5Content: function() {
    const compTableBody = document.getElementById("mod5-comp-table-body");
    const mod5 = ALPRO_DATA.modules[4];
    if (!mod5) return;

    if (compTableBody && mod5.theory.branchesComparison) {
      let html = "";
      mod5.theory.branchesComparison.forEach(row => {
        html += `
          <tr class="border-b border-slate-700/60 hover:bg-slate-800/40 transition-colors">
            <td class="p-3 text-xs font-semibold text-slate-200">${row.aspect}</td>
            <td class="p-3 text-xs text-sky-300 bg-sky-950/10 font-mono">${row.ifElse}</td>
            <td class="p-3 text-xs text-amber-300 bg-amber-950/10 font-mono">${row.switchCase}</td>
          </tr>
        `;
      });
      compTableBody.innerHTML = html;
    }
  },

  renderFlowchartContent: function() {
    const symbolContainer = document.getElementById("flowchart-symbols-container");
    const caseSelector = document.getElementById("flowchart-case-select");
    const viewerContainer = document.getElementById("flowchart-diagram-viewer");
    const codeInspectBox = document.getElementById("flowchart-code-inspect-box");
    if (!symbolContainer) return;

    const guide = ALPRO_DATA.flowchartGuide;

    // 1. Render Catalog of Symbols
    let symbolsHtml = "";
    guide.symbols.forEach(sym => {
      let shapePreview = "";
      if (sym.symbolType === "oval") {
        shapePreview = `<div class="w-24 h-10 rounded-full border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center font-bold text-[11px] text-amber-300 shadow-md">Mulai / Selesai</div>`;
      } else if (sym.symbolType === "prep") {
        shapePreview = `
          <div class="w-28 h-10 rounded-md border-2 border-rose-500 bg-rose-500/20 relative flex items-center justify-center font-bold text-[10px] text-rose-300 shadow-md">
            <span class="absolute left-2 top-0 bottom-0 w-0.5 bg-rose-400"></span>
            <span class="absolute right-2 top-0 bottom-0 w-0.5 bg-rose-400"></span>
            Deklarasi
          </div>`;
      } else if (sym.symbolType === "process") {
        shapePreview = `<div class="w-24 h-10 rounded-md border-2 border-sky-500 bg-sky-500/20 flex items-center justify-center font-bold text-[11px] text-sky-300 shadow-md">Proses / Hitung</div>`;
      } else if (sym.symbolType === "io") {
        shapePreview = `
          <div class="w-28 h-10 border-2 border-emerald-500 bg-emerald-500/20 transform -skew-x-12 flex items-center justify-center shadow-md">
            <span class="transform skew-x-12 font-bold text-[11px] text-emerald-300">cout &lt;&lt; / cin &gt;&gt;</span>
          </div>`;
      } else if (sym.symbolType === "diamond") {
        shapePreview = `
          <div class="w-10 h-10 border-2 border-purple-500 bg-purple-500/20 transform rotate-45 flex items-center justify-center shadow-md my-1">
            <span class="transform -rotate-45 font-bold text-[9px] text-purple-300">if?</span>
          </div>`;
      }

      symbolsHtml += `
        <div class="bg-slate-800/80 border border-slate-700 hover:border-sky-500/50 rounded-2xl p-5 shadow-sm transition-all">
          <div class="flex items-center justify-between mb-3 border-b border-slate-700 pb-2.5">
            <h4 class="font-bold text-sm text-white">${sym.name}</h4>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-700 text-slate-300">${sym.shape}</span>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-4 mb-3">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center shrink-0 min-w-[120px]">
              ${shapePreview}
            </div>
            <div class="text-xs text-slate-300 leading-relaxed">
              <strong class="text-sky-400">Fungsi:</strong> ${sym.role}
            </div>
          </div>
          <div class="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
            <div class="text-[11px] font-semibold text-amber-400 mb-0.5">📌 Aturan di Laprak UNM:</div>
            <p class="text-slate-400 text-[11px]">${sym.rules}</p>
          </div>
        </div>
      `;
    });
    symbolContainer.innerHTML = symbolsHtml;

    // 2. Render Case Selector & Interactive Flowchart
    if (caseSelector) {
      let casesOptions = "";
      guide.interactiveCases.forEach(c => {
        casesOptions += `<option value="${c.id}">${c.title}</option>`;
      });
      caseSelector.innerHTML = casesOptions;

      const renderDiagram = (caseId) => {
        const c = guide.interactiveCases.find(x => x.id === caseId) || guide.interactiveCases[0];
        let nodesHtml = "";

        c.nodes.forEach((node, idx) => {
          let nodeBox = "";
          if (node.type === "oval") {
            nodeBox = `
              <div class="w-48 py-2.5 px-4 rounded-full border-2 border-amber-400 bg-amber-500/20 text-center font-bold text-sm text-amber-300 shadow-lg cursor-pointer hover:scale-105 transition-all" onclick="App.inspectFlowNode('${node.label.replace(/"/g, '&quot;')}', '${node.sub}', '${encodeURIComponent(node.cpp)}')">
                ${node.label}
              </div>`;
          } else if (node.type === "prep") {
            nodeBox = `
              <div class="w-64 py-3 px-6 rounded-lg border-2 border-rose-500 bg-rose-500/20 relative text-center shadow-lg cursor-pointer hover:scale-105 transition-all" onclick="App.inspectFlowNode('${node.label.replace(/"/g, '&quot;')}', '${node.sub}', '${encodeURIComponent(node.cpp)}')">
                <span class="absolute left-2.5 top-0 bottom-0 w-1 bg-rose-400 rounded-full"></span>
                <span class="absolute right-2.5 top-0 bottom-0 w-1 bg-rose-400 rounded-full"></span>
                <div class="font-mono text-xs font-bold text-rose-200 whitespace-pre-line leading-relaxed">${node.label}</div>
              </div>`;
          } else if (node.type === "process") {
            nodeBox = `
              <div class="w-60 py-3 px-4 rounded-lg border-2 border-sky-500 bg-sky-500/20 text-center shadow-lg cursor-pointer hover:scale-105 transition-all" onclick="App.inspectFlowNode('${node.label.replace(/"/g, '&quot;')}', '${node.sub}', '${encodeURIComponent(node.cpp)}')">
                <div class="font-mono text-xs font-bold text-sky-200 whitespace-pre-line leading-relaxed">${node.label}</div>
              </div>`;
          } else if (node.type === "io") {
            nodeBox = `
              <div class="w-64 py-3 px-4 border-2 border-emerald-500 bg-emerald-500/20 transform -skew-x-12 text-center shadow-lg cursor-pointer hover:scale-105 transition-all" onclick="App.inspectFlowNode('${node.label.replace(/"/g, '&quot;')}', '${node.sub}', '${encodeURIComponent(node.cpp)}')">
                <div class="transform skew-x-12 font-mono text-xs font-bold text-emerald-200 whitespace-pre-line leading-relaxed">${node.label}</div>
              </div>`;
          }

          nodesHtml += `
            <div class="flex flex-col items-center">
              ${nodeBox}
              <div class="text-[10px] text-slate-400 mt-1 font-mono">${node.sub}</div>
              ${idx < c.nodes.length - 1 ? `
                <div class="flex flex-col items-center my-1 text-slate-500">
                  <div class="w-0.5 h-5 bg-slate-700"></div>
                  <div class="text-xs">▼</div>
                </div>
              ` : ''}
            </div>
          `;
        });

        viewerContainer.innerHTML = nodesHtml;
        codeInspectBox.innerHTML = `
          <div class="text-xs text-slate-400 italic">
            Klik salah satu kotak simbol flowchart di atas untuk melihat baris kode C++ padanannya.
          </div>
        `;
      };

      caseSelector.addEventListener("change", (e) => renderDiagram(e.target.value));
      renderDiagram(guide.interactiveCases[0].id);
    }
  },

  inspectFlowNode: function(label, sub, encodedCpp) {
    const codeInspectBox = document.getElementById("flowchart-code-inspect-box");
    if (!codeInspectBox) return;

    const cpp = decodeURIComponent(encodedCpp);
    codeInspectBox.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-center justify-between border-b border-slate-700 pb-2">
          <span class="font-bold text-xs text-sky-400">${sub}</span>
          <span class="text-[10px] text-slate-400 font-mono">Padanan Kode C++</span>
        </div>
        <pre class="bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap">${cpp}</pre>
        <div class="text-[11px] text-slate-400">
          Simbol flowchart ini merepresentasikan baris eksekusi tersebut di dalam struktur program C++.
        </div>
      </div>
    `;
  }
};
