(function() {
  var input, midi, trTable, zmq;

  module.exports = (function(_this) {
    return function() {};
  })(this);

  trTable = {
    48: [0, "/my/first/url", "first"],
    49: [0, "/my/second/url", "second"]
  };

  midi = require("midi");

  zmq = require("zmq");

  input = new midi.input();

  console.log("Using port " + (input.getPortName(0)));

  input.on("message", function(deltaTime, message) {
    var func, missile, note, vel;
    func = message[0], note = message[1], vel = message[2];
    if (func === 153) {
      console.log("note: " + note + " vel: " + vel);
      if (note in trTable) {
        missile = trTable[note];
        console.log(missile);
      }
    }
  });

  input.openPort(0);

  input.ignoreTypes(false, false, false);

  console.log('Listening for MIDI messages. Press any key to exit');

  process.stdin.setRawMode(true);

  process.stdin.resume();

  process.stdin.on('data', (function(_this) {
    return function() {
      input.closePort();
      return process.exit();
    };
  })(this));

}).call(this);
