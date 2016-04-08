var express = require('express');
var router = express.Router();
var Points = require('../models/Points');

router.get('/', function(req, res) {
  var UUID = req.query.uuid;
  if(UUID){
    Points.find({ UUID: UUID }, function(err, points){
      if(err){
        console.log(err);
        return res.status(500).send('<h1>500 Server Error</h1>');
      }
      return res.render('index', { points: points });
    });
  } else {
    Points.find().distinct('UUID', function(err, uuids){
      if(err){
        console.log(err);
        return res.status(500).send('<h1>500 Server Error</h1>');
      }
      console.log(uuids);
      return res.render('index', { uuids: uuids });
    });

  }
});

router.post('/addWaypoint', function(req, res){
  var serverPassword = process.env.APIKEY || "testpassword";
  var userPassword = req.body.APIKEY;
  
  var waypoint = req.body.waypoint;
  var time = new Date();
  var UID = req.body.UID;
  var test = { 'waypoint': "lat, long", "UID": "theUID", "APIKEY": "123k5h213ihh"};

  if(serverPassword && userPassword && serverPassword === userPassword){
    Points.create({
      waypoint: waypoint,
      time: time,
      UID: UID
    }, function(err, points){
      if(err){
        return res.status(500).send({
          error: err
        });
      }
      return res.status(200).send({
        message: "success"
      });
    });
  }
});

module.exports = router;
