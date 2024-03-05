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
const upload = document.querySelector(".upload");

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

upload.addEventListener("click", () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", e => {
        const file = input?.files?.[0];
        const url = URL.createObjectURL(file);
        createSticky(`
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
        <img src="${url}" />
    </div>
    `)
    })
})

sticky.addEventListener("click", (e) => {
    createSticky(
        ` <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>`
    )
});

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        console.log("remove sticky cont");
        stickyCont.remove();
    });

    let isTextMinimised = false;
    minimize.addEventListener("click", () => {
        isTextMinimised = !isTextMinimised;
        const noteCont = stickyCont.querySelector(".note-cont");
        if (isTextMinimised) {
            noteCont.style.display = "none";
        } else noteCont.style.display = "block";
    })
}


function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = "absolute";
    element.style.zIndex = 1000;

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

function createSticky(stickyTemplateHtml) {
    const stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHtml;
    document.body.appendChild(stickyCont);
    const minimize = stickyCont.querySelector(".minimize");
    const remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);
    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}