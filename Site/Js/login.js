const protocolo = "http://";
const baseURL = "localhost:3000";

const fazerLogin = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    let modalLogin = bootstrap.Modal.getInstance(document.querySelector("#modalLogin"));
    if (usuarioLogin && passwordLogin) {
      try {
        const loginEndpoint = '/login'
        const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
        const response = await axios.post(
          URLcompleta,
          {login: usuarioLogin, password: passwordLogin}
        )
        localStorage.setItem("token", response.data)
        usuarioLoginInput.value=""
        passwordLoginInput.value=""
        exibeAlerta('.alert-modal-login', "Usuário logado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
        setTimeout(() => modalLogin.hide(), 2000)
        const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
        cadastrarFilmeButton.disabled = false
        const loginLink = document.querySelector('#loginLink')
        loginLink.innerHTML = "Logout"
      }
      catch (e) {
        exibeAlerta('.alert-modal-login', "Falha na autenticação", ['show', 'alert-danger'], ['d-none'], 2000)
      }
    }
    else {
      exibeAlerta(
        ".alert-modal-login", "Preencha todos os campos!!!", ["show", "alert-danger"], ["d-none"], 2000)
    }
  }