var superagent = require('superagent')

var i = 0
var humid
var lux
var pressure
var temperature
var date = new Date()

console.log(date.toISOString())

for (i=0; i<100; i++) {
  humid = (Math.random() * (45.00 - 35.00) + 35.00).toFixed(2)
  pressure = (Math.floor(Math.random() * (0.00 - 999999.00) + 999999.00))
  temperature = (Math.floor(Math.random() * (0.00 - 300.00) + 300.00))
  date = new Date()
//  i++

  superagent.post('http://localhost:3000/collections/sensor')
    .send({
      "HUMID": humid,
      "TEMP": temperature,
      "timestamp": date.toISOString()
    }).end()
}

console.log(i + " sent.")

superagent.get('http://localhost:3000/count/sensor').end(function(e, res) {
    console.log(res.body)
})


