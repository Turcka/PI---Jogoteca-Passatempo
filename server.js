const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// const uniqueValidator = require ('mongoose-unique-validator')
// const bcrypt = require('bcrypt')
// const jwt = require ('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

const port = 3000

async function conectarAoMongoDB() {
    await mongoose.connect('mongodb+srv://Hidek1n:Dsg0YOuBiJjHz9ms@cluster0.fx2ir.mongodb.net/PassatempoJogoteca')
}

const Contato = mongoose.model('Contato', mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    mensagem: {type: String} 
}))

app.post('/contatos', async (req, res) => {
    try {
        const nome = req.body.nome;
        const email = req.body.email;
        const mensagem = req.body.mensagem;
        const contato = new Contato({ nome: nome, email: email, mensagem: mensagem });
        const resMongo = await contato.save()
        console.log(resMongo)
        res.status(201).end()
    }
    catch(e) {
        console.log(e)
        res.status(409).end()
    }
})

app.listen (port, () => {
    try {
        conectarAoMongoDB()
        console.log("server up & running e conexão com BD OK")
    }
    catch (e) {
        console.log ('erro de conexão', e)
    }
})