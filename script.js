const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const algoSel = document.getElementById("algo");
const sizeSel = document.getElementById("size");
const speedSel = document.getElementById("range");
const detailsSize = document.querySelector(".details-size span");
const detailsAlgo = document.querySelector(".details-algo span");
const detailsSpeed = document.querySelector(".details-speed span");
const statusEl = document.querySelector(".details-status");
const bars = document.querySelector(".grid .left .bars");
const genBtn = document.getElementById("regenerator");

let running = false;
let ready = false;
let size = "none";
let algo = "none";
let speed = "20";
listBars = [];

const enableBtn = (btn) => {
  btn.disabled = false;
  btn.classList.remove("disabled");
};

const disableBtn = (btn) => {
  btn.disabled = true;
  btn.classList.add("disabled");
};

const updateStatus = (msg) => {
  statusEl.innerHTML = msg;
  if (ready) {
    statusEl.classList.add("ready");
  } else {
    statusEl.classList.remove("ready");
  }
};

const enableSelect = (el) => {
  el.disabled = false;
  el.style.cursor = "pointer";
};

const disableSelect = (el) => {
  el.disabled = true;
  el.style.cursor = "not-allowed";
};

const updateRange = (val) => {
  document.getElementById("range-value").innerHTML = val;
  document.querySelector(".grid .stats div:nth-child(3) span").innerHTML = val;
};

const checkParams = () => {
  if (size === "none" || algo === "none") {
    ready = false;
  } else {
    ready = true;
  }
  if (ready) {
    enableBtn(startBtn);
    updateStatus("READY!");
  } else {
    disableBtn(startBtn);
    updateStatus("NOT READY!");
  }
};

const sort = async () => {
  switch (algo) {
    case "Selection Sort":
      await selectionSort();
      break;
    case "Insertion Sort":
      await insertionSort();
      break;
    case "Bubble Sort":
      await bubbleSort();
      break;
    case "Merge Sort":
      await mergeSort();
      break;
    case "Quick Sort":
      await quickSort();
      break;
    default:
      console.log("ERROR");
  }
  done();
};

const start = () => {
  running = true;
  disableBtn(genBtn);
  disableBtn(startBtn);
  updateStatus("SORTING...");
  disableSelect(algoSel);
  disableSelect(sizeSel);
  sort();
};

const done = () => {
  running = false;
  disableBtn(startBtn);
  enableBtn(genBtn);
  updateStatus("DONE!");
  enableSelect(algoSel);
  enableSelect(sizeSel);
};

const reset = () => {
  bars.innerHTML = "";
  populate();
};

const updateDOM = (j, k) => {
  bars.children[j].style.height = `${listBars[j]}px`;
  bars.children[k].style.height = `${listBars[k]}px`;
};

const pause = async (val) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, val);
  });
};

const insertionSort = async () => {
  for (let i = 1; i < listBars.length; i++) {
    const key = listBars[i];
    let j = i - 1;
    while (j >= 0 && listBars[j] > key) {
      bars.children[j].classList.add("mark");
      bars.children[j + 1].classList.add("mark");
      listBars[j + 1] = listBars[j];
      listBars[j] = key;
      updateDOM(j, j + 1);
      await pause(1000 / parseInt(speed));
      bars.children[j].classList.remove("mark");
      bars.children[j + 1].classList.remove("mark");
      j--;
    }
  }
};

const bubbleSort = async () => {
  for (let i = listBars.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      bars.children[j].classList.add("mark");
      if (listBars[j] > listBars[j + 1]) {
        swap(j, j + 1);
        updateDOM(j, j + 1);
        await pause(1000 / parseInt(speed));
      }
      bars.children[j].classList.remove("mark");
    }
  }
};

const selectionSort = async () => {
  for (let i = 0; i < listBars.length; i++) {
    let minInd = i;
    bars.children[i].classList.add("mark");
    for (let j = i + 1; j < listBars.length; j++) {
      if (listBars[j] < listBars[minInd]) {
        minInd = j;
      }
    }
    bars.children[i].classList.remove("mark");
    swap(i, minInd);
    updateDOM(i, minInd);
    await pause(1000 / parseInt(speed));
  }
};

const merge = async (start, mid, end) => {
  temp = [];
  i = start;
  j = mid + 1;
  while (i <= mid && j <= end) {
    if (listBars[i] < listBars[j]) {
      temp.push(listBars[i]);
      i++;
    } else {
      temp.push(listBars[j]);
      j++;
    }
  }
  while (i <= mid) {
    temp.push(listBars[i]);
    i++;
  }
  while (j <= end) {
    temp.push(listBars[j]);
    j++;
  }
  console.log("temp", temp);
  listBars = [...temp];
};

const mergeHelper = async (start, end) => {
  console.log(start, end);
  if (end > start) {
    const mid = Math.floor((start + end) / 2);
    await mergeHelper(start, mid);
    await mergeHelper(mid + 1, end);
    console.log(`merging ${start} and ${end}`);
    await merge(start, mid, end);
  }
};

const mergeSort = async () => {
  console.log(listBars);
  await mergeHelper(0, listBars.length - 1);
  console.log(listBars);
};

const partition = async (start, end, keyInd) => {
  let i = start;
  let j = end;
  let key = listBars[keyInd];
  while (i < j) {
    while (i < keyInd) {
      if (listBars[i] < key) {
        i++;
      } else {
        swap(i, j);
        if (j === keyIndex) {
          keyIndex = i;
        }
        j--;
      }
    }
    while (j > keyInd) {
      if (listBars[j] > keyInd) {
        j--;
      } else {
        swap(i, j);
        if (i === keyInd) {
          keyInd = j;
        }
        i++;
      }
    }
  }
  return keyInd;
};

const quickHelper = async (start, end) => {
  if (end > start) {
    let p = start;
    p = partition(start, end, p);
    quickHelper(start, p - 1);
    quickHelper(p + 1, end);
  }
};

const quickSort = async () => {
  console.log(listBars);
  quickHelper(0, listBars.length - 1);
  console.log(listBars);
};

const swap = (j, k) => {
  const temp = listBars[j];
  listBars[j] = listBars[k];
  listBars[k] = temp;
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
  checkParams();
  bars.innerHTML = "";
  while (listBars.length > 0) {
    listBars.shift();
  }
  for (let i = 0; i < parseInt(val); i++) {
    listBars.push(Math.floor(Math.random() * 500));
  }
  populate();
};

const resetBars = () => {
  document.querySelector(".grid .left").classList.add("not-selected");
  genBtn.style.display = "none";
};

const changeSize = () => {
  size = sizeSel.value;
  detailsSize.innerHTML = size === "none" ? "Not Selected" : size;
  if (size !== "none") {
    document.querySelector(".grid .left").classList.remove("not-selected");
    generateBars(size);
    genBtn.style.display = "block";
  } else {
    resetBars();
  }
  checkParams();
};
const changeAlgo = () => {
  algo = algoSel.value;
  detailsAlgo.innerHTML = algo === "none" ? "Not Selected" : algo;
  checkParams();
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
