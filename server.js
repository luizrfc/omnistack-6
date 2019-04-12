const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(cors())

const server = require('http').Server(app) //recebe requisições via http
const io = require('socket.io')(server) //recebe requisições via socket

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-cbgyw.mongodb.net/db-omnistack?retryWrites=true', {
    useNewUrlParser: true,
})

app.use((req, res, next) => { //para atribuir o Socket.IO para toda requisição
    req.io = io //cria um novo "padrão" = io que pode ser acessado a qualquer momento em qualquer controller
    return next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use('/files', express.static(path.resolve(__dirname, 'temp')))

app.use(require('./src/routes'))

server.listen(process.env.PORT || 3000)