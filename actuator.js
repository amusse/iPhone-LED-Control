var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');
var gpio = require('rpi-gpio');

// The state of the garage, defaults to off
// Possible states : on, off, turningOn, turningOff
var state = 'off';

// Physical pin number of LED
var pin   = 11;


// Connects to the server
client.on('connect', () => {  
  client.subscribe('LED/command');
  client.publish('LED/connected', 'true');
  sendStateUpdate();
});

// Upon getting a messge, turn LED on/off
client.on('message', (topic, message) => {  
  // console.log('received message %s %s', topic, message)
  if (topic == 'LED/command') {
      if (message == 'true') {
          turnLEDOn();
      }
      else {
          turnLEDOff();
      }
  }
});

// Report change in state back to server
function sendStateUpdate () {  
  //console.log('sending state %s', state)
  client.publish('LED/state', state);
}

// Turns LED on
function turnLEDOn () {  
  if (state !== 'on' && state !== 'turningOn') {
    state = 'turningOn';
    sendStateUpdate();

    gpio.setup(pin, gpio.DIR_OUT, on);
  }
}

// Turns LED off
function turnLEDOff () {  
  if (state !== 'closed' && state !== 'turningOff') {
    state = 'turningOff';
    sendStateUpdate();

    gpio.setup(pin, gpio.DIR_OUT, off);
  }
}

// Helper method to turn LED on
function on() {
    gpio.write(pin, 1, (err) => {
        console.log('LED is ON');
        state = 'on';
    });
}

// Helper method to turn LED off
function off() {
    gpio.write(pin, 0, (err) => {
        if (err) throw err;
        console.log('LED is OFF');
        state = 'off';
    });
}
