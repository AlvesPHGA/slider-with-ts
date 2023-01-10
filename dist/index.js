import Slider from './modules/Slider.js';
const container = document.querySelector('.slider');
const elements = document.querySelector('.slider__contents');
const controls = document.querySelector('.slider__controls');
if (container && elements && controls && elements.children.length) {
    new Slider(container, Array.from(elements.children), controls, 3000);
}
//# sourceMappingURL=index.js.map