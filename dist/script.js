// src/script.ts
(function() {
  var _a;
  const $ = (query) => document.querySelector(query);
  function calcTemp(mil) {
    const min = Math.floor(mil / 6e4);
    const sec = Math.floor(mil % 6e4) / 1e3;
    return `${min}m e ${sec}s`;
  }
  function patio() {
    function ler() {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    function salvar(veiculos) {
      localStorage.setItem("patio", JSON.stringify(veiculos));
    }
    function adicionar(veiculo, salvo) {
      var _a2, _b;
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">x</button>
                </td>
            `;
      (_a2 = row.querySelector(".delete")) == null ? void 0 : _a2.addEventListener("click", function() {
        remover(this.dataset.placa);
      });
      (_b = $("#patio")) == null ? void 0 : _b.appendChild(row);
      if (salvo) salvar([...ler(), veiculo]);
    }
    function remover(placa) {
      const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
      const tempo = calcTemp((/* @__PURE__ */ new Date()).getTime() - new Date(entrada).getTime());
      if (!confirm(`O Veiculo ${nome} permaneceu por ${tempo},Desja encerrar? `)) return;
      salvar(ler().filter((veiculo) => veiculo.placa !== placa));
      render();
    }
    function render() {
      $("#patio").innerHTML = "";
      const patio2 = ler();
      if (patio2.length) {
        patio2.forEach((veiculo) => adicionar(veiculo));
      }
    }
    return { ler, adicionar, remover, salvar, render };
  }
  patio().render();
  (_a = $("#Vcadastrar")) == null ? void 0 : _a.addEventListener("click", () => {
    var _a2, _b;
    const nome = (_a2 = $("#Vnome")) == null ? void 0 : _a2.value;
    const placa = (_b = $("#Vplaca")) == null ? void 0 : _b.value;
    if (!nome || !placa) {
      alert("Os campos Nome e Placa do veiculo s\xE3o obrigat\xF3rios!");
      return;
    }
    patio().adicionar({ nome, placa, entrada: (/* @__PURE__ */ new Date()).toISOString() }, true);
  });
})();
