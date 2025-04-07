function novaOR() {
    window.location.href = "nova_or.html";
}

function novaMarcacao() {
    window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
    window.location.href = "index.html";
}

// === NOVA OR ===
const formOr = document.getElementById("novaOrForm");
if (formOr) {
    formOr.addEventListener("submit", function (event) {
        event.preventDefault();

        const dados = {
            tipo: "OR", // importante para o script reconhecer
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

// === NOVA MARCAÇÃO ===
const formMarcacao = document.getElementById("novaMarcacaoForm");
if (formMarcacao) {
    formMarcacao.addEventListener("submit", function (event) {
        event.preventDefault();

        const dados = {
            tipo: "MARCACAO", // identifica o tipo no script
            matricula: document.getElementById("matricula").value.trim().toUpperCase(),
            cliente: document.getElementById("cliente").value.trim(),
            contato: document.getElementById("contato").value.trim(),
            servico: document.getElementById("servico").value.trim(),
            dataMarcacao: document.getElementById("dataMarcacao").value
        };

        if (!dados.matricula || !dados.servico || !dados.dataMarcacao) {
            document.getElementById("mensagem").innerHTML = "⚠️ Preencha os campos obrigatórios!";
            return;
        }

        fetch("https://script.google.com/macros/s/AKfycbxMoPqX4CCkhsOfyfjoT1jvTexRInePn5eLCup6Q9Ia9DIycWCvTBMFwoq0c2mE24BB/exec", {
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

// === LISTAR ORs ===
function verOrs() {
    fetch("https://script.google.com/macros/s/AKfycbxMoPqX4CCkhsOfyfjoT1jvTexRInePn5eLCup6Q9Ia9DIycWCvTBMFwoq0c2mE24BB/exec")
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaOrs tbody");
            tabela.innerHTML = "";

            data.forEach(or => {
                let linha = document.createElement("tr");

                linha.innerHTML = `
                    <td>${or.ID}</td>
                    <td>${or.Matrícula}</td>
                    <td>${or.Cliente || "-"}</td>
                    <td>${or.Intervenção}</td>
                    <td>${or.Estado || "Ativa"}</td>
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
    alert("As marcações são visíveis diretamente na página inicial.");
}
