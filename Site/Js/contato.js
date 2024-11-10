const protocolo = "http://";
const baseURL = "localhost:3000";

async function enviarContato() {
    const contatosEndpoint = "/contatos";
    const URLcompleta = `${protocolo}${baseURL}${contatosEndpoint}`
    let nomeInput = document.querySelector("#nome")
    let emailInput = document.querySelector("#email")
    let mensagemInput = document.querySelector("#mensagem")
    let nome = nomeInput.value
    let email = emailInput.value
    let mensagem = mensagemInput.value
    await axios.post(URLcompleta, { nome, email, mensagem}).data
}

function autoResize(textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
}
