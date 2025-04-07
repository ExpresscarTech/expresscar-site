
function novaOR() {
    window.location.href = "nova_or.html";
}

function novaMarcacao() {
    window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#tabelaOrs")) verOrs();
    if (document.querySelector("#tabelaMarcacoes")) verMarcacoes();

    const orForm = document.getElementById("novaOrForm");
    if (orForm) {
        orForm.addEventListener("submit", function (event) {
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

            fetch("https://script.google.com/macros/s/AKfycbzLKEUFS4lk2RGbDpvuAfsEYHmst4YZLoDjbhqgQkU3ujfp6p34FCnIkjbzAcUW9rbq/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
            .then(() => {
                document.getElementById("mensagem").innerHTML = "✅ OR Criada com Sucesso!";
                orForm.reset();
            })
            .catch(error => {
                console.error("Erro:", error);
                document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
            });
        });
    }

    const marcForm = document.getElementById("novaMarcacaoForm");
    if (marcForm) {
        marcForm.addEventListener("submit", function (event) {
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

            fetch("https://script.google.com/macros/s/AKfycbzLKEUFS4lk2RGbDpvuAfsEYHmst4YZLoDjbhqgQkU3ujfp6p34FCnIkjbzAcUW9rbq/exec", {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
            .then(() => {
                document.getElementById("mensagem").innerHTML = "✅ Marcação Agendada com Sucesso!";
                marcForm.reset();
            })
            .catch(error => {
                console.error("Erro:", error);
                document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
            });
        });
    }
});

function verOrs() {
    fetch("https://script.google.com/macros/s/AKfycbzLKEUFS4lk2RGbDpvuAfsEYHmst4YZLoDjbhqgQkU3ujfp6p34FCnIkjbzAcUW9rbq/exec")
        .then(res => res.json())
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
    fetch("https://script.google.com/macros/s/AKfycbzLKEUFS4lk2RGbDpvuAfsEYHmst4YZLoDjbhqgQkU3ujfp6p34FCnIkjbzAcUW9rbq/exec")
        .then(res => res.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaMarcacoes tbody");
            tabela.innerHTML = "";
            data.filter(item => item.Serviço).forEach(marc => {
                let linha = document.createElement("tr");
                linha.innerHTML = `
                    <td>${marc.DataMarcação}</td>
                    <td>${marc.Matrícula}</td>
                    <td>${marc.Cliente || "-"}</td>
                    <td>${marc.Serviço}</td>
                    <td>${marc.Estado || "-"}</td>
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
