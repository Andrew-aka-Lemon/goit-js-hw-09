import getRandomHexColor from './getRandomHexColor';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

let inLoop = false;
let timeOutID = null;

function onStartClick(event) {
  console.log(event);
  if (inLoop) {
    return;
  }
  inLoop = true;
  changeColorWithDelay();
}

function changeColorWithDelay() {
  refs.body.style.backgroundColor = getRandomHexColor();

  if (inLoop) {
    timeOutID = setTimeout(changeColorWithDelay, 1000);
  }
}

function onStopClick(event) {
  console.log(event);
  inLoop = false;
  clearTimeout(timeOutID);
}
