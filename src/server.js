const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

//utilizando template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Configurar Pasta Publica
server.use(express.static("public"));

//Configurar caminhos da Aplicação
//Página Inicial
server.get("/", (req, res) => {
    return res.render("index.html");
});
//Criar um Ponto de Coleta
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});
//Resultado da Pesquisa
server.get("/search-results", (req, res) => {
    return res.render("search-results.html");
});

//Ligar Servidor
server.listen(3000);