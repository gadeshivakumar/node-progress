const fs = require('fs');

fs.readFile(__filename, () => {
  console.log("I/O callback (POLL phase)");
});

setTimeout(() => console.log("timer"), 0);
setImmediate(() => console.log("immediate"));

console.log("top-level");
