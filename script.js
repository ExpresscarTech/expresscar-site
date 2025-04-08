
function novaOR() {
    window.location.href = "nova_or.html";
}

function novaMarcacao() {
    window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
    window.location.href = "index.html";
}

const formOr = document.getElementById("novaOrForm");
if (formOr) {
    formOr.addEventListener("submit", function (event) {
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

        fetch("https://script.google.com/macros/s/AKfycbzRLnG1qTvYBdG_LJVtrCKohaRf9c068FoNJ55zOTx0MixGcWuY5o1JySV8I01-z6M/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
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

        fetch("https://script.google.com/macros/s/AKfycbzRLnG1qTvYBdG_LJVtrCKohaRf9c068FoNJ55zOTx0MixGcWuY5o1JySV8I01-z6M/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(res => res.json())
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
    fetch("https://script.google.com/macros/s/AKfycbzRLnG1qTvYBdG_LJVtrCKohaRf9c068FoNJ55zOTx0MixGcWuY5o1JySV8I01-z6M/exec?tipo=OR")
        .then(res => res.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaOrs tbody");
            if (!tabela) return;
            tabela.innerHTML = "";
            data.forEach(or => {
                const linha = `<tr>
                    <td>${or.ID}</td>
                    <td>${or.Matrícula}</td>
                    <td>${or.Cliente || "-"}</td>
                    <td>${or.Intervenção}</td>
                    <td>${or.Estado}</td>
                    <td><button>🛠️</button></td>
                </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar ORs:", error);
            alert("Erro ao carregar ORs.");
        });
}

function verMarcacoes() {
    fetch("https://script.google.com/macros/s/AKfycbzRLnG1qTvYBdG_LJVtrCKohaRf9c068FoNJ55zOTx0MixGcWuY5o1JySV8I01-z6M/exec?tipo=MARCACAO")
        .then(res => res.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaMarcacoes tbody");
            if (!tabela) return;
            tabela.innerHTML = "";
            data.forEach(m => {
                const linha = `<tr>
                    <td>${m.DataMarcação}</td>
                    <td>${m.Matrícula}</td>
                    <td>${m.Cliente}</td>
                    <td>${m.Serviço}</td>
                    <td>${m.Estado}</td>
                    <td><button>📆</button></td>
                </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(error => {
            console.error("Erro ao buscar marcações:", error);
            alert("Erro ao carregar marcações.");
        });
}

// Auto-load
verOrs();
verMarcacoes();
