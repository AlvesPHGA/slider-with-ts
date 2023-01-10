export default class Timeout {
    id;
    handler;
    constructor(handler, id) {
        this.id = setTimeout(handler, id);
        this.handler = handler;
    }
    clean() {
        clearTimeout(this.id);
    }
}
//# sourceMappingURL=Timeout.js.map