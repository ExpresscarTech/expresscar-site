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

        fetch("https://script.google.com/macros/s/AKfycbwH1T25sDhA_Jb6LecfmMeQZ4ssiPFgs1RKVyOrlshJ4NYKyk4kGNGa9esMx3WiK2al/exec", {
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

        fetch("https://script.google.com/macros/s/AKfycbwH1T25sDhA_Jb6LecfmMeQZ4ssiPFgs1RKVyOrlshJ4NYKyk4kGNGa9esMx3WiK2al/exec", {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })
        .then(() => {
            document.getElementById("mensagem").innerHTML = "✅ Marcação agendada com sucesso!";
            formMarcacao.reset();
        })
        .catch(error => {
            console.error("Erro:", error);
            document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
        });
    });
}

function verOrs() {
    fetch("https://script.google.com/macros/s/AKfycbwH1T25sDhA_Jb6LecfmMeQZ4ssiPFgs1RKVyOrlshJ4NYKyk4kGNGa9esMx3WiK2al/exec")
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector("#tabelaOrs tbody");
            if (!tabela) return;
            tabela.innerHTML = "";

            data.forEach(or => {
                if (!or.ID || or.ID.startsWith("M")) return;

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
