// expecting payload to be message content from LLAP
// expecting topic to be deviceID

var d = new Date();
var timestamp = d.getTime();
mystuff = msg.payload;
deviceid = msg.topic;
sensortype = mystuff.substr(0,1);  

// first character = sensor type

sensorreading = mystuff.substr(1); 

// remaining chars = reading 
// trim off trailing dashes
sensorreading = sensorreading.replace(/-/g, "");


sensor = "Unknown: ";
switch(sensortype) {
    case "U":
      sensor = "Ultrasonic: ";
      break;
    case "B":
      sensor = "Battery: ";
      break;
    default:
      sensor = "None: ";
      sensorreading = "N/A";
      break;
}

msg.debug =  dateTimeStamp(timestamp) + " " + deviceid + " - " + sensor + sensorreading;
msg.payload = dateTimeStamp(timestamp) + "," + deviceid + "," + sensortype + "," + sensorreading;

//msg.deviceid = deviceid;
//msg.sensortype = sensortype;
//msg.sensorreading = sensortype;

return msg;

/**
 * Return a timestamp with the format "yyyy-mm-dd h:MM:ss"
 * @type {Date}
 */
 
function dateTimeStamp() {
// Create a date object with the current time
  var now = new Date();
 
// Create an array with the current month, day and time
  var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate(),  ];
 
// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
 
// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
 
// Return the formatted string
  return date.join("-") + " " + time.join(":");
}
