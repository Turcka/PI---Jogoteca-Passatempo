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
      const response = await axios.post(URLcompleta, { user: usuarioLogin, password: passwordLogin })
      localStorage.setItem("token", response.data)
      usuarioLoginInput.value = ""
      passwordLoginInput.value = ""
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

function exibirMensagens(contato) {
  let tabela = document.querySelector(".mensagem");
  let corpoTabela = tabela.getElementsByTagName("tbody")[0];
  corpoTabela.innerHTML = "";
  for (let contatos of contato) {
    let linha = corpoTabela.insertRow();
    let celulaNome = linha.insertCell(0);
    let celulaEmail = linha.insertCell(1);
    let celulaMensagem = linha.insertCell(2);
    celulaNome.innerHTML = contatos.nome;
    celulaEmail.innerHTML = contatos.email;
    celulaMensagem.innerHTML = contatos.mensagem;
  }
}

async function obterContato() {
  const contatosEndpoint = "/contatos";
  const URLcompleta = `${protocolo}${baseURL}${contatosEndpoint}`;
  const contato = (await axios.get(URLcompleta)).data;
  exibirMensagens(contato);
}

async function fazerLogout() {
  const logoutEndpoint = "/logout";
  const URLcompleta = `${protocolo}${baseURL}${logoutEndpoint}`;
  (await axios.post(URLcompleta)).data;
}

async function admPageLogin() {
  const loginEndpoint = "/login";
  const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`;
  const adm = (await axios.get(URLcompleta)).data;
  if (adm.includes("True")) {
    const loginLink = document.querySelector('.titulo')
    loginLink.innerHTML = "ADM"
    const userText = document.querySelector('.userText')
    userText.innerHTML = ""
    const passwordText = document.querySelector('.passwordText')
    passwordText.innerHTML = ""
    const userInput = document.getElementById('usuarioLoginInput')
    userInput.style.display = "none";
    const passwordInput = document.getElementById("passwordLoginInput")
    passwordInput.style.display = "none";
    const entrarButton = document.getElementById("loginButton")
    const nameMsg = document.getElementById("nameMsg")
    nameMsg.innerHTML = "Nome"
    const emailMsg = document.getElementById("emailMsg")
    emailMsg.innerHTML = "Email"
    const msgMsg = document.getElementById("msgMsg")
    msgMsg.innerHTML = "Mensagem"
    entrarButton.remove()
    obterContato()
    var botao = document.createElement("button");
    botao.innerHTML = "Logout";
    botao.classList.add("enviar")
    botao.onclick = fazerLogout()
    var container = document.getElementById("btn-log");
    container.appendChild(botao);
  }
}

