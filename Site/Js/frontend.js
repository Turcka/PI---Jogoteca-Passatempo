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

async function obterTexto() {
  const textosEndpoint = "/texto";
  const URLcompleta = `${protocolo}${baseURL}${textosEndpoint}`;
  const resposta = await axios.get(URLcompleta);
  return resposta.data;
}

async function fazerLogout() {
  const logoutEndpoint = "/logout";
  const URLcompleta = `${protocolo}${baseURL}${logoutEndpoint}`;
  (await axios.post(URLcompleta)).data;
}

async function editarTexto() {
  const textosEndpoint = "/texto";
  const URLcompleta = `${protocolo}${baseURL}${textosEndpoint}`;
  axios.post(URLcompleta, { id: 1, text: document.getElementById("inputT1").value}).data
  axios.post(URLcompleta, { id: 2, text: document.getElementById("inputT1p1").value}).data
  axios.post(URLcompleta, { id: 3, text: document.getElementById("inputT1p2").value}).data
  axios.post(URLcompleta, { id: 4, text: document.getElementById("inputT1p3").value}).data
  axios.post(URLcompleta, { id: 5, text: document.getElementById("inputT1p4").value}).data
  axios.post(URLcompleta, { id: 6, text: document.getElementById("inputT2").value}).data
  axios.post(URLcompleta, { id: 7, text: document.getElementById("inputT2p1").value}).data
  axios.post(URLcompleta, { id: 8, text: document.getElementById("inputT2p2").value}).data
  axios.post(URLcompleta, { id: 9, text: document.getElementById("inputT2p3").value}).data
  axios.post(URLcompleta, { id: 10, text: document.getElementById("inputT3").value}).data
  axios.post(URLcompleta, { id: 11, text: document.getElementById("inputT3p1").value}).data
  axios.post(URLcompleta, { id: 12, text: document.getElementById("inputT3p2").value}).data
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
    entrarButton.remove()
    const nameMsg = document.getElementById("nameMsg")
    nameMsg.classList.remove("th-login")
    nameMsg.innerHTML = "Nome"
    const msgMsg = document.getElementById("msgMsg")
    msgMsg.classList.remove("th-login")
    msgMsg.innerHTML = "Mensagem"
    const emailMsg = document.getElementById("emailMsg")
    emailMsg.classList.remove("th-login")
    emailMsg.innerHTML = "Email"
    obterContato()
    var botao = document.createElement("button");
    botao.innerHTML = "Logout";
    botao.classList.add("enviar")
    botao.onclick = fazerLogout
    var containerBtnLog = document.getElementById("btn-log");
    containerBtnLog.appendChild(botao);
  }
}

