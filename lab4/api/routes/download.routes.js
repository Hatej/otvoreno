const express = require('express');
const router = express.Router();
const db = require('../db');
var sqlConstants = require('../db/SQLCONSTANTS');

router.get('/JSON', async function (req, res, next) {
    try {
        let genJSON = sqlConstants.SQL_JSON;
        genJSON = genJSON.concat("\n").concat(") t) TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/tlak.json'");
        (await db.query(genJSON, []));
        res.status(200).sendFile('D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/tlak.json');
    } catch(err){
        console.log(err);
        res.status(400).send("There was an error!");
    }
});

router.get('/CSV', async function(req, res, next) {
    try{
        let genCSV = sqlConstants.SQL_CSV.concat("\n").concat(") TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/tlak.json' DELIMITER ',' CSV HEADER;");
        (await db.query(genCSV, []));
        res.status(200).sendFile('D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/tlak.json');
    } catch(err){
        console.log(err);
        res.status(400).send("There was an error!");
    }

});

router.get('/customJSON', function(req, res, next) {
    console.log("Wat de heck");
    res.sendFile('D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/queriedResources/tlak.json');
})

router.get('/customCSV', function(req, res, next) {
    res.sendFile('D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/WebApp/api/public/resources/queriedResources/tlak.csv');
})

module.exports = router;