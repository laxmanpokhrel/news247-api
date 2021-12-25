const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const onlineKahabarSchema = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now
    },
    frontPageHeadlines: [{}],
    sportsHeadlines: [{}],
    techHeadlines: [{}]
});
module.exports = mongoose.model('Onlinekhabar', onlineKahabarSchema);
