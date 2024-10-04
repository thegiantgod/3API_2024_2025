
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://borgesludovic:XpFVsnwCht2vC7ND@db.bg6go.mongodb.net/?retryWrites=true&w=majority&appName=DB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const connect = () => {
    run().catch(console.dir);
}

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
    connect,
    connectToDb
}
