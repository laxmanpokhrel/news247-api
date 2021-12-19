const express = require("express");
const scarppingRoutes = require("./routes/scrappingRoutes");
const app = express();

app.use(scarppingRoutes);
app.get("/", (req, res, next) => {
    res.json({ "title": "hey there!!" });
})


app.listen(3000, () => {
    console.log("listening to port 3000");
})