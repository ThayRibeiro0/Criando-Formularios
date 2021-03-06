const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser')
const Post = require('./models/Post')
console.clear 

//Config
//Template Engine
app.engine('handlebars', engine({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');
app.set("views", "./views")

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Rotas

app.get('/', function (req, res){ 
    Post.findAll().then(function(posts){
        console.log(posts);
        res.render('home', {posts: posts})
    })    
})

app.get('/cad', function(req, res){ 
    res.render('formulario.handlebars');
})

app.post('/add', function(req,res){ 
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Hove um erro: " + erro)
    })
})

app.listen(8033, function(){
    console.log("Servidor Rodando na url http://localhost:8033")
});