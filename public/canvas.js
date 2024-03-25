// const { Socket } = require("socket.io");

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseDown = false;
const pencilColor = document.querySelectorAll(".pencil-color");
const pencilWidthElem = document.querySelector(".pencil-width");
const eraserWidthElem = document.querySelector(".eraser-width");
let penColor = "red";
let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let eraserColor = "white";
let undoRedoTracker = [];//data
let tracker = 0;//represent which action from tracker arry
const redo = document.querySelector(".redo");
const undo = document.querySelector(".undo");

//API
const tool = canvas.getContext("2d");
// tool.beginPath();//new graphic (path) line
// tool.moveTo(10,10);//start point
// tool.lineTo(100, 150);
// tool.strokeStyle = "blue"
// tool.lineWidth = 10;
// tool.stroke();
tool.strokeStyle = penColor;
tool.lineWidth = pencilWidth;


// mouse down -> start path, mouse move -> path fill(graphics)

canvas.addEventListener("mousedown",e=>{
    mouseDown = true;   
    // beginPath({
    //     x: e.clientX, y:e.clientY
    // })/
    const data = {
        x: e.clientX, y:e.clientY
    }
    // send data to server
    socket.emit("beginpath", data);
});

canvas.addEventListener("mousemove",e=>{
    if(mouseDown) {
        // drawStroke({
        //     x: e.clientX, y:e.clientY , color: isEraserFlag ? eraserColor : penColor , 
        //     width: isEraserFlag ? eraserWidth : pencilWidth
        // })
        const data = {
            x: e.clientX, y:e.clientY , color: isEraserFlag ? eraserColor : penColor , 
            width: isEraserFlag ? eraserWidth : pencilWidth
        };
        socket.emit("drawStroke", data);
    }
});

canvas.addEventListener("mouseup",e=>{
    mouseDown = false;
    const url = canvas.toDataURL();
    undoRedoTracker.push(url);
    tracker = undoRedoTracker.length -1;
    console.log(undoRedoTracker);
});

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

pencilColor.forEach((colorEl)=>{
    // console.log(e);
    colorEl.addEventListener("click",(e)=>{
        penColor = colorEl.classList[1];
        console.log(colorEl.classList , penColor);
        tool.strokeStyle = penColor;
    })
});

pencilWidthElem.addEventListener("change",(e)=>{
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
});

eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
    tool.strokeStyle = eraserColor;
});

// eraser from tools.js
eraseImg.addEventListener("click", e =>{
    if(isEraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = pencilWidth;
    }
})

download.addEventListener("click",(e)=>{
    const a = document.createElement("a");
    const url = canvas.toDataURL();
    a.href = url;
    a.download = "board.jpg";
    a.click();
  });

undo.addEventListener("click",()=>{
    if(tracker > 0) tracker--;
    // undoRedoCanvas({
    //     trackValue: tracker,
    //     undoRedoTracker
    // })
    const data = {
        trackValue: tracker,
        undoRedoTracker
    };
    socket.emit("redoUndo", data);
});

redo.addEventListener("click",()=>{
    console.log("redo");
    if(tracker < undoRedoTracker.length - 1) tracker++;
    // undoRedoCanvas({
    //     trackValue: tracker,
    //     undoRedoTracker
    // })
    const data = {
        trackValue: tracker,
        undoRedoTracker
    };
    socket.emit("redoUndo", data);
});

function undoRedoCanvas(trackObj) {
    tracker =   trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    const img = new Image();//new image refernce
    img.src = undoRedoTracker[tracker];
    img.onload = (e) => {
        tool.drawImage(img,0,0,canvas.width, canvas.height);
    }
}

// data from server
socket.on("beginpath",(data)=>{

    beginPath(data);
    
});


// data from server
socket.on("drawStroke",(data)=>{
    console.log(data);
    drawStroke(data);
    
});

// data from server
socket.on("redoUndo",(data)=>{
    console.log(data);
    undoRedoCanvas(data);
    
});

