const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'app-bar'
    }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


// START
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

// INDEX
server.get('/', restify.plugins.serveStatic({
    directory: './dist',
    file: 'index.html'
}));

// Lista Produtos
server.get('/produtos', function (req, res, next) {    
    knex('produtos').then( (dados) => {
        res.send(dados);

    }, next);
});

// Cadastra produto
server.post('/produtos/cadastro', function (req, res, next) {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// Busca um produto especifico por ID
server.get('/produtos/:id', function (req, res, next) {
    const { id } = req.params;

    knex('produtos')
        .where('id', id)
        .first()
        .then((dados) => {

            if( !dados ) return res.send( new errs.BadRequestError('nada foi encontrado') )

            res.send(dados);

        }, next);
});

// Atualiza um produto
server.put('/produtos/atualizar/:id', function (req, res, next) {
    const { id } = req.params;

    knex('produtos')
        .where('id', id)
        .update( req.body )
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('Dados atualizados');

        }, next);
});


// Apaga um produto
server.del('/produtos/apagar/:id', function (req, res, next) {
    const { id } = req.params;

    knex('produtos')
        .where('id', id)
        .delete()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('Dados excluidos');

        }, next);
});