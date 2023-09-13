//modulos
const express = require('express')
const app = express()
//importando o conn e user
const conn = require('./db/conn')
const user = require('./models/Usuario')
const livros = require('./models/livro')
//------handlebars
const exphbs = require('express-handlebars')
const Usuario = require('./models/Usuario')

//porta
const port = 5668
//objeto json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//engine -handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//milddleware
app.use(express.static('public'))

//ROTA PARA MOSTRAR O FORMULARIO
app.get('/users/create', (req, res) => {
    return res.render('userAdd')
})
//ROTA PARA CADASTRAR AS INFORMAÇÕES DO FORMULÁRIO
app.post('/users/create', async (req, res) => {
    const { nome, email, password } = req.body
    await user.create({ nome, email, password })// -----PROMISSE---

    return res.redirect('/user/visualizar')

    //return res.STATUS(201).redirect('/')

})
//ROTAS 
app.get('/users/:id', async function (req, res) {
    const id = req.params.id

    const user = await Usuario.findOne({ raw: true, where: { id: id } })
    console.log(Usuario)
    return res.render('viewsUser', { user })
})
//DELETAR DADO
app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id
    await user.destroy({ where: { id: id } })
    return res.redirect('/user/visualizar')

})
//EDITAR DADO P1
app.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id
    const user = await Usuario.findOne({ raw: true, where: { id: id } })
    return res.render('edituser', { user: user })
})
//EDITAR P2
//USER.UPDATE

app.post('/users/update', async (req, res) => {
    const { id, nome, email, password } = req.body

    const userEdit = {
        id,
        nome,
        email,
        password
    }
    await Usuario.update(userEdit, { where: { id: id } })

    return res.redirect('/user/visualizar')
})
//listar users na home
app.get('/user/visualizar', async (req, res) => {

    const users = await Usuario.findAll({ raw: true })
    console.log(users)//lista os users cadastrados

    return res.render('users', { users })

})
app.get('/', async (req, res) => {
    return res.render('home')
})
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//LIVROS

//adicionar
app.get('/livro/add', async (req, res) => {
    return res.render('livroAdd')
})
app.post('/livro/add', async (req, res) => {
    const { autor, titulo, preco } = req.body
    let capa = req.body.capa
    if (capa == 'on') {
        capa = true
    } else {
        capa = false
    }
    await livros.create({ autor, titulo, capa, preco })
    return res.redirect('/')

})
//listar
app.get('/livro/visualizar', async (req, res) => {
    const id = req.params.id
    const livro = await livros.findAll({ raw: true })
    return res.render('livrosVizu', { livro })
})
app.get('/livro/:id', async (req, res) => {
    const id = req.params.id
    const book = await livros.findOne({ raw: true, where: { id: id } })
    return res.render('livro', { book })
})
//editar

app.get('/livro/edit/:id', async (req, res) => {
    const id = req.params.id
    const libros = await livros.findOne({ raw: true, where: { id: id } })
    return res.render('livroEdit', { libros: libros })
})
app.post('/livro/update', async (req, res) => {
    const { id, autor, titulo, preco } = req.body
    let capa = req.body.capa
    if (capa == 'on') {
        capa = true
    } else {
        capa = false
    }
    const livroUp = {
        id,
        autor,
        titulo,
        capa,
        preco

    }
    await livros.update(livroUp, { where: { id: id } })
    return res.redirect('/livro/visualizar')

})
//DELETE
app.post('/livro/delete/:id', async (req, res) => {
    const id = req.params.id
    await livros.destroy({ where: { id: id } })
    return res.redirect('/livro/visualizar')
})



//criar conexão com o bd
conn.sync().then(() => { // cria a tabela caso nao tenha a User
    app.listen(port, () => {
        console.log(`Servidor ${port}`)
    })
}).catch((err) => console.log(err))

