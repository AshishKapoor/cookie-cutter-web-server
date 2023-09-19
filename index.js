const logEvents = require("./logEvents");

const EventEmitter = require("events");

class Emitter extends EventEmitter {}

// initialize object
const myEmitter = new Emitter();

// add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  //Emit Event
  myEmitter.emit("log", "Log Event Emitted");
}, 2000);
