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
let speed = "1";
listBars = [];

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
    statusEl.classList.add("ready");
    startBtn.disabled = false;
    startBtn.classList.remove("disabled");
    statusEl.innerHTML = "READY!";
  } else {
    statusEl.classList.remove("ready");
    startBtn.disabled = true;
    startBtn.classList.add("disabled");
    statusEl.innerHTML = "NOT READY!";
  }
};

const start = () => {
  running = true;
  genBtn.disabled = true;
  genBtn.classList.add("disabled");
  startBtn.disabled = true;
  startBtn.classList.add("disabled");
  statusEl.innerHTML = "SORTING...";
  algoSel.disabled = true;
  sizeSel.disabled = true;
  algoSel.style.cursor = "not-allowed";
  sizeSel.style.cursor = "not-allowed";

  switch (algo) {
    case "Selection Sort":
      selectionSort();
      break;
    case "Insertion Sort":
      insertionSort();
      break;
    case "Bubble Sort":
      bubbleSort();
      break;
    case "Merge Sort":
      mergeSort();
      break;
    case "Quick Sort":
      quickSort();
      break;
    default:
      console.log("ERROR");
  }
};

const done = () => {
  startBtn.disabled = true;
  startBtn.classList.add("disabled");
  genBtn.classList.remove("disabled");
  genBtn.disabled = false;
  statusEl.innerHTML = "DONE!";
  running = false;
  algoSel.disabled = false;
  sizeSel.disabled = false;
  algoSel.style.cursor = "pointer";
  sizeSel.style.cursor = "pointer";
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
  done();
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
  done();
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
  done();
};

const mergeHelper = async (start, end) => {
  if (end > start) {
    const mid = Math.floor((end + start) / 2);
    mergeHelper(start, mid);
    mergeHelper(mid + 1, end);

    let i = start;
    let j = mid + 1;
    result = [];

    while (i <= mid && j <= end) {
      if (listBars[i] < listBars[j]) {
        result.push(listBars[i++]);
        updateDOM(i - 1, j);
      } else {
        result.push(listBars[j++]);
        updateDOM(i, j - 1);
      }
      await pause(1000 / parseInt(speed));
    }
    while (i <= mid) {
      result.push(listBars[i++]);
      await pause(1000 / parseInt(speed));
    }
    while (j <= end) {
      result.push(listBars[j++]);
      await pause();
    }
    for (let i = start; i <= end; i++) {
      listBars[i] = result[i - start];
    }
  }
};

const mergeSort = () => {
  console.log(listBars);
  mergeHelper(0, listBars.length - 1);
  console.log(listBars);
};

const partition = (start, end, keyInd) => {
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

const quickHelper = (start, end) => {
  if (end > start) {
    let p = start;
    p = partition(start, end, p);
    quickHelper(start, p - 1);
    quickHelper(p + 1, end);
  }
};

const quickSort = () => {
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
