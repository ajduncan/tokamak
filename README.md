tokamak
=======

data fusion simulation with continuous model validation

Framework for data fusion to provide continuous prediction 
and validation of a composite model.

## Installation ##

### Generators ###

http://webapplog.com/tutorial-node-js-and-mongodb-json-rest-api-server-with-mongoskin-and-express-js/

Ubuntu 13.10:

    $ sudo apt-get update
    $ sudo apt-get upgrade
    $ sudo apt-get install nodejs nodejs-dev npm mongodb
    $ cd generators
    $ npm install
    $ npm test

    # npm install superagent
    # npm install expectjs
    # npm install express
    # npm install mongoskin
    # npm install mocha

    # Add rest = true and bind_ip = 0.0.0.0 to your mongodb conf.
    $ sudo nano -w /etc/mongodb.conf
    $ sudo /etc/init.d/mongodb restart

### Running Generators ###

Server:

	$ cd generators/sensor
    $ node sensor.js

Client: 

	$ cd generators/sensor
    $ node sensor_pool.js
    ...

Client refresh cycle:

    $ watch -n 5 --exec node sensor_pool.js

Tests:

    $ ./node_modules/mocha/bin/mocha tokamak.test.js 

