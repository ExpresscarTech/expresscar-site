
function novaOR() {
    window.location.href = "nova_or.html";
}

function novaMarcacao() {
    window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
    window.location.href = "index.html";
}

// URL base da nova implementação
const API_URL = "https://script.google.com/macros/s/AKfycbzLKEUFS4lk2RGbDpvuAfsEYHmst4YZLoDjbhqgQkU3ujfp6p34FCnIkjbzAcUW9rbq/exec";

const formOr = document.getElementById("novaOrForm");
if (formOr) {
    formOr.addEventListener("submit", function (event) {
        event.preventDefault();

        let dados = {
            tipo: "orc",
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
            tipo: "marc",
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
    fetch(API_URL + "?tipo=orc")
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaOrs tbody");
            if (!tabela) return;
            tabela.innerHTML = "";

            data.forEach(or => {
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
    fetch(API_URL + "?tipo=marc")
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaMarcacoes tbody");
            if (!tabela) return;
            tabela.innerHTML = "";

            data.forEach(marc => {
                let linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${marc.DataMarcação}</td>
                    <td>${marc.Matrícula}</td>
                    <td>${marc.Cliente || "-"}</td>
                    <td>${marc.Serviço}</td>
                    <td>${marc.Estado || "AGENDADA"}</td>
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

// Executar carregamento automático
if (document.readyState !== "loading") {
    verOrs();
    verMarcacoes();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        verOrs();
        verMarcacoes();
    });
}
