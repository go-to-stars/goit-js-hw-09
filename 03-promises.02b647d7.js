var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},u={},a=e.parcelRequire7bc7;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in u){var a=u[e];delete u[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){u[e]=t},e.parcelRequire7bc7=a);var o=a("iQIUW");const r={formData:document.querySelector(".form"),delayInputValue:document.querySelector('[name="delay"]'),stepInputValue:document.querySelector('[name="step"]'),amountInputValue:document.querySelector('[name="amount"]')};function n(e,t){return new Promise(((u,a)=>{setTimeout((()=>{Math.random()>.3?u({position:e,delay:t}):a({position:e,delay:t})}),t)}))}r.formData.addEventListener("submit",(e=>{if(e.preventDefault(),r.delayInputValue.value<0)return void o.Notify.failure('The value of "First delay (ms)" must be greater than or equal to 0');if(r.stepInputValue.value<0)return void o.Notify.failure('The value of "Delay step (ms)" must be greater than or equal to 0');if(r.amountInputValue.value<=0)return void o.Notify.failure('The value of "Amount" must be greater than 0');let t=0,u=Number(r.delayInputValue.value);for(let e=0;e<r.amountInputValue.value;e++)t=e+1,n(t,u).then((({position:e,delay:t})=>{o.Notify.success(`Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{o.Notify.failure(`Rejected promise ${e} in ${t}ms`)})),u+=Number(r.stepInputValue.value);r.formData.reset()}));
//# sourceMappingURL=03-promises.02b647d7.js.map