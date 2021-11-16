const express = require('express');
const router = express.Router();

router.get('/JSON', function (req, res, next) {
    res.download('./public/resources/tlak.json');
});

router.get('/CSV', function(req, res, next) {
    res.download('./public/resources/tlak.csv')
});

router.get('/customJSON', function(req, res, next) {
    res.download('./public/resources/queriedResources/tlak.json');
})

router.get('/customCSV', function(req, res, next) {
    res.download('./public/resources/queriedResources/tlak.csv');
})

module.exports = router;