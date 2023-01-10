export default class Timeout {
    id;
    handler;
    constructor(handler, id) {
        this.id = setTimeout(handler, id);
        this.handler = handler;
    }
}
//# sourceMappingURL=Timeout.js.map