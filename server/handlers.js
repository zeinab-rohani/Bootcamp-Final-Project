"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");

const opencage = require('opencage-api-client');

require("dotenv").config();
const { MONGO_URI } = process.env;

console.log("mongo", MONGO_URI)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getCompanies = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("companies").find().toArray();
        if (result) {
        res.status(200).json({ status: 200, data: result });
        } else {
        res.status(404).json({ status: 404, data: [] });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getCompany = async (req, res) => {
    const { companyId } = req.params;
    console.log("company ID", companyId)
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("companies").findOne({ _id: ObjectId(companyId) });
        console.log("result", result)

        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, data: [] });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getServices = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");

        const result = await db.collection("serviceRequests").find().toArray();
        if (result) {
        res.status(200).json({ status: 200, data: result });
        } else {
        res.status(404).json({ status: 404, data: [] });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getOffers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");

        const result = await db.collection("offers").find().toArray();
        if (result) {
        res.status(200).json({ status: 200, data: result });
        } else {
        res.status(404).json({ status: 404, data: [] });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getClients = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");

        const result = await db.collection("clients").find().toArray();
        if (result) {
        res.status(200).json({ status: 200, data: result });
        } else {
        res.status(404).json({ status: 404, data: [] });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getService = async (req, res) => {
    const { serviceId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("serviceRequests").findOne({ _id: serviceId });
        result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getServicesByUser = async (req, res) => {
    const { userId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("serviceRequests").findOne({ _Id: userId });
        result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getServicesByCompany = async (req, res) => {
    const { companyId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("serviceRequests").findOne({ _Id: companyId });
        result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const addService = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    let position;
    const getPositionFromAddress = (address) => {
        
            const requestObj = {
            key: process.env.OPENCAGE_API_KEY,
            q: address,
            };
            return (opencage
            .geocode(requestObj)
            .then((data) => {
            return position = data.results[0].geometry
            })
            )};
            getPositionFromAddress(req.body.userAddress)
    .then((position) =>

            console.log("position", position));

    try {
    await client.connect();
    const db = client.db("homeaide");

    const addService = {
        serviceId: uuidv4(),
        userFirstname: req.body.userFirstname,
        userLastname: req.body.userLastname,
        userEmail: req.body.userEmail,
        userPhone: req.body.phone,
        userAddress: req.body.userAddress,
        title: req.body.title,
        description: req.body.description,
        addressPositionLat: position.lat,
        addressPositionLng: position.lng,
        serviceCategory: req.body.serviceCategory,
        isConfirmed: false
        };

    const serviceAdded = await db.collection("serviceRequests").insertOne(addService);
    res.status(201).json({ status: 201, data: serviceAdded });

    } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    }

    client.close();
};

const addOffer = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
    await client.connect();
    const db = client.db("homeaide");

    const addOffer = {
        serviceId: req.body.serviceId,
        clientEmail: req.body.clientEmail,
        serviceProvider: req.body.serviceProvider,
        address: req.body. Address,
        title: req.body.title,
        description: req.body.description,
        serviceCategory: req.body.serviceCategory,
        serviceProvider: req.body.serviceProvider,
        offer: req.body.offer,
        isConfirmed: false
    }

    const offerAdded = await db.collection("offers").insertOne(addOffer);

        res.status(201).json({ status: 201, data: offerAdded });
    
    } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    }

    client.close();
};

const addClient = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
    await client.connect();
    const db = client.db("homeaide");

    const addClient = {
        userId: uuidv4(),
        userFirstname: req.body.userFirstname,
        userLastname: req.body.userLastname,
        userEmail: req.body.userEmail,
        userPhone: req.body.phone,
        userAddress: req.body.userAddress
    }

    const clientAdded = await db.collection("clients").insertOne(addClient);
    res.status(201).json({ status: 201, data: serviceAdded, clientAdded });

    } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    }

    client.close();
};

const deleteService = async (req, res) => {
    const { serviceId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const deleteData = await db.collection("serviceRequests")
        .deleteOne({ _id: ObjectId(req.body.serviceId) });
        res.status(204).json({ status: 204, serviceId, data: deleteData });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const updateService = async (req, res) => {
    const serviceId = req.body.serviceId;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const updateService = await db.collection("serviceRequests")
        .updateOne({ _id: ObjectId(serviceId) }, {
            $set: { "isConfirmed": true }},
        )
        const updateOffer = await db.collection("offers")
        .updateOne({ serviceId: serviceId }, {
            $set: { "isConfirmed": true }},
        )
        res.status(200).json({ status: 200, data: updateService, updateOffer });
        } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

module.exports = {
    getCompanies,
    getCompany,
    getServices,
    getService,
    getOffers,
    getClients,
    getServicesByUser,
    getServicesByCompany,
    addService,
    addOffer,
    addClient,
    deleteService,
    updateService};
