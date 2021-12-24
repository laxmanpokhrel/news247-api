const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ekantipurSchema = new Schema({
    fetchedDate: {
        type: Date,
        default: Date.now
    },
    frontPageHeadlines: [{}],
    sportsHeadlines: [{}],
    techNewsHeadlines: [{}]
});
module.exports = mongoose.model('Ekantipur', ekantipurSchema);