# iPhone-LED-Control
This project is relatively simple. Using three devices: an iPhone, a Raspberry Pi 2 B+, and a Laptop, I control the state of an LED in a simple Resistor-LED circuit.

## Raspberry Pi 2 B+
The Raspberry Pi 2 is running Node.js on top of Raspbian. By importing a couple software packages I was able to manipulate the GPIO pins on the Raspberry Pi and control the LED.

## The Laptop
Node.js is also running on the Laptop. The Laptop and the Raspberry Pi communicate using the MQTT protocol. Both devices subscribe and publish to topics through an MQTT broker (mqtt://test.mosquitto.org for now). The laptop is also running an HTTP server which allows for inbound connections from the iPhone.

## The iPhone
A small iOS application is running on the iPhone (just one view with a switch). After the switch is turned on/off, a message is sent to the laptop to trigger the LED to turn on/off. This is done through WebSockets (sockets.io).

