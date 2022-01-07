const express = require("express");
// const mongoose = require("mongoose");
require('dotenv').config()
const samacharRoutes = require("./routes/samacharRoutes");
const ekantipurRoutes = require("./routes/ekantipurRoutes");
const hamroPatroRoutes = require("./routes/hamroPatroRoutes");
const onlineKhabarRoutes = require("./routes/onlineKhabarRoutes");
const app = express();

app.use("/hamropatro", hamroPatroRoutes);
app.use("/ekantipur", ekantipurRoutes);
app.use("/onlinekhabar", onlineKhabarRoutes);
app.use("/samachar", samacharRoutes);
app.get("/", (req, res, next) => {
    res.json({
        "title": "This is news API"
    });
})

app.listen(process.env.PORT, () => {
    console.log("listening to port: ", process.env.PORT);
})
