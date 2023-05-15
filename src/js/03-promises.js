import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formData: document.querySelector('.form'),
  delayInputValue: document.querySelector('[name="delay"]'),
  stepInputValue: document.querySelector('[name="step"]'),
  amountInputValue: document.querySelector('[name="amount"]'),
};

let timerTimeoutId = null; // створення пустої змінної "timerTimeoutId"
let timerIntervalId = null; // створення пустої змінної "timerIntervalId"

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay }); // коли обіцянку виконано
    } else {
      reject({ position, delay }); // коли обіцянку відхилено
    }
  });
} // функція createPromise повертає об'єкт "проміс"

refs.formData.addEventListener('submit', e => {
  e.preventDefault(); // блокування дій за "замовчуванням" у браузері

  if (refs.delayInputValue.value < 0) {
    Notify.failure(
      `The value of "First delay (ms)" must be greater than or equal to 0`
    );
    return;
  } // якщо значення поля "First delay (ms)" меньше 0, то перериваєм цю ітерацію прослуховування події "submit"

  if (refs.stepInputValue.value < 0) {
    Notify.failure(
      `The value of "Delay step (ms)" must be greater than or equal to 0`
    );
    return;
  } // якщо значення поля "Delay step (ms)" меньше 0, то перериваєм цю ітерацію прослуховування події "submit"

  if (refs.amountInputValue.value <= 0) {
    Notify.failure(`The value of "Amount" must be greater than 0`);
    return;
  } // якщо значення поля "Amount" меньше або дорівнює 0, то перериваєм цю ітерацію прослуховування події "submit"

  if (timerTimeoutId) {
    clearInterval(timerTimeoutId);
  } // обнулення таймера, якщо він раніше був запущений
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
  } // обнулення таймера, якщо він раніше був запущений

  timerTimeoutId = setTimeout(() => {
    let i = 1; // ініціалізація лічильника
    let totalDelay = Number(refs.delayInputValue.value); // ініціалізація "delay"

    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        // console.log(`✔️ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      }) // метод then()екземпляру Promise негайно повертає еквівалентний Promise об’єкт, коли обіцянку виконано
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      }); // метод catch() екземпляру Promise негайно повертає еквівалентний Promise об’єкт, коли обіцянку відхилено

    timerIntervalId = setInterval(() => {
      if (i < refs.amountInputValue.value) {
        i += 1;
        totalDelay += Number(refs.stepInputValue.value);

        createPromise(i, totalDelay)
          .then(({ position, delay }) => {
            // console.log(`✔️ Fulfilled promise ${position} in ${delay}ms`);
            Notify.success(`Fulfilled promise ${position} in ${delay}ms`); // метод then()екземпляру Promise негайно повертає еквівалентний Promise об’єкт, коли обіцянку виконано
          })
          .catch(({ position, delay }) => {
            // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
            Notify.failure(`Rejected promise ${position} in ${delay}ms`); // метод catch() екземпляру Promise негайно повертає еквівалентний Promise об’єкт, коли обіцянку відхилено
          });
      } else {
        clearInterval(timerIntervalId);
        refs.formData.reset();
      } // якщо, лічильник менше заданого "amount" створюємо Promise, інакше обнулюємо таймер інтервалу очищаємо форму
    }, refs.stepInputValue.value); // таймер інтервалу
  }, refs.delayInputValue.value); // таймер таймауту
});
