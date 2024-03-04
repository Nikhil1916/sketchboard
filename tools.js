const optionCont = document.querySelector(".options-cont");
let isOptionsFlag = true;
const toolsCont = document.querySelector(".tools-cont");
const pencilToolsCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
let isPencilFlag = false;
let isEraserFlag = false;
const pencilImg = document.querySelector(".pencil");
const eraseImg = document.querySelector(".erase");
const sticky = document.querySelector(".sticky");


// isOptionsFlag true -> show tools , false =>hide tools
optionCont.addEventListener("click", (e) => {
    isOptionsFlag = !isOptionsFlag;
    if(isOptionsFlag) {
        openTools();
    } else {
        closeTools();
    }
});

function openTools() {
    const iconEl = optionCont?.children[0];
    iconEl.classList.remove("fa-times");
    iconEl.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}

function closeTools() {
    const iconEl = optionCont?.children[0];
    iconEl.classList.add("fa-times");
    iconEl.classList.remove("fa-bars");
    toolsCont.style.display = "none";
    pencilToolsCont.style.display = "none";
    eraserToolCont.style.display = "none"
}

pencilImg.addEventListener("click",e=>{
    isPencilFlag = !isPencilFlag;
    if(isPencilFlag) {
        pencilToolsCont.style.display = "block";
    } else pencilToolsCont.style.display = "none";
});


eraseImg.addEventListener("click",e=>{
    isEraserFlag = !isEraserFlag;
    if(isEraserFlag) {
        eraserToolCont.style.display = "flex";
    } else eraserToolCont.style.display = "none";
})

sticky.addEventListener("click", (e) => {
  const stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = `
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="note-cont">
    <textarea></textarea>
</div>
    `;
    document.body.appendChild(stickyCont);
    stickyCont.onmousedown = function(event) {
        dragAndDrop(stickyCont, )
      };
});

function dragAndDrop(element) {
// (1) prepare to moving: make absolute and on top by z-index
ball.style.position = 'absolute';
ball.style.zIndex = 1000;

// move it out of any current parents directly into body
// to make it positioned relative to the body
document.body.append(ball);

// centers the ball at (pageX, pageY) coordinates
function moveAt(pageX, pageY) {
  ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
  ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
}

// move our absolutely positioned ball under the pointer
moveAt(event.pageX, event.pageY);

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

// (2) move the ball on mousemove
document.addEventListener('mousemove', onMouseMove);

// (3) drop the ball, remove unneeded handlers
ball.onmouseup = function() {
  document.removeEventListener('mousemove', onMouseMove);
  ball.onmouseup = null;
};

}