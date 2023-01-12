import Timeout from './Timeout.js';

export default class Slider {
   container;
   elements;
   controls;
   timeAction;

   index: number;
   itemActive: Element;
   timeout: Timeout | null;
   paused: boolean;
   startTimeout: Timeout | null;
   pausedTimeout: Timeout | null;

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

      this.index = localStorage.getItem('itemActive')
         ? Number(localStorage.getItem('itemActive'))
         : 0;
      this.itemActive = this.elements[this.index];

      this.timeout = null;
      this.paused = false;

      this.startTimeout = null;
      this.pausedTimeout = null;

      this.init();
   }

   hide(el: Element) {
      el.classList.remove('is--active');

      if (el instanceof HTMLVideoElement) {
         el.currentTime = 0;
         el.pause();
      }
   }

   show(index: number) {
      this.index = index;
      this.itemActive = this.elements[this.index];

      localStorage.setItem('itemActive', String(this.index));

      this.elements.forEach((el) => this.hide(el));
      this.itemActive.classList.add('is--active');

      if (this.itemActive instanceof HTMLVideoElement) {
         this.autoVideo(this.itemActive);
      } else {
         this.auto(this.timeAction);
      }
   }

   autoVideo(video: HTMLVideoElement) {
      video.muted = true;
      video.play();

      let firstPlay = true;

      video.addEventListener('playing', () => {
         if (firstPlay) this.auto(video.duration * 1000);
         firstPlay = false;
      });
   }

   auto(time: number) {
      this.timeout?.clean();
      this.timeout = new Timeout(() => this.next(), time);
   }

   prev() {
      const prevItem =
         this.index > 0 ? this.index - 1 : this.elements.length - 1;
      this.show(prevItem);
   }

   next() {
      if (this.paused) return;

      const nextItem =
         this.index + 1 < this.elements.length ? this.index + 1 : 0;
      this.show(nextItem);
   }

   pause() {
      this.pausedTimeout = new Timeout(() => {
         this.timeout?.pause();
         this.paused = true;

         if (this.itemActive instanceof HTMLVideoElement)
            this.itemActive.pause();
      }, 300);
   }

   continue() {
      this.pausedTimeout?.clean();

      if (this.paused) {
         this.paused = false;
         this.timeout?.continue();

         if (this.itemActive instanceof HTMLVideoElement)
            this.itemActive.play();
      }
   }

   private addControls() {
      const prevButton = document.createElement('button');
      const nextButton = document.createElement('button');

      this.controls.appendChild(prevButton);
      this.controls.appendChild(nextButton);

      this.controls.addEventListener('pointerdown', () => this.pause());
      this.controls.addEventListener('pointerup', () => this.continue());

      prevButton.addEventListener('pointerup', () => this.prev());
      nextButton.addEventListener('pointerup', () => this.next());
   }

   private init() {
      this.addControls();
      this.show(this.index);
   }
}
