export default class Slider {
    container;
    elements;
    controls;
    timeAction;
    index;
    itemActive;
    constructor(container, elements, controls, timeAction = 5000) {
        this.container = container;
        this.elements = elements;
        this.controls = controls;
        this.timeAction = timeAction;
        this.index = 1;
        this.itemActive = this.elements[this.index];
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
    }
    prev() {
        const prevItem = this.index > 0 ? this.index - 1 : this.elements.length - 1;
        this.show(prevItem);
    }
    next() {
        const nextItem = this.index + 1 < this.elements.length ? this.index + 1 : 0;
        this.show(nextItem);
    }
    addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        this.controls.appendChild(prevButton).innerText = 'Slider Anterior';
        this.controls.appendChild(nextButton).innerText = 'Proximo Slider';
        prevButton.addEventListener('pointerup', () => this.prev());
        nextButton.addEventListener('pointerup', () => this.next());
    }
    init() {
        this.addControls();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slider.js.map