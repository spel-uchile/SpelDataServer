var mongoose = require('mongoose');

var AprsSchema = mongoose.Schema;
var AprsModelSchema = new AprsSchema({
    aprsTime: String,
    sqliteTime: String,
    gpsTime: String,
    gpsLat: String,
    gpsLon: String,
    gpsHeight: String,
    gpsVx: String,
    gpsVy: String,
    gpsSats: String,
    gpsMode: String,
    bmpTemp: String,
    bmpPres: String,
    bmpAlt: String,
    dplLA: String,
    dplSA: String,
    phase : String,
    resetCounter : String,
    minutesAlive : String
});

var AprsModel = mongoose.model('packages', AprsModelSchema );
module.exports = AprsModel;