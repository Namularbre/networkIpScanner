const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const Scanner = require("./utils/scanner");

const app = express();

app.get('/', (req, res) => {
    let networkStatus = Scanner.checkNetWorkStatus();
    res.contentType('json');
    res.status(200).send(JSON.stringify(networkStatus));
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`);
});
