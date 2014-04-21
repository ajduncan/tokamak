'use strict';

// The Package is past automatically as first parameter
module.exports = function(Tokamak, app, auth, database) {

    app.get('/tokamak/example/anyone', function (req, res, next) {
      res.send('Anyone can access this');
    });

    app.get('/tokamak/example/auth',auth.requiresLogin, function (req, res, next) {
      res.send('Only authenticated users can access this');
    });

    app.get('/tokamak/example/admin',auth.requiresAdmin, function (req, res, next) {
      res.send('Only users with Admin role can access this');
    });

    app.get('/tokamak/example/render', function (req, res, next) {
      Tokamak.render('index', {package:'tokamak'}, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      });
    });

  /* Sensor */
  var mongoskin = require('mongoskin');
  var db = mongoskin.db('mongodb://localhost/sensor', {safe:true});

  app.param('collectionName', function(req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
  });

  /*
  app.get('/', function (req, res) {
    res.send('please select a collection, e.g., /collections/messages');
  });
  */

  app.get('/count/:collectionName', function(req, res) {
    db.collection(req.params.collectionName).find().count(function (err, count) {
      res.send('' + count);
    });
  });

  app.get('/collections/:collectionName', function(req, res, collectionName) {
    db.collection(collectionName).find().count(function (err, count) {
      // console.log("Got count: " + count)
      req.collection.find({}, {limit:100, sort: [['timestamp', -1]]}).toArray(function(e, results) {
      // req.collection.find({},{skip:count - 3, limit:3}).toArray(function(e, results) {
        if (e) {
          return next(e);
        }
        res.send(results);
      });
    });
  });

  app.post('/collections/:collectionName', function(req, res) {
    req.collection.insert(req.body, {}, function(e, results) {
      if (e) {
        return next(e);
      }
      res.send(results);
    });
  });

  app.get('/collections/:collectionName/:id', function(req, res) {
    req.collection.findOne({_id: req.collection.id(req.params.id)}, function(e, result) {
      if (e) {
        return next(e);
      }
      res.send(result);
    });
  });

  app.put('/collections/:collectionName/:id', function(req, res) {
    req.collection.update({_id: req.collection.id(req.params.id)}, {$set:req.body}, {safe:true, multi:false}, function(e, result){
      if (e) {
        return next(e);
      }
      res.send((result===1)?{msg:'success'}:{msg:'error'});
    });
  });

  app.del('/collections/:collectionName/:id', function(req, res) {
    req.collection.remove({_id: req.collection.id(req.params.id)}, function(e, result) {
      if (e) {
        return next(e);
      }
      res.send((result===1)?{msg:'success'}:{msg:'error'});
    });
  });

};