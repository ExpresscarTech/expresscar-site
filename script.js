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
const formMarcacao = document.getElementById("novaMarcacaoForm");

if (formOR) {
    formOR.addEventListener("submit", function (event) {
        event.preventDefault();

        let dados = {
            tipo: "OR",
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

        fetch("https://script.google.com/macros/s/AKfycbxMoPqX4CCkhsOfyfjoT1jvTexRInePn5eLCup6Q9Ia9DIycWCvTBMFwoq0c2mE24BB/exec", {
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

if (formMarcacao) {
    formMarcacao.addEventListener("submit", function (event) {
        event.preventDefault();

        let dados = {
            tipo: "MARCACAO",
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

        fetch("https://script.google.com/macros/s/AKfycbxMoPqX4CCkhsOfyfjoT1jvTexRInePn5eLCup6Q9Ia9DIycWCvTBMFwoq0c2mE24BB/exec", {
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

function verOrs() {
    window.location.href = "ver_ors.html";
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#tabelaOrs")) {
        fetch("https://script.google.com/macros/s/AKfycbxMoPqX4CCkhsOfyfjoT1jvTexRInePn5eLCup6Q9Ia9DIycWCvTBMFwoq0c2mE24BB/exec")
            .then(response => response.json())
            .then(data => {
                const tabela = document.querySelector("#tabelaOrs tbody");
                tabela.innerHTML = "";

                data.forEach(or => {
                    const linha = document.createElement("tr");
                    linha.innerHTML = `
                        <td>${or.ID}</td>
                        <td>${or.Matrícula}</td>
                        <td>${or.Cliente || "-"}</td>
                        <td>${or.Intervenção}</td>
                        <td>${or.Estado || "CHEGADA"}</td>
                        <td><button title="Abrir">🛠️</button></td>
                    `;
                    tabela.appendChild(linha);
                });
            })
            .catch(err => {
                console.error("Erro ao buscar ORs:", err);
                alert("Erro ao carregar ORs.");
            });
    }
});
