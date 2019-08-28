var express = require('express');
var fs      = require('fs');
var router  = express.Router();
var CO2 = require('../models/co2');
//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/SensorPlanta';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;/* GET home page. */

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



router.get('/', function(req, res, next) {
    CO2.find().lean().exec(function (err, c02data) {
        res.json(c02data);
    });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
    let co2Data= {
      datetime: req.body.datetime,
      temp: req.body.temp,
      hum: req.body.hum,
      co2: req.body.co2,
      vbat: req.body.vbat
    };
    //
    CO2.create(co2Data, function (error, co2) {
      if (error) {
        return next(error);
      } else {
        return res.json({
          status: 'created'
        });
      }
    });
});


module.exports = router;
