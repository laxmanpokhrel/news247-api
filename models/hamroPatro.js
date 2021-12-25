const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hamroPatroSchema = new Schema({
    scrapedDate: {
        type: Date,
        default: Date.now()
    },
    todaysNepaliDate: [{}]
});
module.exports = mongoose.model('HamroPatro', hamroPatroSchema);