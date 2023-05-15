// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

document
  .querySelector('[data-start]')
  .insertAdjacentHTML(
    'afterend',
    '<button type="button" data-stop style="margin-left: 4px;">Stop</button>'
  ); // додати кнопку "Stop" в DOM за одну операцію

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  endDays: document.querySelector('[data-days]'),
  endHours: document.querySelector('[data-hours]'),
  endMinutes: document.querySelector('[data-minutes]'),
  endSeconds: document.querySelector('[data-seconds]'),
  boxTimer: document.querySelector('.timer'),
  boxField: document.querySelectorAll('.field'),
  spanValue: document.querySelectorAll('.value'),
  spanLabel: document.querySelectorAll('.label'),  
}; // посилання

refs.datetimePicker.disabled = false; // початковий стан поля вибору кінцевої дати - активне
refs.buttonStart.disabled = true; // початковий стан кнопки "Start" - не активна
refs.buttonStop.disabled = true; // початковий стан кнопки "Stop" - не активна

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerId = null; // створення пустої змінної "timerId"
let selectedTimerValue; // створення змінної "selectedTimerValue" (дата та час вибрані користувачем)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    } // якщо вибрана дата менше поточної, виводиться попереджувальне повідомлення про це

    refs.buttonStart.disabled = false; // зміна стану кнопки "Start" на - активна

    selectedTimerValue = selectedDates[0].getTime(); // присвоєння змінній "selectedTimerValue" значення першого елемента масиву дат бібліотеки "flatpickr"
  },
};

flatpickr('#datetime-picker', options); // бібліотека "flatpickr"

refs.buttonStart.addEventListener('click', () => {
  if (selectedTimerValue < Date.now()) {
    Notify.failure('Please choose a date in the future');
    return;
  } // якщо вибрана дата менше поточної, виводиться попереджувальне повідомлення про це

  if (timerId) {
    clearInterval(timerId);
  } // обнулення таймера, якщо він раніше був запущений

  refs.datetimePicker.disabled = true; // зміна стану поля вибору кінцевої дати на - не активне
  refs.buttonStart.disabled = true; // зміна стану кнопки "Start" на - не активна
  refs.buttonStop.disabled = false; // зміна стану кнопки "Stop" на - активна

  const countdownTimerValueStart = convertMs(selectedTimerValue - Date.now());

  refs.endDays.textContent = addLeadingZero(countdownTimerValueStart.days);
  refs.endHours.textContent = addLeadingZero(countdownTimerValueStart.hours);
  refs.endMinutes.textContent = addLeadingZero(countdownTimerValueStart.minutes);
  refs.endSeconds.textContent = addLeadingZero(countdownTimerValueStart.seconds);

  timerId = setInterval(() => {
    if (selectedTimerValue - Date.now() < 1000) {
      clearInterval(timerId);
      refs.endSeconds.textContent = '00'; // обнулення лічильника секунд при зупинці
      refs.datetimePicker.disabled = false; // зміна стану поля вибору кінцевої дати на - активне
      refs.buttonStart.disabled = true; // зміна стану кнопки "Start" на - не активна
      refs.buttonStop.disabled = true; // зміна стану кнопки "Stop" на - не активна

      Notify.info('Time is up!'); // повідомлення про закінчення відліку часу
    } // якщо значення таймеру менше 1 сек, то обнулити таймер інтервалу, розблокувати вибір дати та вивести повідомлення

    const countdownTimerValue = convertMs(selectedTimerValue - Date.now());

    refs.endDays.textContent = addLeadingZero(countdownTimerValue.days);
    refs.endHours.textContent = addLeadingZero(countdownTimerValue.hours);
    refs.endMinutes.textContent = addLeadingZero(countdownTimerValue.minutes);
    refs.endSeconds.textContent = addLeadingZero(countdownTimerValue.seconds);
  }, 1000); // таймер запуску функції {...} через кожні 1000 мс
});

refs.buttonStop.addEventListener('click', () => {
  clearInterval(timerId);

  refs.endDays.textContent = '00'; // обнулення лічильника днів при примусовій зупинці
  refs.endHours.textContent = '00'; // обнулення лічильника годин при примусовій зупинці
  refs.endMinutes.textContent = '00'; // обнулення лічильника хвилин при примусовій зупинці
  refs.endSeconds.textContent = '00'; // обнулення лічильника секунд при примусовій зупинці

  refs.datetimePicker.disabled = false; // зміна стану поля вибору кінцевої дати на - активне
  refs.buttonStart.disabled = true; // зміна стану кнопки "Start" на - не активна
  refs.buttonStop.disabled = true; // зміна стану кнопки "Stop" на - не активна
}); // створення прослуховування події "click" кнопки "Stop"

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
} // функція додавання 0, якщо в числі менше двох символів

// мінімальне оформлення елементів інтерфейсу
refs.boxTimer.style.display = 'flex';
refs.boxTimer.style.gap = '10px';
refs.boxTimer.style.marginTop = '16px';

refs.boxField.forEach(value => {
  value.style.display = 'flex';
  value.style.flexDirection = 'column';
});

refs.spanValue.forEach(value => {
  value.style.minWidth = '60px';
  value.style.textAlign = 'center';
  value.style.fontSize = '36px';
});

refs.spanLabel.forEach(value => {
  value.style.textAlign = 'center';
  value.style.textTransform = 'uppercase';
  value.style.fontSize = '10px';
});
