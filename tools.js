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
  if (isOptionsFlag) {
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
  eraserToolCont.style.display = "none";
}

pencilImg.addEventListener("click", (e) => {
  isPencilFlag = !isPencilFlag;
  if (isPencilFlag) {
    pencilToolsCont.style.display = "block";
  } else pencilToolsCont.style.display = "none";
});

eraseImg.addEventListener("click", (e) => {
  isEraserFlag = !isEraserFlag;
  if (isEraserFlag) {
    eraserToolCont.style.display = "flex";
  } else eraserToolCont.style.display = "none";
});

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
  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
});

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;
  document.body.append(element);

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
