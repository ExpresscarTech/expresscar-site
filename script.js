function novaOR() {
  window.location.href = "nova_or.html";
}

function novaMarcacao() {
  window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
  window.location.href = "index.html";
}

const formOR = document.getElementById("novaOrForm");
if (formOR) {
  formOR.addEventListener("submit", function (event) {
    event.preventDefault();

    let dados = {
      matricula: document.getElementById("matricula").value.trim().toUpperCase(),
      km: document.getElementById("km").value.trim(),
      intervencao: document.getElementById("intervencao").value.trim(),
      revisao: document.getElementById("revisao").value,
      cliente: document.getElementById("cliente").value.trim(),
      contato: document.getElementById("contato").value.trim(),
      dataEntrega: document.getElementById("dataEntrega").value
    };

    if (!dados.matricula || !dados.km || !dados.intervencao) {
      document.getElementById("mensagem").innerHTML = "⚠️ Preencha todos os campos obrigatórios!";
      return;
    }

    fetch("https://script.google.com/macros/s/AKfycbyhGZZLt6c8pYOOvM_fKnfLds50_S-AGQC1Qu7IeZeEUJU27zUoKbjIIxEUuH7Itt1t/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    })
      .then(() => {
        document.getElementById("mensagem").innerHTML = "✅ OR Criada com Sucesso!";
        formOR.reset();
      })
      .catch(error => {
        console.error("Erro:", error);
        document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
      });
  });
}

const formMarcacao = document.getElementById("novaMarcacaoForm");
if (formMarcacao) {
  formMarcacao.addEventListener("submit", function (event) {
    event.preventDefault();

    let dados = {
      matricula: document.getElementById("matricula").value.trim().toUpperCase(),
      cliente: document.getElementById("cliente").value.trim(),
      contato: document.getElementById("contato").value.trim(),
      servico: document.getElementById("servico").value.trim(),
      dataMarcacao: document.getElementById("dataMarcacao").value
    };

    if (!dados.matricula || !dados.servico || !dados.dataMarcacao) {
      document.getElementById("mensagem").innerHTML = "⚠️ Preencha todos os campos obrigatórios!";
      return;
    }

    fetch("https://script.google.com/macros/s/AKfycbyhGZZLt6c8pYOOvM_fKnfLds50_S-AGQC1Qu7IeZeEUJU27zUoKbjIIxEUuH7Itt1t/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    })
      .then(() => {
        document.getElementById("mensagem").innerHTML = "✅ Marcação criada com sucesso!";
        formMarcacao.reset();
      })
      .catch(error => {
        console.error("Erro:", error);
        document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
      });
  });
}

function carregarORs() {
  fetch("https://script.google.com/macros/s/AKfycbyhGZZLt6c8pYOOvM_fKnfLds50_S-AGQC1Qu7IeZeEUJU27zUoKbjIIxEUuH7Itt1t/exec")
    .then(response => response.json())
    .then(data => {
      const tabela = document.querySelector("#tabelaOrs tbody");
      if (!tabela) return;

      tabela.innerHTML = "";

      data.forEach(or => {
        if (or.Estado && ["CHEGADA", "EM REPARAÇAO", "ESPERA PEÇAS", "AGUARDA ORDEM CLIENTE", "ORÇAMENTO"].includes(or.Estado)) {
          let linha = document.createElement("tr");
          linha.innerHTML = `
            <td>${or.ID}</td>
            <td>${or.Matrícula}</td>
            <td>${or.Cliente || "-"}</td>
            <td>${or.Intervenção}</td>
            <td>${or.Estado}</td>
            <td><button>🛠️</button></td>
          `;
          tabela.appendChild(linha);
        }
      });
    })
    .catch(err => console.error("Erro ao carregar ORs:", err));
}

function carregarMarcacoes() {
  fetch("https://script.google.com/macros/s/AKfycbyhGZZLt6c8pYOOvM_fKnfLds50_S-AGQC1Qu7IeZeEUJU27zUoKbjIIxEUuH7Itt1t/exec")
    .then(response => response.json())
    .then(data => {
      const tabela = document.querySelector("#tabelaMarcacoes tbody");
      if (!tabela) return;

      tabela.innerHTML = "";

      const hoje = new Date();
      data.forEach(m => {
        if (m.DataMarcação) {
          const dataMarc = new Date(m.DataMarcação);
          const diff = (dataMarc - hoje) / (1000 * 60 * 60 * 24);

          if (m.Estado === "AGENDADA" || (m.Estado === "A CHEGAR" || diff <= 0)) {
            let linha = document.createElement("tr");
            linha.innerHTML = `
              <td>${m.DataMarcação}</td>
              <td>${m.Matrícula}</td>
              <td>${m.Cliente}</td>
              <td>${m.Serviço}</td>
              <td>${m.Estado}</td>
              <td><button>📆</button></td>
            `;
            tabela.appendChild(linha);
          }
        }
      });
    })
    .catch(err => console.error("Erro ao carregar marcações:", err));
}

window.onload = () => {
  carregarORs();
  carregarMarcacoes();
};
