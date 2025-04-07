function novaOR() {
    window.location.href = "nova_or.html";
}

function novaMarcacao() {
    window.location.href = "nova_marcacao.html";
}

function voltarInicio() {
    window.location.href = "index.html";
}

const form = document.getElementById("novaOrForm");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let dados = {
            matricula: document.getElementById("matricula").value.trim().toUpperCase(),
            km: document.getElementById("km") ? document.getElementById("km").value.trim() : "",
            intervencao: document.getElementById("intervencao").value.trim(),
            revisao: document.getElementById("revisao") ? document.getElementById("revisao").value : "Não",
            cliente: document.getElementById("cliente").value.trim(),
            contato: document.getElementById("contato").value.trim(),
            dataEntrega: document.getElementById("dataEntrega")?.value || document.getElementById("dataMarcacao")?.value || ""
        };

        if (!dados.matricula || !dados.intervencao || (document.getElementById("km") && !dados.km)) {
            document.getElementById("mensagem").innerHTML = "⚠️ Preencha todos os campos obrigatórios!";
            return;
        }

        fetch("https://script.google.com/macros/s/AKfycbz4BAzq21EHEMVUenDBolgMuCMb90xevkZE090rLjM2gO465bfR2LIRAoCi6QCPwXpl/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(() => {
            document.getElementById("mensagem").innerHTML = "✅ Enviado com sucesso!";
            form.reset();
        })
        .catch(error => {
            console.error("Erro:", error);
            document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
        });
    });
}

function verOrs() {
    // Quando implementarmos nova página, redireciona:
    window.location.href = "ver_ors.html";
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#tabelaOrs")) {
        fetch("https://script.google.com/macros/s/AKfycbz4BAzq21EHEMVUenDBolgMuCMb90xevkZE090rLjM2gO465bfR2LIRAoCi6QCPwXpl/exec")
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
