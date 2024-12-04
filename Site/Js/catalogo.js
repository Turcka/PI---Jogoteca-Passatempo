document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    if (isLoggedIn) {
      const formularioDiv = document.querySelector(".row.formulario .col-md-6");
  
      if (formularioDiv) {
        const novoBotao = document.createElement("button");
        novoBotao.textContent = "Ação Exclusiva";
        novoBotao.className = "btn btn-primary mt-3"; 
        novoBotao.onclick = () => {
          alert("Botão exclusivo para usuários logados!");
        };
  
        formularioDiv.appendChild(novoBotao);
      }
    }
  });

  document.getElementById('buscar').addEventListener('click', function () {

    const paisSelecionado = document.getElementById('Pais').value;

    if (paisSelecionado) {
        window.location.href = paisSelecionado;
    } else {
        alert('Por favor, selecione um país.');
    }
});
  