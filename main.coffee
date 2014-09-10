module.exports = () =>

trTable =
  48: [0, "/my/first/url", "first"]
  49: [0, "/my/second/url", "second"]

midi = require "midi"
zmq = require "zmq"

# Set up a new input.
input = new midi.input()

# Get the name of a specified input port.
console.log "Using port #{input.getPortName 0}"

# Initializing ZMQ connection
sock = zmq.socket('push')
sock.bind 'tcp://127.0.0.1:43000'

# Configure a callback.
input.on "message", (deltaTime, message) ->
  [func, note, vel] = message
  if func == 153
    console.log "note: #{note} vel: #{vel}"
    if note of trTable
      missile = trTable[note]
      console.log("Sending (#{missile})")
      sock.send JSON.stringify missile
  return


# Open the first available input port.
input.openPort 0

# Sysex, timing, and active sensing messages are ignored
# by default. To enable these message types, pass false for
# the appropriate type in the function below.
# Order: (Sysex, Timing, Active Sensing)
input.ignoreTypes false, false, false

# ... receive MIDI messages ...
console.log 'Listening for MIDI messages. Press any key to exit'

process.stdin.setRawMode true
process.stdin.resume()
process.stdin.on 'data', () =>
  # Close the port when done.
  input.closePort()
  process.exit()
