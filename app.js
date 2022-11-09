const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let counter = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/static"))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, resp) => {
    resp.render('index');
})

app.post('/encuesta', (req, resp) => {
    resp.render('resultado', { encuesta: req.body });
});

app.get('*', (req, resp) => {
    resp.render('404');
});

let server = app.listen(8000, () => {
    console.log('listening on 8000');
})

const io = require('socket.io')(server);

io.on('connection', function(socket) {

    socket.on('formulario_publicacion', function(data) {

        socket.emit('mensaje_actualizado', data);

        socket.emit('numero_aleatorio', (Math.floor(Math.random() * 1000) + 1));

    });

})