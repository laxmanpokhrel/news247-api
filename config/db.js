require("dotenv").config();
const mongoose = require("mongoose");
mongoose.eKantipur = mongoose.createConnection("mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME1 + "?ssl=true&replicaSet=globaldb", {
    auth: {
        username: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
})

mongoose.onlineKhabar = mongoose.createConnection("mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME2 + "?ssl=true&replicaSet=globaldb", {
    auth: {
        username: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
})

mongoose.hamroPatro = mongoose.createConnection("mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME3 + "?ssl=true&replicaSet=globaldb", {
    auth: {
        username: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
});
module.exports = mongoose;