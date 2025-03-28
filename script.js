function novaOR() {
    window.location.href = "nova_or.html"; // Sem barra extra
}

function verOrs() {
  alert("Aqui serão carregadas as ORs da base de dados.");
}

function verMarcacoes() {
  alert("Aqui serão carregadas as marcações.");
}
document.getElementById("novaOrForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    let matricula = document.getElementById("matricula").value.trim().toUpperCase();
    let km = document.getElementById("km").value.trim();
    let intervencao = document.getElementById("intervencao").value.trim();
    let revisao = document.getElementById("revisao").value;
    let cliente = document.getElementById("cliente").value.trim();
    let contato = document.getElementById("contato").value.trim();
    let dataEntrega = document.getElementById("dataEntrega").value;

    // Verificar campos obrigatórios
    if (!matricula || !km || !intervencao) {
        document.getElementById("mensagem").innerHTML = "⚠️ Preencha todos os campos obrigatórios!";
        return;
    }

    let dados = {
        matricula: matricula,
        km: km,
        intervencao: intervencao,
        revisao: revisao,
        cliente: cliente,
        contato: contato,
        dataEntrega: dataEntrega
    };

    fetch("https://script.google.com/macros/s/AKfycbxutjTuhROjazfSFYFifY6zDY17n_j233sY1DxDjVDrb3R5tDdZiI29ayhquJfj5H_Y/exec", {
  method: "POST",
  mode: "no-cors", // <- ESSENCIAL
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(dados)
})
.then(() => {
  document.getElementById("mensagem").innerHTML = "✅ OR Criada com Sucesso!";
  document.getElementById("novaOrForm").reset();
})
.catch(error => {
  console.error("Erro:", error);
  document.getElementById("mensagem").innerHTML = "❌ Erro ao conectar ao servidor!";
});

});
function voltarInicio() {
    window.location.href = "index.html"; // ou o nome correto da tua página principal
}
