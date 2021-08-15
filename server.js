const express = require('express')
const path = require('path');
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app);
const FormatMessage = require('./utils/message')
const io = socketio(server);
//set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatBot'

//Run when client connect
io.on('connection', socket =>{
    console.log('new connection');
    // Welcome to the chat
    socket.emit('message', FormatMessage(botName, 'Welcome to Chat Group'))



    //BroadCast when a user connects
    socket.broadcast.emit('message', FormatMessage(botName, 'A user has joined the chat'))

    //Run when user disconnect
    socket.on('disconnect', () =>{
        io.emit('message', FormatMessage(botName, 'A user has left the chat'))
    })
    
    // Listen for chatMessage
   

    socket.on('username', username => {
        socket.on('chatMessage', msg =>{
            console.log(msg)
            io.emit('message', FormatMessage(username, msg))
    
        })
    })
})
const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server is runing on port ${PORT}`))