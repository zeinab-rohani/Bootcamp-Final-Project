"use strict";

const express = require("express");
const morgan = require("morgan");
const { auth } = require('express-oauth2-jwt-bearer');

const PORT = 8000;

const checkJwt = auth({
    audience: 'finalProjectBackend',
    issuerBaseURL: `https://dev-zanvxts5.us.auth0.com/`,
});

const {
    getCompanies,
    getServices,
    getOffers,
    getClients,
    addService,
    addOffer,
    addClient,
    deleteService,
    updateService} = require("./handlers");

express()
.use(function (req, res, next) {
    res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
.use(morgan("tiny"))
.use(express.static("./server/assets"))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use("/", express.static(__dirname + "/"))

// REST endpoints:
.get ("/fetch-message", checkJwt, function(req, res){
    res.status(200).json({message: "User is authinticated"})
}
)
.get("/api/companies", getCompanies)
.get("/api/services", getServices)
.get("/api/offers", getOffers)
.get("/api/clients", getClients)
.post("/api/add-service", addService)
.post("/api/add-offer", addOffer)
.post("/api/add-client", addClient)
.delete("/api/delete-service", deleteService)
.patch("/api/update-service", updateService)

.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})

.listen(PORT, () => console.info(`Listening on port ${PORT}`));
