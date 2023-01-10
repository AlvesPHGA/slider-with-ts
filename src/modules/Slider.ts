export default class Slider {
   container;
   elements;
   controls;
   timeAction;
   index: number;
   itemActive: Element;

   constructor(
      container: Element,
      elements: Element[],
      controls: Element,
      timeAction: number = 5000,
   ) {
      this.container = container;
      this.elements = elements;
      this.controls = controls;
      this.timeAction = timeAction;

      this.index = 1;
      this.itemActive = this.elements[this.index];

      this.show(this.index);
   }

   hide(el: Element) {
      el.classList.remove('is--active');
   }

   show(index: number) {
      this.index = index;
      this.itemActive = this.elements[this.index];

      this.elements.forEach((el) => this.hide(el));
      this.itemActive.classList.add('is--active');
   }
}
