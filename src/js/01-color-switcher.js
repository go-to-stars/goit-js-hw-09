const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  bodyElement: document.querySelector('body'),
}; // посилання

let timerId = null; // створення пустої змінної "timerId"

refs.buttonStart.disabled = false; // початковий стан кнопки "Start" - активна
refs.buttonStop.disabled = true; // початковий стан кнопки "Stop" - не активна

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
} // функція генерування випадкового кольору

refs.buttonStart.addEventListener('click', () => {
  refs.bodyElement.style.backgroundColor = getRandomHexColor(); // одноразова інлайн зміна кольору фону елемента "body"
  timerId = setInterval(() => {
    refs.bodyElement.style.backgroundColor = getRandomHexColor(); // інлайн зміна кольору фону елемента "body"
  }, 1000); // запуск виконання функції зміни кольору фону елемента "body" через кожні 1000 мс

  refs.buttonStart.disabled = true; // зміна стану кнопки "Start" на - не активна
  refs.buttonStop.disabled = false; // зміна стану кнопки "Stop" на - активна
}); // створення прослуховування події "click" кнопки "Start"

refs.buttonStop.addEventListener('click', () => {
  clearInterval(timerId);

  refs.buttonStart.disabled = false; // зміна стану кнопки "Start" на - активна
  refs.buttonStop.disabled = true; // зміна стану кнопки "Stop" на - не активна
}); // створення прослуховування події "click" кнопки "Stop"
