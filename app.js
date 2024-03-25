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
    console.log(socket);
    console.log("Made socket Connection");

    // recieve data from front end
    socket.on("beginpath",(data)=>{

        // transfer data to all connected computers
        io.sockets.emit("beginpath", data);
    });

        // recieve data from front end
        socket.on("drawStroke",(data)=>{

            // transfer data to all connected computers
            io.sockets.emit("drawStroke", data);
        });

           // recieve data from front end
           socket.on("redoUndo",(data)=>{

            // transfer data to all connected computers
            io.sockets.emit("redoUndo", data);
        });
    

});//on connection this emitter is invoked