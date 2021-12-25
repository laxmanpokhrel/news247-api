const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
// const scarppingRoutes = require("./routes/scrappingRoutes");
const app = express();

// app.use(scarppingRoutes);
app.get("/", (req, res, next) => {
    res.json({ "title": "hey there!!" });
});


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to database...");
    app.listen(3000, () => {
        console.log("listening to port 3000");
    })
}).catch((err) => {
    console.log("Error while connecting to DB. ", err);
})
