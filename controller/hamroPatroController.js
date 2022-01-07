const hamroPatroDates = require("../hamroPatroModels/hamroPatro");
const hamroPatroIp = require("../hamroPatroModels/ip");
exports.getDate = async (req, res, next) => {
    //* save hit counts from the ip
    let ip = req.socket.remoteAddress || null;
    if (ip) {
        const ipDoc = await hamroPatroIp.findOne({ ipAddress: ip })
        if (ipDoc) {
            const todayHitsCount = ipDoc.date_Hits + 1;
            await hamroPatroIp.updateOne({ ipAddress: ip }, { $set: { date_Hits: todayHitsCount } });
        }
        else {
            newHamroPatroIp = new hamroPatroIp({
                ipAddress: ip,
                date_Hits: 1
            })
            newHamroPatroIp.save();
        }
        console.log("ip stats saved...");
    }
    await hamroPatroDates.find().sort({ _id: -1 }).limit(1).then((result) => {
        res.status(200).json({
            "date": result
        })
    }).catch(err => {
        console.log("error while fetching dates: ", err)
    });

}
// db.collection_name.find().sort({ field_name: sort order })