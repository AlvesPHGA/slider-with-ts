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
        this.show(this.index);
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
}
//# sourceMappingURL=Slider.js.map