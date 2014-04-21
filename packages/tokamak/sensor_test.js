var superagent = require('superagent');
var expect = require('expect.js');
var assert = require('assert');

describe('sensor rest api server', function(){
  var id;
  var humid = (Math.random() * (45.00 - 35.00) + 35.00).toFixed(2);
  var temperature = (Math.floor(Math.random() * (0.00 - 300.00) + 300.00));
  var date = new Date();

  it('post object', function(done){
    superagent.post('http://localhost:3000/collections/sensor')
      .send({
        "HUMID": humid,
        "TEMP": temperature,
        "timestamp": date.toISOString()
      })
      .end(function(e,res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.length).to.eql(24);
        id = res.body[0]._id;
        done();
      });
  });
});

