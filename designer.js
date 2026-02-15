const upload = document.getElementById("upload");
const designImage = document.getElementById("design-image");
const scaleSlider = document.getElementById("scale-slider");
const resetBtn = document.getElementById("reset");

let isDragging = false;
let offsetX, offsetY;
let scale = 1;

// Upload image
upload.addEventListener("change", function(e){
    const reader = new FileReader();
    reader.onload = function(event){
        designImage.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Drag functionality (mouse + touch)
function startDrag(e){
    isDragging = true;
    const rect = designImage.getBoundingClientRect();

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
}

function drag(e){
    if(!isDragging) return;

    const wrapperRect = document.querySelector(".canvas-wrapper").getBoundingClientRect();

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

    let x = clientX - wrapperRect.left - offsetX;
    let y = clientY - wrapperRect.top - offsetY;

    designImage.style.left = x + "px";
    designImage.style.top = y + "px";
    designImage.style.transform = `scale(${scale})`;
}

function stopDrag(){
    isDragging = false;
}

designImage.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

designImage.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", drag);
document.addEventListener("touchend", stopDrag);

// Scale control
scaleSlider.addEventListener("input", function(){
    scale = this.value;
    designImage.style.transform = `scale(${scale})`;
});

// Reset
resetBtn.addEventListener("click", function(){
    designImage.style.left = "50%";
    designImage.style.top = "50%";
    designImage.style.transform = "translate(-50%, -50%) scale(1)";
    scaleSlider.value = 1;
});