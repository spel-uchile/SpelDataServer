let mongoose = require('mongoose');

let PrsSchema = mongoose.Schema;
let PrsModelSchema = new PrsSchema({
  datetime: String,
  temp: Number,
  hum: Number,
  prs: Number,
  vbat: Number
});

let PrsModel = mongoose.model('PRS', PrsModelSchema);
module.exports = PrsModel;
