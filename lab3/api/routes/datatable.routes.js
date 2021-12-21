const express = require('express');
const router = express.Router();
const db = require('../db');
var sqlConstants = require('../db/SQLCONSTANTS');
const openData = require('../openapi.json');

router.get('/', async function (req, res, next) {
    try {
        let qr = sqlConstants.SQL_TABLE.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
        const result = (await db.query(qr, [])).rows;
        res.status(200).send({
            status: "OK",
            message: "Dohvaćena mjerenja.",
            result: result
        });
    } catch(err){
        console.log(err);
        res.status(400).send("Greška u dohvaćanju s baze.");
    }
});

router.get('/openapi', function(req, res, next) {
    res.json(openData);
});

router.get('/postaje', async function (req, res, next) {
    try {
        let qr = "SELECT * FROM postaja";
        const result = (await db.query(qr, [])).rows;
        res.status(200).send({
            status: "OK",
            message: "Dohvaćene postaje.",
            result: result
        });
    } catch(err){
        console.log(err);
        res.status(400).send("There was an error!");
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        let id = parseInt(req.params.id);
        let qTest = "SELECT COUNT(1) FROM mjerenje WHERE mjerenje.\"mjerenjeID\" = '" + id + "'";
        let testResult = (await db.query(qTest, [])).rows[0].count;
        if(testResult == 0){
            throw new Error("Mjerenje ne postoji u bazi.");
        }
        let qr = sqlConstants.SQL_TABLE.concat("\n").concat("WHERE mjerenje.\"mjerenjeID\" = " + id);
        qr = qr.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
        const result = (await db.query(qr, [])).rows;
        res.status(200).send({
            status: "OK",
            message: "Dohvaćeno mjerenje.",
            result: result
        });
    } catch(err){
        console.log(err);
        if(err.message === "Mjerenje ne postoji u bazi."){
            res.status(404).send(err.message);
        } else {
            res.status(400).send(err.message);
        }
    }
});

router.post('/', async function(req, res, next){
    try{
        let tlak = req.body.tlak;
        let vrijeme = req.body.vrijeme;
        let datum = req.body.datum;
        let postaja = req.body.postaja;
        let mjeritelji = JSON.parse(req.body.mjeritelji);
        let qr = "SELECT COUNT(1) FROM osoba WHERE osoba.oib = '";
        await mjeritelji.forEach(async (mjeritelj) => {
            console.log(qr.concat(mjeritelj.mjeritelj + "'"));
            let resultQ = (await db.query(qr.concat(mjeritelj.mjeritelj + "'"))).rows[0].count;
            console.log(resultQ);
            if(resultQ == 0){
                mjeriteljNePostoji = true;
            }
        });
        for(const mjeritelj  of mjeritelji){
            let resultQ = (await db.query(qr.concat(mjeritelj.mjeritelj + "'"))).rows[0].count;
            if(resultQ == 0){
                throw new Error("Mjeritelj " + mjeritelj.mjeritelj + " ne postoji.");
            }
        }
        let qinsert = "INSERT INTO mjerenje VALUES('" + tlak + "', '" + vrijeme + "', '" + datum + "', '" + postaja + "')";
        const resultInsert = (await db.query(qinsert, [])).rows;
        qr = "SELECT MAX(mjerenje.\"mjerenjeID\") FROM mjerenje";
        const result = (await db.query(qr, [])).rows[0].max;
        mjeritelji.forEach(async (mjeritelj) => {
            qr = "INSERT INTO mjeritelji VALUES('" + result + "', '" + mjeritelj.mjeritelj + "')";
            let resultM = (await db.query(qr, [])).rows;
        });
        res.status(201).send({
            status: "OK",
            message: "Mjerenje dodano."
        });
    } catch(err){
        if(err.message.startsWith("Mjeritelj")){
            res.status(404).send(err.message);
        } else {
            res.status(400).send(err.message);
        }
    }
});

