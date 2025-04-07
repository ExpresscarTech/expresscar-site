
function novaOR() {
    window.location.href = "nova_or.html";
}

function novaMarcacao() {
    window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
    window.location.href = "index.html";
}

// API URL atualizada
const API_URL = "https://script.google.com/macros/s/AKfycbyhGZZLt6c8pYOOvM_fKnfLds50_S-AGQC1Qu7IeZeEUJU27zUoKbjIIxEUuH7Itt1t/exec";

const formOr = document.getElementById("novaOrForm");
if (formOr) {
    formOr.addEventListener("submit", function (event) {
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
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(() => {
            document.getElementById("mensagem").innerHTML = "✅ OR Criada com Sucesso!";
            formOr.reset();
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
        fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(() => {
            document.getElementById("mensagem").innerHTML = "✅ Marcação Agendada com Sucesso!";
            formMarcacao.reset();
        })
        .catch(error => {
            console.error("Erro:", error);
            document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
        });
    });
}

function verOrs() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaOrs tbody");
            if (tabela) tabela.innerHTML = "";
            data.filter(or => or.Kilometragem).forEach(or => {
                let linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${or.ID}</td>
                    <td>${or.Matrícula}</td>
                    <td>${or.Cliente || "-"}</td>
                    <td>${or.Intervenção}</td>
                    <td>${or.Estado || "CHEGADA"}</td>
                    <td><button>🛠️</button></td>
                `;
                tabela.appendChild(linha);
            });
        })
        .catch(err => {
            console.error("Erro ao buscar ORs:", err);
            alert("Erro ao carregar ORs.");
        });
}

function verMarcacoes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaMarcacoes tbody");
            if (tabela) tabela.innerHTML = "";
            data.filter(m => m.Serviço).forEach(m => {
                let linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${m.DataMarcação}</td>
                    <td>${m.Matrícula}</td>
                    <td>${m.Cliente || "-"}</td>
                    <td>${m.Serviço}</td>
                    <td>${m.Estado || "AGENDADA"}</td>
                    <td><button>📅</button></td>
                `;
                tabela.appendChild(linha);
            });
        })
        .catch(err => {
            console.error("Erro ao buscar marcações:", err);
            alert("Erro ao carregar marcações.");
        });
}

window.addEventListener("DOMContentLoaded", () => {
    verOrs();
    verMarcacoes();
});
