const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const brush = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector(".save");
const INITIAL_COLOR = "#2c2c2c"

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

let startPainting = (event) =>{
    if(!filling){
        painting = true;
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
}

let stopPainting = () => {
    painting = false;
}

let onMouseMove = event => {
    if(!filling){
        const x = event.offsetX;
        const y = event.offsetY; 
        if(painting){
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
};

let handleModeClick = (mode) => {
    filling = !filling;
    if(filling){
        filling = true;
        mode.innerText = "fill";
    }else{
        filling = false;
        mode.innerText = "paint"
    }
}

let handleCanvasClick = (event) => {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

let handleContextMenu = (event) => {
    event.preventDefault();
}

let handleColorClicked = (event) => {
    ctx.strokeStyle = event.target.style["background-color"]
    ctx.fillStyle = event.target.style["background-color"]
}

let handleBrushSize = (event) => {
    ctx.lineWidth = event.target.value;
}

let handleSave = (event) => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

colors.forEach(color => addEventListener("click", handleColorClicked));
brush.addEventListener("change", handleBrushSize);

mode.addEventListener("click", () => handleModeClick(mode));
save.addEventListener("click", handleSave);

// let test = document.querySelector("#test");
// let testMode = 0;
// test.addEventListener("click", () => {
//     if(testMode == 0){
//         console.log("save")
//         ctx.save();
//         testMode = 1;
//     }else{
//         console.log("restore")
//         ctx.restore();
//         testMode = 0;
//     }
// })