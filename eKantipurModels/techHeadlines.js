
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
    authorName: String,
    authorProfileNavigation: String
});
mongoose.connection.useDb('ekantipur');
module.exports = conn.eKantipur.model('Ekantipur_Tech_Headlines', techHeadline);
