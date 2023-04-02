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
    res.status(200).render('scan', {});
});

app.post('/scan', async (req, res) => {
    NetworkStatusController.checkNetWorkStatus();
    res.status(200).send({scanStatus: true});
});

app.get('/last-week-status', async (req, res) => {
    let status = await NetworkStatusController.getAllStatusFromLastWeek();
    res.type('json');
    res.status(200).send(status);
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`);
});
