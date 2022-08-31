const { MongoClient } = require("mongodb");
const { montrealPlumbingData, lavalPlumbingData,
    longueuilPlumbingData,  blainvillePlumbingData } = require("./plumbingData");

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
    .insertMany(montrealPlumbingData);

    console.log("result", result)

    client.close();
    };

// dataTransfer();

const lavalDataTransfer = async () => {

    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("homeaide");

    const result = await db.collection("lavalPlumbing")
    .insertMany(lavalPlumbingData);

    console.log("result", result)

    client.close();
    };

// lavalDataTransfer();

const longueuilDataTransfer = async () => {

    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("homeaide");

    const result = await db.collection("longueuilPlumbingData")
    .insertMany(longueuilPlumbingData);

    console.log("result", result)

    client.close();
    };

// longueuilDataTransfer();

const blainvilleDataTransfer = async () => {

    const client = await new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("homeaide");

    const result = await db.collection("blainvillePlumbingData")
    .insertMany(blainvillePlumbingData);

    console.log("result", result)

    client.close();
    };

// blainvilleDataTransfer();
