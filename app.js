const express = require('express');
const socket = require('socket.io');

const app = express();//initialize and server ready

app.use(express.static("public"))

const port = 5000;
const server = app.listen(port, ()=>{
    console.log("Listening to port " + port);
});

const io = socket(server);
io.on("connection",(socket)=>{
    // console.log(socket);
    console.log("Made socket Connection")
});//on connection this emitter is invoked