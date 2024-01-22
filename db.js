const { MongoClient } = require("mongodb")

let dbConnection; 

module.exports = {
    connectToDb: (cb) => {
        MongoClient
            .connect(URL)
            .then((client) => {
                console.log("Connected to DB")
                dbConnection = client.db()
                return cb()
            })
            .catch((error) => {
                return cb(error)
            })
    },
    getDb: () => dbConnection
};      