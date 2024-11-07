document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    fetch('/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, mensagem })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.querySelector('form').reset();
    })
    .catch(error => {
        console.error('Erro ao enviar dados', error);
        alert('Erro ao enviar a mensagem. Tente novamente.');
    });
});


function autoResize(textarea) {
    textarea.style.height = 'auto';  
    textarea.style.height = textarea.scrollHeight + 'px';  
}
