const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Hidek1n:Passatempo123@Cluster0.mongodb.net/PassatempoJogoteca', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});

const contatoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    mensagem: String,
    dataEnvio: { type: Date, default: Date.now }
});

const Contato = mongoose.model('contatos', contatoSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contato', async (req, res) => {
    try {
        const { nome, email, mensagem } = req.body;

        const novoContato = new Contato({ nome, email, mensagem });

        await novoContato.save();
        res.status(200).send({ message: 'Mensagem enviada com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar o contato', err);
        res.status(500).send({ message: 'Erro ao enviar mensagem' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
