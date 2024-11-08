const protocolo = "http://";
const baseURL = "localhost:3000"

async function enviarContato(){
    const contatoEndpoint = "/contato";
    let nome = document.querySelector('#nome').value
    let email = document.querySelector('#email').value
    let mensagem = document.querySelector('mensagem').value
    const URLcompleta = `${protocolo}${baseURL}${contatoEndpoint}`;
    await axios.post(URLcompleta, { nome, email, mensagem }).data;
}

function autoResize(textarea) {
    textarea.style.height = 'auto';  
    textarea.style.height = textarea.scrollHeight + 'px';  
}
