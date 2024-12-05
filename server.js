const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para o arquivo
    },
  });
  
  const upload = multer({ storage });
  
  // Middleware para servir arquivos estáticos (opcional, para acessar as imagens salvas)
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  
  // Rota para upload
  app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("Nenhum arquivo foi enviado.");
    }
    res.send(`Imagem enviada com sucesso! Acesse em /uploads/${req.file.filename}`);
  });
  
  // Rota principal para exibir o formulário
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/Site/index.html"));
  });

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.send(`Imagem salva com sucesso: ${req.file.filename}`);
    } catch (error) {
        res.status(500).send('Erro ao salvar a imagem');
    }
});


app.use('/uploads', express.static(path.join(__dirname, '/Site/imagens')));


const Contato = mongoose.model("Contato", mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    mensagem: {type: String} 
}))

const textoSchema = mongoose.Schema({
    id: {type: Number},
    text: {type: String},
})

const Texto = mongoose.model("Texto", textoSchema)

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
        const a = await usuarioExiste.updateOne({ adm: "True" })
        res.status(200).json({token: token, a})
    }
})

app.post("/logout", async (req, res) => {
    const user = await Usuario.updateOne({ adm: "False" })
    res.status(200).json({user})
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

app.post('/texto', async (req, res) => {
    const id = req.body.id;
    const text = req.body.text;
    const idExiste = await Texto.findOne({id: id})
    if (!idExiste) {
        return res.status(401).json({mensagem: "id não existe"})
    }
    const a = await idExiste.updateOne({ text: text })
    res.json(a)
})

app.get('/texto', async (req, res) => {
    const textos = await Texto.find()
    res.json(textos)
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