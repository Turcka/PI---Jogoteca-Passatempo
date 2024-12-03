const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config()

const port = 3000 

const connect_string = process.env.db_connect

async function conectarAoMongoDB() {
    await mongoose.connect(connect_string)
}

const Contato = mongoose.model("Contato", mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    mensagem: {type: String} 
}))

const usuarioSchema = mongoose.Schema({
    user: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    adm:{type: String}
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model ("Usuario", usuarioSchema)

app.post("/contatos", async (req, res) => {
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

app.post("/login", async (req, res) => {
    const user = req.body.user
    const password = req.body.password
    const usuarioExiste = await Usuario.findOne({user: user})
    if (!usuarioExiste) {
        return res.status(401).json({mensagem: "login invalido"})
    }
    else {
        const senhaCorreta = await bcrypt.compare(password, usuarioExiste.password)
        if (!senhaCorreta) {
            return res.status(401).json({mensagem: "senha inválida"})
        }
        const token = jwt.sign(
            {user: user},
            "chave-secreta",
            {expiresIn: "1h"}
        )
        consta = await usuarioExiste.updateOne({ adm: "True" })
        res.status(200).json({token: token})
    }
})

app.get('/login', async (req, res) => {
    const usuarios = await Usuario.find()
    const valoresAdm = usuarios.map(usuario => usuario.adm)
    res.json(valoresAdm)
})

app.get('/contatos', async (req, res) => {
    const contatos = await Contato.find()
    res.json(contatos)
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