var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ledState = '';
var connected = false;

// Turn http server on
http.listen(8080, function () {
	console.log('listening on *:8080')
});

// Connect to socket to communicate with iPhone
io.on('connect', function(socket){
    // Upon getting signal from iPhone
    socket.on('sig', function(msg){
//        console.log(msg);
        if (msg == 'true') {
            console.log('Turn LED on');
            turnLEDOn();
        }
        else {
            console.log('Turn LED off');
            turnLEDOff();
        }
    });
});

// Listen to whether the LED is connected
client.on('connect', () => {
    client.subscribe('LED/connected');
    //console.log('controller listening to connection...');
    client.subscribe('LED/state');
    //console.log('controller listening to state...');
});

// Upon getting a message...
client.on('message', (topic, message) => {
    switch (topic) {
        case 'LED/connected':
            return handleLEDConnected(message);
        case 'LED/state':
            return handleLEDState(message);
    }
});

function handleLEDConnected (message) {
    connected = (message.toString() === 'true');
    //console.log('LED connected status %s', message);
}

function handleLEDState (message) {
    ledState = message;
    //console.log('LED state update to: %s', message);
}

// Sends a request to device to turn LED on
function turnLEDOn () {
    if (connected && ledState !== 'on') {
        client.publish('LED/command', 'true');
        //console.log('controller says: turn LED on');
    }
}

// Sends a request to device to turn LED off
function turnLEDOff () {
    if (connected && ledState !== 'off') {
        client.publish('LED/command', 'false');
        //console.log('controller says: turn LED off');
    }
}