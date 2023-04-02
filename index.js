const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const NetworkStatusController = require("./controllers/networkStatusController");

const app = express();

//pug setup
app.set('view engine', 'pug');

//routing
app.get('/', (req, res) => {
    res.status(200).render('index', {title : "Accueil"});
});

app.get('/scan', (req, res) => {
    NetworkStatusController.checkNetWorkStatus();
    res.status(200).render('scan', {scanStatus: "ok"});
});

app.get('/last-week-status', (req, res) => {
    let status = NetworkStatusController.getAllStatusFromLastWeek();
    res.type('json');
    res.status(200).send(JSON.stringify(status));
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`);
});
