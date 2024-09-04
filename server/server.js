const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})
const sockets = require('./socket.js')
const server = require('./listen.js')

const PORT = 3030

//Apply express middleware
app.use(cors())

//setup Socket
sockets.connect(io, PORT)
//sever listen
server.listen(http, PORT)