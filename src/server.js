const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const db = require("./database/db");

//utilizando template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Configurar Pasta Publica
server.use(express.static("public"));

// Habilitar o uso do req.body
server.use(express.urlencoded({extended: true}));

//Configurar caminhos da Aplicação
//Página Inicial
server.get("/", (req, res) => {
    return res.render("index.html");
});

//Criar um Ponto de Coleta
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    //Inserir dados no BAnco de Dados
    const query =
    `INSERT INTO places (
        name,
        image,        
        address,
        address2,
        state,
        city,
        items
    ) VALUES (
        ?,?,?,?,?,?,?
    );`;
    
    //req.body: Corpo do Formulário
    const values = [
        req.body.name,
        req.body.image,        
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no Cadastro!");
        }
        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData);
});

//Resultado da Pesquisa
server.get("/search-results", (req, res) => {

    //req.query: Query Strings da url
    const search = req.query.search;

    if(search == "") {
        //Pesquisa Vazia
        return res.render("search-results.html");
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }
        //Mostrar a página HTML com os dados do Banco de Dados
        return res.render("search-results.html", { places: rows });
    });
});

//Ligar Servidor
server.listen(3000);