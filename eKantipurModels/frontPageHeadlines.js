const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");
const frontPageHeadline = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now
    },
    newsKiker: String,
    headline: String,
    headlineNavigation: String,
    thumbnailSource: String,
});
module.exports = conn.eKantipur.model('Ekantipur_Front_Page_Headlines', frontPageHeadline);

