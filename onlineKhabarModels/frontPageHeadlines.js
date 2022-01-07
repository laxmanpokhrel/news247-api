const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");
const frontPageHeadline = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now
    },
    newsTag: String,
    headline: String,
    headlineNavigation: String,
    authorName: String,
    thumbnailSource: String,
    thumbnailNavigation: String,
    headlineSummary: String
});
module.exports = conn.onlineKhabar.model('OnlineKhabar_Front_Page_Headlines', frontPageHeadline);
