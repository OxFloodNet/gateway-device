// name: Parse LLAP message
// use: To take individual characters from a serial node and parse them into a single LLAP message
// inputs: 11-character message is introduced with a lower-case "a" (not counted), then the 2 alphanumeric char device ID, then the payload. Trailing dashes "-" are added to pad to 11 chars.
// outputs: 1
// anything stored in context is kept available for next time we get called
context.buff = context.buff || "";
context.count = context.count || 0;

// wait for an a and reset the buffer and counter
if (msg.payload == "a") { context.count = 0; context.buff = ""; } // this does mean the a must NOT appear elsewhere in the message

// buffer message
// add payload to the buffer and increase the count
context.buff = context.buff + msg.payload;
context.count += 1;

// transmit message
// when we reach 11 then output the whole message, assumes length is the a plus 11 - may need to tweak...
if (context.count == 12 ) {
	msg.topic = context.buff.slice(1,3);	// return the first two chars as the topic
	msg.payload = context.buff.slice(3);	// return rest of the buffer as the payload
	return msg;
}
return null;
