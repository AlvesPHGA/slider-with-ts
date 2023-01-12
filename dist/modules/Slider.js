import Timeout from './Timeout.js';
export default class Slider {
    container;
    elements;
    controls;
    timeAction;
    index;
    itemActive;
    timeout;
    paused;
    startTimeout;
    pausedTimeout;
    thumbItems;
    thumbActive;
    constructor(container, elements, controls, timeAction = 5000) {
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
        this.thumbItems = null;
        this.thumbActive = null;
        this.init();
    }
    hide(el) {
        el.classList.remove('is--active');
        if (el instanceof HTMLVideoElement) {
            el.currentTime = 0;
            el.pause();
        }
    }
    show(index) {
        this.index = index;
        this.itemActive = this.elements[this.index];
        localStorage.setItem('itemActive', String(this.index));
        if (this.thumbItems) {
            this.thumbActive = this.thumbItems[this.index];
            this.thumbItems.forEach((item) => item.classList.remove('is--active__thumb'));
            this.thumbActive.classList.add('is--active__thumb');
        }
        this.elements.forEach((el) => this.hide(el));
        this.itemActive.classList.add('is--active');
        if (this.itemActive instanceof HTMLVideoElement) {
            this.autoVideo(this.itemActive);
        }
        else {
            this.auto(this.timeAction);
        }
    }
    autoVideo(video) {
        video.muted = true;
        video.play();
        let firstPlay = true;
        video.addEventListener('playing', () => {
            if (firstPlay)
                this.auto(video.duration * 1000);
            firstPlay = false;
        });
    }
    auto(time) {
        this.timeout?.clean();
        this.timeout = new Timeout(() => this.next(), time);
        if (this.thumbActive)
            this.thumbActive.style.animationDuration = `${time}ms`;
    }
    prev() {
        const prevItem = this.index > 0 ? this.index - 1 : this.elements.length - 1;
        this.show(prevItem);
    }
    next() {
        if (this.paused)
            return;
        const nextItem = this.index + 1 < this.elements.length ? this.index + 1 : 0;
        this.show(nextItem);
    }
    pause() {
        document.body.classList.add('is--paused__in__body');
        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
            this.thumbActive?.classList.add('is--paused__thumb');
            if (this.itemActive instanceof HTMLVideoElement)
                this.itemActive.pause();
        }, 300);
    }
    continue() {
        document.body.classList.remove('is--paused__in__body');
        this.pausedTimeout?.clean();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
            this.thumbActive?.classList.remove('is--paused__thumb');
            if (this.itemActive instanceof HTMLVideoElement)
                this.itemActive.play();
        }
    }
    addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        this.controls.addEventListener('pointerdown', () => this.pause());
        document.addEventListener('touchend', () => this.continue());
        document.addEventListener('pointerup', () => this.continue());
        prevButton.addEventListener('pointerup', () => this.prev());
        nextButton.addEventListener('pointerup', () => this.next());
    }
    addThumbItems() {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumb';
        for (let i = 0; i < this.elements.length; i++) {
            thumbContainer.innerHTML += `<span><span class="thumb__item"></span></span>`;
        }
        this.controls.appendChild(thumbContainer);
        this.thumbItems = Array.from(document.querySelectorAll('.thumb__item'));
    }
    init() {
        this.addControls();
        this.addThumbItems();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slider.js.map