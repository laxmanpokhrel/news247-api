const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");

const sportHeadline = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now
    },

    headline: String,
    headlineNavigation: String,
    thumbnailSource: String,
    headlineSummary: String,
});
module.exports = conn.onlineKhabar.model('OnlineKhabar_Sport_Headlines', sportHeadline);
