//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iniciar o objeto do Banco de Dados
const db = new sqlite3.Database("./src/database/database.db");

// exportar ando de Daos
module.exports = db;

/*//Utilizar o objeto do BAnco de Dados
db.serialize(() => {
    //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    //Inserir dados
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
    );`

    const values1 = [
        "Colectoria",
        "https://images.unsplash.com/photo-1579061201641-1e98ff03f7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=937&q=80",
        "Guilherme Gemballa, Jardin América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuos Eletroônicos, Lâmpadas"
    ];

    const values2 = [
        "Papersider",
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Guilherme Gemballa, Jardin América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papeis e Papelão"
    ];

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Cadastrado com Sucesso");
        console.log(this);
    }

    db.run(query, values1, afterInsertData);
    db.run(query, values2, afterInsertData);

    //Consultar Dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err);
        }
        console.log("Aqui estão os seus registros:");
        console.log(rows);
    })

    //Deletar Dados /*
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Registro deletado com sucesso");
    });
});
*/

