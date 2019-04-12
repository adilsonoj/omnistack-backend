const express =  require('express');
const mongoose = require("mongoose");
const path = require('path');


const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});


//mongoose.connect('mongodb://localhost:27017/oministack', { useNewUrlParser: true});
mongoose.connect('mongodb+srv://admin:<admin>@cluster0-j9y2w.mongodb.net/omnistack?retryWrites=true', { useNewUrlParser: true});

app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: true})); //envio de arquivos
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp' )));

app.use(require('./routes'));
server.listen(3333);