const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const color = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const modeBtn = document.querySelector('#jsMode');
const clearBtn = document.querySelector('#jsClear');
const saveBtn = document.querySelector('#jsSave');

const CANVAS_WIDTH = canvas.offsetWidth;
const CANVAS_HEIGHT = canvas.offsetHeight;
const INIT_COLOR = '#2c2c2c';

// css 상의 width, height을 입력해주어야 작동
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// default style
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.lineWidth = 10;
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;

let painting = false;
let isFill = true;

function startPainting() {
  if (!isFill) {
    painting = true;
  }
}

function stopPainting() {
  if (!isFill) {
    painting = false;
  }
}

function onMouseMove(event) {
  const { offsetX: x, offsetY: y } = event;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseEnter(event) {
  const { offsetX: x, offsetY: y } = event;
  if (painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function onColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function onChange(event) {
  ctx.lineWidth = event.target.value;
}

function onFillRect() {
  if (isFill) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onModeClick(event) {
  isFill = !isFill;
  if (isFill) {
    event.target.textContent = 'Fill';
  } else {
    event.target.textContent = 'Paint';
  }
}

function onClearClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onSaveClick() {
  const dataURL = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'YourWork';
  a.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onFillRect);
  window.addEventListener('mousedown', startPainting);
  window.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseenter', onMouseEnter);
  canvas.addEventListener('contextmenu', (event) => event.preventDefault());
}

if (color) {
  color.forEach((elem) => elem.addEventListener('click', onColorClick));
}

if (range) {
  range.addEventListener('change', onChange);
}

if (modeBtn) {
  modeBtn.addEventListener('click', onModeClick);
}

if (clearBtn) {
  clearBtn.addEventListener('click', onClearClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', onSaveClick);
}