async function admPageIndex() {
  const loginEndpoint = "/login";
  const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`;
  const adm = (await axios.get(URLcompleta)).data;
  const textos = await obterTexto()
  const t1 = document.getElementById("t1");
  t1.innerHTML = textos.find(item => item.id === 1).text;
  const t1p1 = document.getElementById("t1p1");
  t1p1.innerHTML = textos.find(item => item.id === 2).text;
  const t1p2 = document.getElementById("t1p2");
  t1p2.innerHTML = textos.find(item => item.id === 3).text;
  const t1p3 = document.getElementById("t1p3");
  t1p3.innerHTML = textos.find(item => item.id === 4).text;
  const t1p4 = document.getElementById("t1p4");
  t1p4.innerHTML = textos.find(item => item.id === 5).text;
  const t2 = document.getElementById("t2");
  t2.innerHTML = textos.find(item => item.id === 6).text;
  const t2p1 = document.getElementById("t2p1");
  t2p1.innerHTML = textos.find(item => item.id === 7).text;
  const t2p2 = document.getElementById("t2p2");
  t2p2.innerHTML = textos.find(item => item.id === 8).text;
  const t2p3 = document.getElementById("t2p3");
  t2p3.innerHTML = textos.find(item => item.id === 9).text;
  const t3 = document.getElementById("t3");
  t3.innerHTML = textos.find(item => item.id === 10).text;
  const t3p1 = document.getElementById("t3p1");
  t3p1.innerHTML = textos.find(item => item.id === 11).text;
  const t3p2 = document.getElementById("t3p2");
  t3p2.innerHTML = textos.find(item => item.id === 12).text;
  if (adm.includes("True")) {
    const admCentro = document.querySelector('.admCentro');
    admCentro.style.alignItems = 'flex-start';
    const admCentro2 = document.querySelector('.admCentro2');
    admCentro2.style.alignItems = 'flex-start';
    const admCentro3 = document.querySelector('.admCentro3');
    admCentro3.style.alignItems = 'flex-start';
    var botao = document.createElement("button");
    botao.innerHTML = "Editar";
    botao.classList.add("enviar")
    var containerBtnLog = document.getElementById("btn-edit");
    botao.onclick = editarTexto
    containerBtnLog.appendChild(botao);
    var inputT1 = document.createElement("textarea");
    inputT1.type = "text";
    inputT1.id = "inputT1"; 
    inputT1.name = "inputT1"; 
    inputT1.classList.add("titulo")
    inputT1.value = textos.find(item => item.id === 1).text;;
    const t1 = document.getElementById("t1");
    t1.innerHTML = ""
    t1.appendChild(inputT1);
    var inputT1p1 = document.createElement("textarea");
    inputT1p1.type = "text";
    inputT1p1.id = "inputT1p1"; 
    inputT1p1.name = "inputT1p1";
    inputT1p1.value = textos.find(item => item.id === 2).text;;
    const t1p1 = document.getElementById("t1p1");
    t1p1.innerHTML = ""
    t1p1.appendChild(inputT1p1);
    var inputT1p2 = document.createElement("textarea");
    inputT1p2.type = "text";
    inputT1p2.id = "inputT1p2"; 
    inputT1p2.name = "inputT1p2"; 
    inputT1p2.value = textos.find(item => item.id === 3).text;;
    const t1p2 = document.getElementById("t1p2");
    t1p2.innerHTML = ""
    t1p2.appendChild(inputT1p2);
    var inputT1p3 = document.createElement("textarea");
    inputT1p3.type = "text";
    inputT1p3.id = "inputT1p3"; 
    inputT1p3.name = "inputT1p3"; 
    inputT1p3.value = textos.find(item => item.id === 4).text;;
    const t1p3 = document.getElementById("t1p3");
    t1p3.innerHTML = ""
    t1p3.appendChild(inputT1p3);
    var inputT1p4 = document.createElement("textarea");
    inputT1p4.type = "text";
    inputT1p4.id = "inputT1p4"; 
    inputT1p4.name = "inputT1p4"; 
    inputT1p4.value = textos.find(item => item.id === 5).text;;
    const t1p4 = document.getElementById("t1p4");
    t1p4.innerHTML = ""
    t1p4.appendChild(inputT1p4);
    var inputT2 = document.createElement("textarea");
    inputT2.type = "text";
    inputT2.id = "inputT2"; 
    inputT2.name = "inputT2"; 
    inputT2.classList.add("titulo")
    inputT2.value = textos.find(item => item.id === 6).text;;
    const t2 = document.getElementById("t2");
    t2.innerHTML = ""
    t2.appendChild(inputT2);
    var inputT2p1 = document.createElement("textarea");
    inputT2p1.type = "text";
    inputT2p1.id = "inputT2p1"; 
    inputT2p1.name = "inputT2p1"; 
    inputT2p1.value = textos.find(item => item.id === 7).text;;
    const t2p1 = document.getElementById("t2p1");
    t2p1.innerHTML = ""
    t2p1.appendChild(inputT2p1);
    var inputT2p2 = document.createElement("textarea");
    inputT2p2.type = "text";
    inputT2p2.id = "inputT2p2"; 
    inputT2p2.name = "inputT2p2"; 
    inputT2p2.value = textos.find(item => item.id === 8).text;;
    const t2p2 = document.getElementById("t2p2");
    t2p2.innerHTML = ""
    t2p2.appendChild(inputT2p2);
    var inputT2p3 = document.createElement("textarea");
    inputT2p3.type = "text";
    inputT2p3.id = "inputT2p3"; 
    inputT2p3.name = "inputT2p3"; 
    inputT2p3.value = textos.find(item => item.id === 9).text;;
    const t2p3 = document.getElementById("t2p3");
    t2p3.innerHTML = ""
    t2p3.appendChild(inputT2p3)
    var inputT3 = document.createElement("textarea");
    inputT3.type = "text";
    inputT3.id = "inputT3"; 
    inputT3.name = "inputT3"; 
    inputT3.classList.add("titulo")
    inputT3.value = textos.find(item => item.id === 10).text;;
    const t3 = document.getElementById("t3");
    t3.innerHTML = ""
    t3.appendChild(inputT3)
    var inputT3p1 = document.createElement("textarea");
    inputT3p1.type = "text";
    inputT3p1.id = "inputT3p1"; 
    inputT3p1.name = "inputT3p1"; 
    inputT3p1.value = textos.find(item => item.id === 11).text;;
    const t3p1 = document.getElementById("t3p1");
    t3p1.innerHTML = ""
    t3p1.appendChild(inputT3p1);
    var inputT3p2 = document.createElement("textarea");
    inputT3p2.type = "text";
    inputT3p2.id = "inputT3p2"; 
    inputT3p2.name = "inputT3p2"; 
    inputT3p2.value = textos.find(item => item.id === 12).text;;
    const t3p2 = document.getElementById("t3p2");
    t3p2.innerHTML = ""
    t3p2.appendChild(inputT3p2);
  }
}