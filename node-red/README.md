#Node Red Code

To create all the flows at once, import *flood-sensor.js* into Node Red and it will create the necessary flows.
Individual flows' code can be found in the separate modules. These allow individual updating of nodes without a full import by using copy & paste.

Code was tested on Node Red 0.6.0 (Node.js version v0.8.22) 

## Flows
The main flow consists of:
Serial Port -> LLAP Parse (collate bytes into a valid LLAP message) -> New LLAP Parse (understand message content) -> CSV file

## Message formats
To allow maximum payload size we use custom message formats in LLAP. Example:

R5U137-----
Device: River 5, Sensor Type: Ultrasonic, Reading: 137cm

R5B4445----
Device: River 5, Sensor Type: Battery, Reading: 4445mV (4.4v)

This allows up to one unique sensor per device, up to 9 unique sensors per gateway without adding a gateway identifer. In future it's possible to employ the PAN ID (network number) to increase the number of devices on a gateway.

Alternatively we may be able to use the unique ID (MAC) of the Dallas temperature sensor to provide a single unique ID.
