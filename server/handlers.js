"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");

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

const getSuggestedCompanies = async (req, res) => {
    const companiesList = [];

    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        //Set limit to 10 on the home page
        const companiesResult = await db.collection("companies").find().limit(10).toArray();
        companiesResult.map((item) => {
        if (!companiesList.includes(item._id)) {
            companiesList.push(item._id);
            return companiesList;
        }
        });
        if (companiesList) {
        res.status(200).json({ status: 200, data: companiesList });
        } else {
        res.status(404).json({ status: 404, data: [] });
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
    };

const getBookings = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");

        const result = await db.collection("bookings").find().toArray();
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

const getBookingByUser = async (req, res) => {
    const { userId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("bookings").findOne({ _Id: userId });
        result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const getBookingByCompany = async (req, res) => {
    const { companyId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("homeaide");
        const result = await db.collection("bookings").findOne({ _Id: companyId });
        result
        ? res.status(200).json({ status: 200, data: result })
        : res.status(404).json({ status: 404, data: "Not Found" });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

const addBooking = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
    await client.connect();
    const db = client.db("homeaide");
    const requestedService = req.body.requestedService;
    const addBooking = {
        userId: uuidv4(),
        userFirstname: req.body.userFirstname,
        userLastname: req.body.userLastname,
        userEmail: req.body.userEmail,
        requestedService: requestedService,
        };

    const bookingAdded = await db.collection("orders").insertOne(addBooking);
        res.status(201).json({ status: 201, data: bookingAdded });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
};

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("E-commerce");
        const result = await db.collection("orders")
        .deleteOne({ _id: ObjectId(bookingId) });
        res.status(204).json({ status: 204, data: orderId, message: "Booking is deleted" });
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
};

module.exports = {
    getCompanies,
    getCompany,
    getSuggestedCompanies,
    getBookings,
    addBooking,
    deleteBooking,
    getBookingByUser,
    getBookingByCompany,
};
