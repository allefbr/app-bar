# RestFul com Node.js
Este repositório contém um pequeno CRUD com Node.js consumido com RESTful em um banco de dados MySQL.

As seguintes tecnologias foram usadas.
*   [Nodemon](https://nodemon.io/).
*   [Restify](http://restify.com/).
*   [Restify Erros](https://github.com/restify/errors).
*   [Knex.js](http://knexjs.org/).

## Como rodar o projeto
Para fazer o projeto funcionar direitinho, você precisa ter o MySQL configurado, com o banco de dados e a tabela criada. Caso não tenha criado use o script abaixo.

```sql

CREATE DATABASE `node_crud_app`;

USE `node_crud_app`;

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `quantidade` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `produtos` (`id`, `name`, `quantidade`) VALUES
(5, 'Cerveja Itaipava', NULL),
(6, 'Batata Frita Pequena', NULL),
(23, 'Batata Frita Grande', NULL),
(25, 'Churrasco de Coração', NULL);

ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

```

Em index.js, adicione os dados para conectar ao seu banco de dados MySQL.

```javascript 
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'seu_host',
        user: 'seu_usuario',
        password: 'seua_senha',
        database: 'node-crud-prod'
    }
});
```

Instale o nodemon globalmente.
`npm install -g nodemon`

Entre no seu projeto e instale todas as dependências.

`npm install`

Após tudo está instalado execute o comando abaixo e o projeto estara rodando na porta :8080.
`nodemon index.js`