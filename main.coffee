module.exports = () =>

trTable =
  48: [0, "/", "first"]
  47: [0, "/afdb-load", "second"]

midi = require "midi"
zmq = require "zmq"

midi_port = 1

input = new midi.input()
console.log "Using port #{input.getPortName midi_port}"

# Initializing ZMQ connection
sock = zmq.socket('push')
sock.bind 'tcp://127.0.0.1:43000'

input.on "message", (deltaTime, message) ->
  [func, note, vel] = message
  if func == 153
    console.log "note: #{note} vel: #{vel}"
    if note of trTable
      missile = trTable[note]
      console.log("Sending (#{missile})")
      sock.send JSON.stringify missile
  return

input.openPort midi_port

input.ignoreTypes false, false, false
console.log 'Listening for MIDI messages. Press any key to exit'

process.stdin.setRawMode true
process.stdin.resume()
process.stdin.on 'data', () =>
  input.closePort()
  process.exit()
