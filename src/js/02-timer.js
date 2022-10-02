import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import timeConverter from './converMStoTime';

let chsnTime = 0;

const myInput = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startTimerBtnRef.disabled = true;
      return;
    }
    startTimerBtnRef.disabled = false;
    chsnTime = selectedDates[0].getTime();
  },
};

const fp = flatpickr(myInput, options); // flatpickr

const startTimerBtnRef = document.querySelector('button[data-start]');
const timerDaysRef = document.querySelector('span[data-days]');
const timerHoursRef = document.querySelector('span[data-Hours]');
const timerMinsRef = document.querySelector('span[data-minutes]');
const timerSecsRef = document.querySelector('span[data-seconds]');

startTimerBtnRef.disabled = true;

function addLeadingZero(value) {
  const a = value.toString();
  return a.padStart(2, '0');
}

startTimerBtnRef.addEventListener('click', backTimer);

function backTimer() {
  Notiflix.Notify.success('Timer started');
  startTimerBtnRef.disabled = true;

  const intervalID = setInterval(() => {
    let timeLeft = (Date.now() - chsnTime) * -1;
    // console.log(timeLeft);
    if (timeLeft < 0) {
      clearInterval(intervalID);
      return;
    }
    chageTimeInHTML(timeLeft);
  }, 1000);
}

function chageTimeInHTML(timeLeft) {
  //   console.log(({ days, hours, minutes, seconds } = timeConverter(timeLeft)));
  ({ days, hours, minutes, seconds } = timeConverter(timeLeft));

  timerDaysRef.textContent = addLeadingZero(days);
  timerHoursRef.textContent = addLeadingZero(hours);
  timerMinsRef.textContent = addLeadingZero(minutes);
  timerSecsRef.textContent = addLeadingZero(seconds);
}
