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

async function fazerLogin() {
  let usuarioLoginInput = document.querySelector('#user')
  let passwordLoginInput = document.querySelector('#password')
  let usuarioLogin = usuarioLoginInput.value
  let passwordLogin = passwordLoginInput.value
  if (usuarioLogin && passwordLogin) {
    try{
    const loginEndpoint = '/usuarios'
    const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
    const response = await axios.post(
      URLcompleta,
      {user: usuarioLogin, password: passwordLogin}
    )
    localStorage.setItem("token", response.data)
    usuarioLoginInput.value = ""
    passwordLoginInput.value = ""
    exibeAlerta('.alert-login', "Usuário logado com sucesso", ['show', 'alert-success'], ['d-none'], 2000)
    }
    catch (e) {
      exibeAlerta('.alert-modal-login', "Falha na autenticação", ['show', 'alert-danger'], ['d-none'], 2000)
    }
  }
}

