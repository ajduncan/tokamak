var superagent = require('superagent');
var sleep = require('sleep');


var i = 0;
var humid;
var lux;
var pressure;
var temperature;
var date = new Date();

// console.log(date.toISOString());

setImmediate(function self () {
  console.log(date.toISOString());

  humid = (Math.random() * (45.00 - 35.00) + 35.00).toFixed(2);
  temperature = (Math.floor(Math.random() * (0.00 - 300.00) + 300.00));
  date = new Date();

  superagent.post('http://localhost:3000/collections/sensor').send({
    "HUMID": humid,
    "TEMP": temperature,
    "timestamp": date.toISOString()
  }).end();
  sleep.sleep(1);
  setImmediate(self);
});
