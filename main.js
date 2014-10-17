(function() {
  var input, midi, midi_port, sock, trTable, zmq;

  module.exports = (function(_this) {
    return function() {};
  })(this);

  trTable = {
    48: [0, "/", "tom1"],
    45: [0, "/afdb-load", "tom2"],
    43: [0, "/", "floor_tom"],
    38: [0, "/afdb-load", "main"],
    46: [0, "/", "hat"],
    42: [0, "/afdb-load", "hat_closed"],
    44: [0, "/afdb-load", "hat_pedal"],
    54: [0, "/", "crash"],
    55: [0, "/", "crash_edge"],
    51: [0, "/", "ride"],
    53: [0, "/", "ride_edge"],
    36: [0, "/afdb-load", "bass"]
  };

  midi = require("midi");

  zmq = require("zmq");

  midi_port = 0;

  input = new midi.input();

  console.log("Using port " + (input.getPortName(midi_port)));

  sock = zmq.socket('push');

  sock.bind('tcp://127.0.0.1:43000');

  input.on("message", function(deltaTime, message) {
    var func, missile, note, vel;
    func = message[0], note = message[1], vel = message[2];
    if (func === 153) {
      console.log("note: " + note + " vel: " + vel);
      if (note in trTable) {
        missile = trTable[note];
        console.log("Sending (" + missile + ")");
        sock.send(JSON.stringify(missile));
      }
    }
  });

  input.openPort(midi_port);

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
