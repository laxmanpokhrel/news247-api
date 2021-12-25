const HamroPatro = require("../models/hamroPatro");
const OnlineKhabar = require("../models/onlineKhabar");
const Ekantipur = require("../models/ekantipur");
const hamroPatro = require("../models/hamroPatro");

exports.saveHamroPatroDate = (data) => {
    console.log("Inside saver");
    const hamroPatro = new HamroPatro({
        todaysNepaliDate: data
    });
    hamroPatro.save().then((result) => {
        console.log("HamroPatro: saved.")
    }).catch(err => {
        console.log("Error while saving hamroPatrodateTime: ", err);
    })
}
exports.saveEkantipurNews = (frontPageHeadlines, techHeadlines, sportsHeadlines) => {
    const ekantipur = new Ekantipur({
        frontPageHeadlines: frontPageHeadlines,
        techHeadlines: techHeadlines,
        sportsHeadlines: sportsHeadlines,
    })
    ekantipur.save().then((result) => {
        console.log("Ekantipur: saved.")
    }).catch(err => {
        console.log("Error while saving Ekantipur: ", err);
    })

}
exports.saveOnlineKhabarNews = (frontPageHeadlines, techHeadlines, sportsHeadlines) => {
    const onlineKhabar = new OnlineKhabar({
        frontPageHeadlines: frontPageHeadlines,
        techHeadlines: techHeadlines,
        sportsHeadlines: sportsHeadlines,
    })
    onlineKhabar.save().then((result) => {
        console.log("Onlinekahbar: saved.")
    }).catch(err => {
        console.log("Error while saving onlinekhabar: ", err);
    })
}