import Timeout from './Timeout.js';

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

      this.init();
   }

   hide(el: Element) {
      el.classList.remove('is--active');
   }

   show(index: number) {
      this.index = index;
      this.itemActive = this.elements[this.index];

      this.elements.forEach((el) => this.hide(el));
      this.itemActive.classList.add('is--active');

      this.auto(this.timeAction);
   }

   auto(time: number) {
      new Timeout(() => this.next(), time);
   }

   prev() {
      const prevItem =
         this.index > 0 ? this.index - 1 : this.elements.length - 1;
      this.show(prevItem);
   }

   next() {
      const nextItem =
         this.index + 1 < this.elements.length ? this.index + 1 : 0;
      this.show(nextItem);
   }

   private addControls() {
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');

      this.controls.appendChild(prevButton).innerText = 'Slider Anterior';
      this.controls.appendChild(nextButton).innerText = 'Proximo Slider';

      prevButton.addEventListener('pointerup', () => this.prev());
      nextButton.addEventListener('pointerup', () => this.next());
   }

   private init() {
      this.addControls();
      this.show(this.index);
   }
}
