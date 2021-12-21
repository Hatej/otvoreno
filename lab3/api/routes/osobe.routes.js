const express = require('express');
const router = express.Router();
const db = require('../db');
var sqlConstants = require('../db/SQLCONSTANTS');

router.get('/', async function (req, res, next) {
    try {
        let qr = "SELECT * FROM osoba";
        const result = (await db.query(qr, [])).rows;
        res.status(200).send({
            status: "OK",
            message: "Dohvaćene osobe.",
            result: result
        });
    } catch(err){
        console.log(err);
        res.status(400).send("Greška u dohvaćanju s baze.");
    }
});

router.get('/:oib', async function (req, res, next) {
    try {
        let oib = req.params.oib;
        let qTest = "SELECT COUNT(1) FROM osoba WHERE osoba.oib = '" + oib + "'";
        let testResult = (await db.query(qTest, [])).rows[0].count;
        if(testResult == 0){
            throw new Error("Osoba ne postoji u bazi.");
        }
        let qr = "SELECT * FROM osoba WHERE osoba.oib = '" + oib + "'";
        const result = (await db.query(qr, [])).rows;
        res.status(200).send({
            status: "OK",
            message: "Dohvaćena osoba.",
            result: result
        });
    } catch(err){
        console.log(err);
        if(err.message === "Osoba ne postoji u bazi."){
            res.status(404).send(err.message);
        } else {
            res.status(400).send(err.message);
        }
    }
});

router.all('/', (req, res, next) => {
    res.status(501).send({
        status: "Not implemented",
        message: "Method has not been implemented"
    });
});

router.all('/:oib', (req, res, next) => {
    res.status(501).send({
        status: "Not implemented",
        message: "Method has not been implemented"
    });
});

module.exports = router;