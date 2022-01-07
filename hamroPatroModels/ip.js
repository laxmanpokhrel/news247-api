const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");
const ipAddress = new Schema({
    ipAddress: String,
    date_Hits: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
module.exports = conn.hamroPatro.model('Hamropatro_IP', ipAddress);

