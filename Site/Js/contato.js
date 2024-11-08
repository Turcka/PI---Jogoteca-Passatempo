const protocolo = "http://";
const baseURL = "localhost:3000";


document.querySelector('#contatoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const mensagem = document.querySelector('#mensagem').value;

    const URLcompleta = `${protocolo}${baseURL}/contato`;

    try {
        const resposta = await axios.post(URLcompleta, { nome, email, mensagem });
        alert("Mensagem enviada com sucesso!");
        console.log(resposta.data);
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("Erro ao enviar mensagem. Tente novamente.");
    }
});

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
