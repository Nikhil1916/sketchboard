const optionCont = document.querySelector(".options-cont");
let isOptionsFlag = true;
const toolsCont = document.querySelector(".tools-cont");
const pencilToolsCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
let isPencilFlag = false;
let isEraserFlag = false;
const pencilImg = document.querySelector(".pencil");
const eraseImg = document.querySelector(".erase");


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
