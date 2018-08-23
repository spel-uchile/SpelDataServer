var express = require('express');
var fs      = require('fs');
var router  = express.Router();
var Aprs = require('../models/aprs');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/AprsData';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;/* GET home page. */

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



router.get('/', function(req, res, next) {
    Aprs.find().lean().exec(function (err, packages) {
        res.json(packages);
    });
});

module.exports = router;