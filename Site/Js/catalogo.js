document.addEventListener("DOMContentLoaded", () => {
    // Verificar o estado de login no localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    if (isLoggedIn) {
      // Selecionar a seção onde o botão será inserido
      const formularioDiv = document.querySelector(".row.formulario .col-md-6");
  
      if (formularioDiv) {
        // Criar o botão dinamicamente
        const novoBotao = document.createElement("button");
        novoBotao.textContent = "Ação Exclusiva";
        novoBotao.className = "btn btn-primary mt-3"; // Classes Bootstrap para estilizar o botão
        novoBotao.onclick = () => {
          alert("Botão exclusivo para usuários logados!");
        };
  
        // Inserir o botão na página
        formularioDiv.appendChild(novoBotao);
      }
    }
  });
  