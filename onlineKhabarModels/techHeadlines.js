
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");

const techHeadline = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now
    },

    headline: String,
    headlineNavigation: String,
    headlineSummary: String,
    thumbnailSource: String,

});
module.exports = conn.onlineKhabar.model('OnlineKhabar_Tech_Headlines', techHeadline);
