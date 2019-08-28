var mongoose = require('mongoose');

var Co2Schema = mongoose.Schema;
var Co2ModelSchema = new Co2Schema({
  datetime: String,
  temp: Number,
  hum: Number,
  co2: Number,
  vbat:Number
});

var Co2Model = mongoose.model('CO2', Co2ModelSchema);
module.exports = Co2Model;
