const express = require("express");
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const cors = require('cors')

app.use(cors())

const io = socketIo(server, {
    cors:{
        origin: "*"
    }
}
)


io.on('connection', socket=>{
    // console.log('user has joined: ' + socket.id)
    
    socket.on('join-room', (room)=>{
        socket.join(room)
    })

    socket.on('sendMessage', data=>{
        socket.broadcast.to(data.room).emit('sendMessage', {msg:data.msg, isMe:false, imgSrc:data.imgSrc})
    })

})

const PORT = process.env.PORT || 4000

server.listen(PORT, ()=>{
    console.log("server runing")
})