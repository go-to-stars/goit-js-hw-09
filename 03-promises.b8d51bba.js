!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},u={},a=e.parcelRequire7bc7;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in u){var a=u[e];delete u[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){u[e]=t},e.parcelRequire7bc7=a);var o=a("h6c0i");const n={formData:document.querySelector(".form"),delayInputValue:document.querySelector('[name="delay"]'),stepInputValue:document.querySelector('[name="step"]'),amountInputValue:document.querySelector('[name="amount"]')};function r(e,t){return new Promise(((u,a)=>{setTimeout((()=>{Math.random()>.3?u({position:e,delay:t}):a({position:e,delay:t})}),t)}))}n.formData.addEventListener("submit",(e=>{if(e.preventDefault(),n.delayInputValue.value<0)return void o.Notify.failure('The value of "First delay (ms)" must be greater than or equal to 0');if(n.stepInputValue.value<0)return void o.Notify.failure('The value of "Delay step (ms)" must be greater than or equal to 0');if(n.amountInputValue.value<=0)return void o.Notify.failure('The value of "Amount" must be greater than 0');let t=0,u=Number(n.delayInputValue.value);for(let e=0;e<n.amountInputValue.value;e++)t=e+1,r(t,u).then((({position:e,delay:t})=>{o.Notify.success(`Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{o.Notify.failure(`Rejected promise ${e} in ${t}ms`)})),u+=Number(n.stepInputValue.value);n.formData.reset()}))}();
//# sourceMappingURL=03-promises.b8d51bba.js.map
