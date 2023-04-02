const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const NetworkStatusController = require("./controllers/networkStatusController");

const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Do /scan to scan, /display to show previous scan");
});

app.get('/scan', (req, res) => {
    NetworkStatusController.checkNetWorkStatus();
    res.status(200).send('Scanning in progress. See your db for details');
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`);
});
