const hamroPatro = require("./scraper/scrapHamroPatro");
const ekantipur = require("./scraper/scrapKantipur");
const onlineKhabar = require("./scraper/scrapOnlinekhabar");
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    hamroPatro();
    ekantipur();
    onlineKhabar();
}).catch((err) => {
    console.log("Error while connecting to DB. ", err);
})