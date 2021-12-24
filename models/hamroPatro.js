const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hamroPatroSchema = new Schema({
    todaysNepaliDate: [{}]
});
module.exports = mongoose.model('HamroPatro', hamroPatro);