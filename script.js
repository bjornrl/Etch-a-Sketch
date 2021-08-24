const defaultColor = "#333333";
const defaultMode = "color";
const defaultSize = 16;
const white = "#f1f1f1";

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

const container = document.getElementById("container");
const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

console.log(rainbowBtn);
console.log(colorPicker);

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => clearGrid();

console.log(clearBtn);

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

const gridSizePicker = prompt("How big do you want your grid to be?");

function isGridBiggerThan100(gridSizePicker) {
  if (gridSizePicker > 100) {
    return 100;
  } else if (gridSizePicker < 0) {
    return 2;
  } else {
    return gridSizePicker;
  }
}

console.log(isGridBiggerThan100(gridSizePicker));

function makeGrid(rows, cols) {
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    cell.addEventListener("mouseover", changeCellColor);
    container.appendChild(cell).className = "gridItem";
  }
}

makeGrid(
  isGridBiggerThan100(gridSizePicker),
  isGridBiggerThan100(gridSizePicker)
);

function changeCellColor(e) {
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = white;
  }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

function clearGrid() {
  container.innerHTML = "";
  location.reload();
  return false;
}
