const protocolo = "http://";
const baseURL = "localhost:3000";

function exibeAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor);
    alert.innerHTML = innerHTML;
    alert.classList.add(...classesToAdd);
    alert.classList.remove(...classesToRemove);
    setTimeout(() => {
        alert.classList.remove(...classesToAdd);
        alert.classList.add(...classesToRemove);
    }, timeout);
}

async function enviarContato() {
    const contatosEndpoint = "/contatos";
    const URLcompleta = `${protocolo}${baseURL}${contatosEndpoint}`
    let nomeInput = document.querySelector("#nome")
    let emailInput = document.querySelector("#email")
    let mensagemInput = document.querySelector("#mensagem")
    let nome = nomeInput.value
    let email = emailInput.value
    let mensagem = mensagemInput.value
    if (nome && email && mensagem) {
        await axios.post(URLcompleta, { nome, email, mensagem }).data
        exibeAlerta(".alert-contato", "Mensagem enviada", ['show', 'alert-danger'], ['d-none'], 2000)
        nomeInput = ""
        emailInput = ""
        mensagemInput = ""
    }
    else {
        exibeAlerta(".alert-contato", "Preencha todos os campos", ['show', 'alert-danger'], ['d-none'], 2000)
    }
}

const fazerLogin = async () => {
    const loginEndpoint = "/login"
    const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
      try {
        const response = await axios.post(URLcompleta,{ user: usuarioLogin, password: passwordLogin})
        localStorage.setItem("token", response.data)
        usuarioLoginInput.value=""
        passwordLoginInput.value=""
        exibeAlerta('.alert-login', "Usuário logado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
      }
      catch (e) {
        exibeAlerta('.alert-login', "Falha na autenticação", ['show', 'alert-danger'], ['d-none'], 2000)
      }
    }
    else {
      exibeAlerta(
        ".alert-login", "Preencha todos os campos!!!", ["show", "alert-danger"], ["d-none"], 2000)
    }
  }
  
  function autoResize(textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
}