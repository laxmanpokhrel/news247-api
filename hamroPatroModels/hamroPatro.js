const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db")
const hamroPatroSchema = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now()
    },
    nepDate: String,
    nepEvent: String,
    scrappedNepalTime: String,
    engDate: String
});
module.exports = conn.hamroPatro.model('dates', hamroPatroSchema);