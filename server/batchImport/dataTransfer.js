const { MongoClient } = require("mongodb");
const { plumbingData } = require("./plumbingData");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dataTransfer = async () => {

    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("homeaide");

    const result = await db.collection("companies")
    .insertMany(plumbingData);

    console.log("result", result)

    client.close();
    };

// dataTransfer();
