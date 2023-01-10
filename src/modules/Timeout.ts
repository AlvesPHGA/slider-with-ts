export default class Timeout {
   id;
   handler;
   constructor(handler: TimerHandler, id: number) {
      this.id = setTimeout(handler, id);
      this.handler = handler;
   }
}
