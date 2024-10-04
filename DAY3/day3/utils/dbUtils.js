const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

// Use dotenv to secure mongo connection 
const uri = process.env.MONGO_URI;

const connectToDb = () => {
    mongoose.connect(uri);
    const database = mongoose.connection;

    database.on("error", (error) => {
        console.error(error);
    })

    database.once("open", () => {
        console.log("You successfully connected to MongoDB!");
    })
}

module.exports = {
    connectToDb
}
