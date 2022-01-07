const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");

const stats = new Schema({
    latestFrontPageHeadlines: Number,
    latestTechHeadlines: Number,
    latestSportHeadlines: Number
}, { timestamps: true });
module.exports = conn.onlineKhabar.model('OnlineKhabar_Stats', stats);
