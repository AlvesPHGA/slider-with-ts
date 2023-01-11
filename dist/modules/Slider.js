import Timeout from './Timeout.js';
export default class Slider {
    container;
    elements;
    controls;
    timeAction;
    index;
    itemActive;
    timeout;
    pause;
    pausedTimeout;
    constructor(container, elements, controls, timeAction = 5000) {
        this.container = container;
        this.elements = elements;
        this.controls = controls;
        this.timeAction = timeAction;
        this.index = 1;
        this.itemActive = this.elements[this.index];
        this.timeout = null;
        this.pause = false;
        this.pausedTimeout = null;
        this.init();
    }
    hide(el) {
        el.classList.remove('is--active');
    }
    show(index) {
        this.index = index;
        this.itemActive = this.elements[this.index];
        this.elements.forEach((el) => this.hide(el));
        this.itemActive.classList.add('is--active');
        this.auto(this.timeAction);
    }
    auto(time) {
        this.timeout?.clean();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        const prevItem = this.index > 0 ? this.index - 1 : this.elements.length - 1;
        this.show(prevItem);
    }
    next() {
        if (this.pause)
            return;
        const nextItem = this.index + 1 < this.elements.length ? this.index + 1 : 0;
        this.show(nextItem);
    }
    paused() {
        console.log('paused');
        this.pausedTimeout = new Timeout(() => {
            this.pause = true;
        }, 300);
    }
    continue() {
        console.log('continue');
        this.pausedTimeout?.clean();
        if (this.pause) {
            this.pause = false;
            this.auto(this.timeAction);
        }
    }
    addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.addEventListener('pointerdown', () => this.paused());
        this.controls.addEventListener('pointerup', () => this.continue());
        prevButton.addEventListener('pointerup', () => this.prev());
        nextButton.addEventListener('pointerup', () => this.next());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slider.js.map