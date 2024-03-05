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
    beginPath({
        x: e.clientX, y:e.clientY
    })
});

canvas.addEventListener("mousemove",e=>{
    if(mouseDown) {
        drawStroke({
            x: e.clientX, y:e.clientY , color: isEraserFlag ? eraserColor : penColor , 
            width: isEraserFlag ? eraserWidth : pencilWidth
        })
    }
});

canvas.addEventListener("mouseup",e=>{
    mouseDown = false;
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
