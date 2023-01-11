export default class Timeout {
    id;
    handler;
    start;
    timeLeft;
    constructor(handler, time) {
        this.id = setTimeout(handler, time);
        this.handler = handler;
        this.start = Date.now();
        this.timeLeft = time;
    }
    clean() {
        clearTimeout(this.id);
    }
    pause() {
        const passed = Date.now() - this.start;
        this.timeLeft = this.timeLeft - passed;
        this.clean();
    }
    continue() {
        this.clean();
        this.id = setTimeout(this.handler, this.timeLeft);
        this.start = Date.now();
    }
}
//# sourceMappingURL=Timeout.js.map