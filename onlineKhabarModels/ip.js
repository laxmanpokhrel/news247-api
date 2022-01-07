const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conn = require("../config/db");
const ipAddress = new Schema({
    ipAddress: String,
    today_Hits: {
        type: Number,
        default: 0
    },
    today_Latest_Hits: {
        type: Number,
        default: 0
    },
    today_Latest_Number_Hits: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
module.exports = conn.onlineKhabar.model('Onlinekhabar_IP', ipAddress);

