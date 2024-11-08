const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

const port = 3000

mongoose.connect('mongodb+srv://Hidek1n:Passatempo123@cluster0.fx2ir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const Contato = mongoose.model('Contato', mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    mensagem: {type: String} 
}))

app.get('/contato', async (req, res) => {
    const contato = await Contato.find()
    res.json(contato)
})

app.post('/contato', async (req, res) =>{
    const nome = req.bodynome
    const email = req.body.email
    const mensagem = req.body.mensagem

    const contato = new Contato({nome: nome, email: email, mensagem, mensagem})

    await contato.save()
    res.send(contato)
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