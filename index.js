const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);    //request listener
const path = require('path');
const socketio = require('socket.io');

const users = { };

// creation of web socket ( wrapping the server insdie socket )
const io = socketio(server);

// for static files
app.use('/',express.static(path.join(__dirname,'public')));

// building connection between client and server ( instantaneously )
io.on('connection',(socket)=>{
    console.log(`Connection established at ${socket.id}`);

    socket.on('send-msg',(data)=>{   // listen to some event
        // console.log(data.msg);
        // socket.emit('received-msg',{
        io.emit('received-msg',{
            msg : data.msg,
            id : socket.id,
            username : users[socket.id]
        })
    })

    socket.on('login',(data)=>{
        // console.log(data.username); 
        users[socket.id] = data.username;   // mapping the socket id with username
    })

})




const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`Server connect at port ${port}`);
})

// npm i socket.io