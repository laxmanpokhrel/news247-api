const ekantipurFrontPageHeadlines = require("../eKantipurModels/frontPageHeadlines");
const ekantipurSportHeadlines = require("../eKantipurModels/sportHeadlines");
const ekantipurTechHeadlines = require("../ekantipurModels/techHeadlines");
const ekantipurStats = require("../eKantipurModels/stats");
const eKantipurIp = require("../eKantipurModels/ip");

let aDayBefore = new Date(Date.now());
aDayBefore.setDate(aDayBefore.getDate() - 1);

exports.getToday = async (req, res, next) => {
    //* save hit counts from the ip
    let ip = req.socket.remoteAddress || null;
    if (ip) {
        const ipDoc = await eKantipurIp.findOne({ ipAddress: ip })
        if (ipDoc) {
            const todayHitsCount = ipDoc.today_Hits + 1;
            await eKantipurIp.updateOne({ ipAddress: ip }, { $set: { today_Hits: todayHitsCount } });
        }
        else {
            newEKantipurIp = new eKantipurIp({
                ipAddress: ip,
                today_Hits: 1
            })
            newEKantipurIp.save();
        }
    }

    const frontPageData = await ekantipurFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    const sportsData = await ekantipurSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    const techData = await ekantipurTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    res.status(200).json({
        "frontPageHeadlines": frontPageData,
        "sportHeadlines": sportsData,
        "techHeadlines": techData
    });
}
exports.getTodayLatest = async (req, res, next) => {
    //* save hit counts from the ip
    let ip = req.socket.remoteAddress || null;
    if (ip) {
        const ipDoc = await eKantipurIp.findOne({ ipAddress: ip })
        if (ipDoc) {
            const todayHitsCount = ipDoc.today_Latest_Hits + 1;
            await eKantipurIp.updateOne({ ipAddress: ip }, { $set: { today_Latest_Hits: todayHitsCount } });
        }
        else {
            newEKantipurIp = new eKantipurIp({
                ipAddress: ip,
                today_Latest_Hits: 1
            })
            newEKantipurIp.save();
        }
    }

    let stats = await ekantipurStats.find({}, { _id: 0 });
    let { latestFrontPageHeadlines, latestTechHeadlines, latestSportHeadlines } = stats[0];

    const frontPageData = await ekantipurFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(latestFrontPageHeadlines);
    const sportsData = await ekantipurSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(latestSportHeadlines);
    const techData = await ekantipurTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(latestTechHeadlines);
    res.status(200).json({
        "frontPageHeadlines": frontPageData,
        "sportHeadlines": sportsData,
        "techHeadlines": techData
    });
}
exports.getTodayLatestNumber = async (req, res, next) => {
    //* save hit counts from the ip
    let ip = req.socket.remoteAddress || null;
    if (ip) {
        const ipDoc = await eKantipurIp.findOne({ ipAddress: ip })
        if (ipDoc) {
            const todayHitsCount = ipDoc.today_Latest_Number_Hits + 1;
            await eKantipurIp.updateOne({ ipAddress: ip }, { $set: { today_Latest_Number_Hits: todayHitsCount } });
        }
        else {
            newEKantipurIp = new eKantipurIp({
                ipAddress: ip,
                today_Latest_Number_Hits: 1
            })
            newEKantipurIp.save();
        }
    }

    let limit = Number(req.params.number);
    if (limit > 0) {
        let stats = await ekantipurStats.find({}, { _id: 0 });
        let { latestFrontPageHeadlines, latestTechHeadlines, latestSportHeadlines } = stats[0];
        const frontPageData = await ekantipurFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(latestFrontPageHeadlines >= limit ? limit : latestFrontPageHeadlines);
        const sportData = await ekantipurSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(latestSportHeadlines >= limit ? limit : latestSportHeadlines);
        const techData = await ekantipurTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(latestTechHeadlines >= limit ? limit : latestTechHeadlines);
        res.status(200).json({
            "frontPageHeadlines": frontPageData,
            "sportHeadlines": sportData,
            "techHeadlines": techData
        });
    } else {
        res.status(200).json({
            "frontPageHeadlines": [],
            "sportHeadlines": [],
            "techHeadlines": []
        });
    }
}