router.put('/:id', async function(req, res, next){
    try{
        let id = parseInt(req.params.id);
        let qTest = "SELECT COUNT(1) FROM mjerenje WHERE mjerenje.\"mjerenjeID\" = '" + id + "'";
        let testResult = (await db.query(qTest, [])).rows[0].count;
        let tlak, vrijeme, datum, postaja, mjeritelji;
        if(testResult == 0){
            throw new Error("Mjerenje ne postoji u bazi.");
        }
        if(req.body.tlak === undefined && req.body.vrijeme === undefined && req.body.datum === undefined && req.body.postaja === undefined && req.body.mjeritelji === undefined){
            throw new Error("Nedefinirani parametri.");
        }
        if(req.body.tlak !== undefined){
            tlak = req.body.tlak;
        }
        if(req.body.vrijeme !== undefined){
            vrijeme = req.body.vrijeme;
        }
        if(req.body.datum !== undefined){
            datum = req.body.datum;
        }
        if(req.body.postaja !== undefined){
            postaja = req.body.postaja;
        }
        if(req.body.mjeritelji !== undefined){
            mjeritelji = JSON.parse(req.body.mjeritelji);
        }
        
        let qr = "UPDATE mjerenje SET ";
        
        if(tlak !== undefined){
            let qTlak = qr.concat("tlak='" + tlak + "'");
            qTlak = qTlak.concat(" WHERE mjerenje.\"mjerenjeID\" = " + id);
            (await db.query(qTlak, []));
        }
        if(vrijeme !== undefined){
            let qVri = qr.concat("vrijeme='" + vrijeme + "'");
            qVri = qVri.concat(" WHERE mjerenje.\"mjerenjeID\" = " + id);
            (await db.query(qVri, []));
        }
        if(datum !== undefined){
            let qDat = qr.concat("datum='" + datum + "'");
            qDat = qDat.concat(" WHERE mjerenje.\"mjerenjeID\" = " + id);
            (await db.query(qDat, []));
        }
        if(postaja !== undefined){
            let qPostaja = qr.concat("postaja='" + postaja + "'");
            qPostaja = qPostaja.concat(" WHERE mjerenje.\"mjerenjeID\" = " + id);
            (await db.query(qPostaja, []));
        }
        if(mjeritelji !== undefined){
            let qMjeritelji = "DELETE FROM mjeritelji WHERE mjeritelji.\"idMjerenja\" = " + id;
            (await db.query(qMjeritelji, []));
            for(const mjeritelj of mjeritelji){
                qMjeritelji = "INSERT INTO mjeritelji VALUES(" + id + ", " + mjeritelj.mjeritelj + ")";
                (await db.query(qMjeritelji, []));
            }
        }
        res.status(200).send({
            status: "OK",
            message: "Mjerenje promijenjeno."
        });
    } catch(err){
        if(err.message === "Mjerenje ne postoji u bazi."){
            res.status(404).send(err.message);
        } else {
            res.status(400).send(err.message);
        }
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        let id = parseInt(req.params.id);
        let qTest = "SELECT COUNT(1) FROM mjerenje WHERE mjerenje.\"mjerenjeID\" = '" + id + "'";
        let testResult = (await db.query(qTest, [])).rows[0].count;
        if(testResult == 0){
            throw new Error("Mjerenje ne postoji u bazi.");
        }
        let qr = "DELETE FROM mjeritelji WHERE mjeritelji.\"idMjerenja\" = " + id;
        (await db.query(qr, []));
        qr = "DELETE FROM mjerenje WHERE mjerenje.\"mjerenjeID\" = " + id;
        (await db.query(qr, []));
        res.status(200).send({
            status: "OK",
            message: "Mjerenje obrisano."
        });
    } catch(err){
        if(err.message === "Mjerenje ne postoji u bazi."){
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

router.all('/:id', (req, res, next) => {
    res.status(501).send({
        status: "Not implemented",
        message: "Method has not been implemented"
    });
});

/*
router.post('/', async function(req, res, next){
    try{
        let search = req.body.search;
        let category = req.body.stupac; 
        console.log(search);
        console.log(category);
        if(category === "svi"){ 
            let genCSV = sqlConstants.SQL_CSV.concat("\n").concat("WHERE tlak::text LIKE '%" + search) + "%' OR vrijeme::text LIKE '%" + search + "%' OR datum::text LIKE '%" + search + "%' OR imepostaja LIKE '%" + search + "%' OR elevacija::text LIKE '%" + search + "%' OR geografska_duzina::text LIKE '%" + search + "%' OR geografska_sirina::text LIKE '%" + search + "%' OR mjesto.nazmjesto LIKE '%" + search + "%' OR zupanija.nazzupanija LIKE '%" + search + "%' OR mjeritelji::text LIKE '%" + search + "%'";
            genCSV = genCSV.concat("\n").concat(") TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/queriedResources/tlak.csv' DELIMITER ',' CSV HEADER;");
            (await db.query(genCSV, []));
            let genJSON = sqlConstants.SQL_JSON.concat("\n").concat("WHERE tlak::text LIKE '%" + search) + "%' OR vrijeme::text LIKE '%" + search + "%' OR datum::text LIKE '%" + search + "%' OR imepostaja LIKE '%" + search + "%' OR elevacija::text LIKE '%" + search + "%' OR geografska_duzina::text LIKE '%" + search + "%' OR geografska_sirina::text LIKE '%" + search + "%' OR mjesto.nazmjesto LIKE '%" + search + "%' OR zupanija.nazzupanija LIKE '%" + search + "%'";
            genJSON = genJSON.concat("\n").concat(") t) TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/queriedResources/tlak.json'");
            console.log(genJSON);
            (await db.query(genJSON, []));
            let qr = sqlConstants.SQL_TABLE.concat("\n").concat("WHERE tlak::text LIKE '%" + search) + "%' OR vrijeme::text LIKE '%" + search + "%' OR datum::text LIKE '%" + search + "%' OR imepostaja LIKE '%" + search + "%' OR elevacija::text LIKE '%" + search + "%' OR geografska_duzina::text LIKE '%" + search + "%' OR geografska_sirina::text LIKE '%" + search + "%' OR mjesto.nazmjesto LIKE '%" + search + "%' OR zupanija.nazzupanija LIKE '%" + search + "%' OR mjeritelji::text LIKE '%" + search + "%'";
            qr = qr.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
            const result = (await db.query(qr, [])).rows;
            res.status(200).send({
                result
            });
        } else {
            let genCSV = sqlConstants.SQL_CSV.concat("\n").concat("WHERE " + category + "::text LIKE '%" + search + "%'");
            genCSV = genCSV.concat("\n").concat(") TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/queriedResources/tlak.csv' DELIMITER ',' CSV HEADER;");
            (await db.query(genCSV, []));
            let genJSON = sqlConstants.SQL_JSON.concat("\n").concat("WHERE " + category + "::text LIKE '%" + search + "%'");
            genJSON = genJSON.concat("\n").concat(") t) TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/queriedResources/tlak.json'");
            (await db.query(genJSON, []));
            let qr = sqlConstants.SQL_TABLE.concat("\n").concat("WHERE " + category + "::text LIKE '%" + search + "%'");
            qr = qr.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
            const result = (await db.query(qr, [])).rows;
            res.status(200).send({
                result
            });
        }
        
    } catch(err){
        console.log(err);
        res.status(400).send("There was an error!");
    }
    
});
*/

module.exports = router;