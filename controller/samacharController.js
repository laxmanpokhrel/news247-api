const ekantipurFrontPageHeadlines = require("../eKantipurModels/frontPageHeadlines");
const ekantipurSportHeadlines = require("../eKantipurModels/sportHeadlines");
const ekantipurTechHeadlines = require("../ekantipurModels/techHeadlines");
const ekantipurStats = require("../eKantipurModels/stats");

const onlineKhabarFrontPageHeadlines = require("../onlineKhabarModels/frontPageHeadlines");
const onlineKhabarSportHeadlines = require("../onlineKhabarModels/sportHeadlines");
const onlineKhabarTechHeadlines = require("../onlineKhabarModels/techHeadlines");
const onlineKhabarStats = require("../onlineKhabarModels/stats");

let aDayBefore = new Date(Date.now());
aDayBefore.setDate(aDayBefore.getDate() - 1);

exports.getToday = async (req, res, next) => {
    const ekFrontPageData = await ekantipurFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    const ekSportsData = await ekantipurSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    const ekTechData = await ekantipurTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });

    const okFrontPageData = await onlineKhabarFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    const okSportsData = await onlineKhabarSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });
    const okTechData = await onlineKhabarTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 });


    res.status(200).json({
        "eKantipur": {
            "frontPageHeadlines": ekFrontPageData,
            "sportHeadlines": ekSportsData,
            "techHeadlines": ekTechData
        },
        "onlineKhabar": {
            "frontPageHeadlines": okFrontPageData,
            "sportHeadlines": okSportsData,
            "techHeadlines": okTechData
        }
    });
}

exports.getTodayLatest = async (req, res, next) => {
    let limit = Number(req.params.number);
    let stats = await onlineKhabarStats.find({}, { _id: 0 });

    const okFrontPageData = await onlineKhabarFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestFrontPageHeadlines);
    const okSportsData = await onlineKhabarSportHeaslines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestSportHeadlines);
    const okTechData = await onlineKhabarTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestTechHeadlines);

    stats = await ekantipurStats.find({}, { _id: 0 });
    const ekFrontPageData = await ekantipurFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestFrontPageHeadlines);
    const ekSportsData = await onlineKhabarSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestSportHeadlines);
    const ekTechData = await ekantipurTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestTechHeadlines);


    res.status(200).json({
        "eKantipur": {
            "frontPageHeadlines": ekFrontPageData,
            "sportHeadlines": ekSportsData,
            "techHeadlines": ekTechData
        },
        "onlinKhabar": {
            "frontPageHeadlines": okFrontPageData,
            "sportHeadlines": okSportsData,
            "techHeadlines": okTechData
        }
    });

}
exports.getTodayLatestNumber = async (req, res, next) => {
    let limit = Number(req.params.number);
    let stats = await ekantipurStats.find({}, { _id: 0 });

    const ekFrontPageData = await ekantipurFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestFrontPageHeadlines >= limit ? limit : stats[0].latestFrontPageHeadlines);
    const ekSportsData = await ekantipurSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestSportHeadlines >= limit ? limit : stats[0].latestSportHeadlines);
    const ekTechData = await ekantipurTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestTechHeadlines >= limit ? limit : stats[0].latestTechHeadlines);

    stats = await onlineKhabarStats.find({}, { _id: 0 });
    const okFrontPageData = await onlineKhabarFrontPageHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestFrontPageHeadlines >= limit ? limit : stats[0].latestFrontPageHeadlines);
    const okSportsData = await onlineKhabarSportHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestSportHeadlines >= limit ? limit : stats[0].latestSportHeadlines);
    const okTechData = await onlineKhabarTechHeadlines.find({ scrapedDate: { $lte: Date.now(), $gte: aDayBefore } }, { _id: 0 }).limit(stats[0].latestTechHeadlines >= limit ? limit : stats[0].latestTechHeadlines);

    res.status(200).json({
        "eKantipur": {
            "frontPageHeadlines": ekFrontPageData,
            "sportHeadlines": ekSportsData,
            "techHeadlines": ekTechData
        },
        "onlineKhabar": {
            "frontPageHeadlines": okFrontPageData,
            "sportHeadlines": okSportsData,
            "techHeadlines": okTechData
        }
    });
}
