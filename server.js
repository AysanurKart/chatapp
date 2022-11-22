const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express ();
const server = http.createServer(app);
const io = socketio(server);

// forbinder statisk mappe 
app.use(express.static(path.join(__dirname, 'public')));

// run når en client fobinder
io.on('connection', socket => {
    
    //Welcomes current user 
    socket.emit('message', 'Welcome to LiveChat!');

    //broadcast when a user connects
    socket.broadcast.emit();

    io.emit('message', 'A user has joined the chat');

    //runs when client disconnects
    socket.on('disconnect',() => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for chatMessage 
    socket.on('chatMessage', (msg) => {
        console.log(msg);
    });
    
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));