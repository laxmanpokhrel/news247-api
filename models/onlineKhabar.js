const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const onlineKahabarSchema = new Schema({
    fetchedDate: {
        type: Date,
        default: Date.now
    },
    frontPageHeadlines: [{}],
    sportsHeadlines: [{}],
    techNewsHeadlines: [{}]
});
module.exports = mongoose.model('Onlinekhabar', onlineKahabarSchema);
