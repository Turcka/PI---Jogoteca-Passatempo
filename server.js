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

const usuarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model ("Usuario", usuarioSchema)

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

app.post ('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuarioExiste = await Usuario.findOne({login: login})
    if (!usuarioExiste) {
        return res.status(401).json({mensagem: "login inválido"})
    }
    const senhaValida = await bcrypt.compare (password, usuarioExiste.password)
    if (!senhaValida) {
        return res.status(401).json({mensagem: "senha inválida"})
    }
    const token = jwt.sign (
        {login: login},
        "id-secreto",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})
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