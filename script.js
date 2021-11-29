const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const algoSel = document.getElementById("algo");
const sizeSel = document.getElementById("size");
const speedSel = document.getElementById("range");
const detailsSize = document.querySelector(".details-size span");
const detailsAlgo = document.querySelector(".details-algo span");
const detailsSpeed = document.querySelector(".details-speed span");
const status = document.querySelector(".details-status span");
const bars = document.querySelector(".grid .left .bars");
const genBtn = document.getElementById("regenerator");

let running = false;
let ready = false;
let size = "";
let algo = "";
let speed = "";
listBars = [];

// if (!ready) {
//   startBtn.title = "Please set the parameters!";
// }

const updateRange = (val) => {
  document.getElementById("range-value").innerHTML = val;
  document.querySelector(".grid .stats div:nth-child(3) span").innerHTML = val;
};

const checkParams = () => {};

const start = () => {
  checkParams();
  startBtn.disabled = true;
  startBtn.classList.add("disabled");
};

const reset = () => {
  startBtn.disabled = false;
  startBtn.classList.remove("disabled");
};

const populate = () => {
  for (let i = 0; i < listBars.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${listBars[i]}px`;
    bars.appendChild(bar);
  }
};

const generateBars = (val) => {
  bars.innerHTML = "";
  while (listBars.length > 0) {
    listBars.shift();
  }
  for (let i = 0; i < parseInt(val); i++) {
    listBars.push(Math.floor(Math.random() * 500));
  }
  populate();
};

const changeSize = () => {
  size = sizeSel.value;
  detailsSize.innerHTML = size === "none" ? "Not Selected" : size;
  if (size !== "none") {
    document.querySelector(".grid .left").classList.remove("not-selected");
    generateBars(size);
    genBtn.style.display = "block";
  } else {
    document.querySelector(".grid .left").classList.add("not-selected");
    genBtn.style.display = "none";
  }
};
const changeAlgo = () => {
  algo = algoSel.value;
  detailsAlgo.innerHTML = algo === "none" ? "Not Selected" : algo;
};

const changeSpeed = () => {
  speed = speedSel.value;
  detailsSpeed.innerHTML = speed;
};

resetBtn.addEventListener("click", reset);
startBtn.addEventListener("click", start);
sizeSel.addEventListener("change", changeSize);
algoSel.addEventListener("change", changeAlgo);
speedSel.addEventListener("change", changeSpeed);
genBtn.addEventListener("click", () => generateBars(size));
