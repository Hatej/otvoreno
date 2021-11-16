const express = require('express');
const router = express.Router();
const db = require('../db');

const sqlTable = `SELECT tlak, vrijeme, datum, postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, 
                    mjesto.nazmjesto AS mjesto, zupanija.nazzupanija AS zupanija, ARRAY_AGG(osoba.ime || ' ' || osoba.prezime) AS mjeritelji
                    FROM mjerenje
                    JOIN postaja ON mjerenje.postaja = postaja.id
                    JOIN mjesto ON postaja.mjesto = mjesto.pbr
                    JOIN zupanija ON mjesto.sifzupanija = zupanija.sifzupanija
                    JOIN mjeritelji ON mjerenje."mjerenjeID" = mjeritelji."idMjerenja"
                    JOIN osoba ON mjeritelji.mjeritelj = osoba.oib`;

const sqlCSV = `COPY(
                    SELECT mjerenje.tlak, mjerenje.vrijeme, mjerenje.datum, (osoba.ime || ' ' || osoba.prezime) AS mjeritelj,
                            postaja.imepostaja AS postaja, postaja.elevacija, postaja.geografska_duzina, postaja.geografska_sirina, 
                            mjesto.nazmjesto AS mjesto, zupanija.nazzupanija AS zupanija
                    FROM mjerenje
                        JOIN mjeritelji ON mjerenje."mjerenjeID" = mjeritelji."idMjerenja"
                        JOIN osoba ON mjeritelji.mjeritelj = osoba.oib
                        JOIN postaja ON mjerenje.postaja = postaja.id
                        JOIN mjesto ON postaja.mjesto = mjesto.pbr
                        JOIN zupanija ON mjesto.sifzupanija = zupanija.sifzupanija`;

const sqlJSON = `COPY(
                    select row_to_json(t)
                    from (
                    select tlak, vrijeme, datum,
                        (
                        select array_to_json(array_agg(row_to_json(d)))
                        from (
                            select ime, prezime
                            from osoba
                            join mjeritelji ON osoba.oib = mjeritelji.mjeritelj
                            where "idMjerenja"=mjerenje."mjerenjeID"
                        ) d
                        ) as mjeritelji, postaja.imepostaja AS postaja, postaja.elevacija, postaja.geografska_duzina, postaja.geografska_sirina,
                            mjesto.nazmjesto AS mjesto, zupanija.nazzupanija AS zupanija
                    from mjerenje
                        JOIN postaja ON postaja.id = mjerenje.postaja
                        JOIN mjesto ON mjesto.pbr = postaja.mjesto
                        JOIN zupanija ON mjesto.sifzupanija = zupanija.sifzupanija`;

router.get('/', async function (req, res, next) {
    try {
        let qr = sqlTable.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
        const result = (await db.query(qr, [])).rows;
        res.render('datatable', {
            mjerenja: result,
            linkActive: 'datatable',
        });
    } catch(err){
        console.log(err);
    }
});

router.post('/', async function(req, res, next){
    try{
        let search = req.body.search;
        let category = req.body.stupac; 
        if(category === "svi"){ 
            let genCSV = sqlCSV.concat("\n").concat("WHERE tlak::text LIKE '%" + search) + "%' OR vrijeme::text LIKE '%" + search + "%' OR datum::text LIKE '%" + search + "%' OR imepostaja LIKE '%" + search + "%' OR elevacija::text LIKE '%" + search + "%' OR geografska_duzina::text LIKE '%" + search + "%' OR geografska_sirina::text LIKE '%" + search + "%' OR mjesto.nazmjesto LIKE '%" + search + "%' OR zupanija.nazzupanija LIKE '%" + search + "%' OR mjeritelji::text LIKE '%" + search + "%'";
            genCSV = genCSV.concat("\n").concat(") TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/lab2/webApp/public/resources/queriedResources/tlak.csv' DELIMITER ',' CSV HEADER;");
            (await db.query(genCSV, []));
            let genJSON = sqlJSON.concat("\n").concat("WHERE tlak::text LIKE '%" + search) + "%' OR vrijeme::text LIKE '%" + search + "%' OR datum::text LIKE '%" + search + "%' OR imepostaja LIKE '%" + search + "%' OR elevacija::text LIKE '%" + search + "%' OR geografska_duzina::text LIKE '%" + search + "%' OR geografska_sirina::text LIKE '%" + search + "%' OR mjesto.nazmjesto LIKE '%" + search + "%' OR zupanija.nazzupanija LIKE '%" + search + "%'";
            genJSON = genJSON.concat("\n").concat(") t) TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/lab2/webApp/public/resources/queriedResources/tlak.json'");
            console.log(genJSON);
            (await db.query(genJSON, []));
            let qr = sqlTable.concat("\n").concat("WHERE tlak::text LIKE '%" + search) + "%' OR vrijeme::text LIKE '%" + search + "%' OR datum::text LIKE '%" + search + "%' OR imepostaja LIKE '%" + search + "%' OR elevacija::text LIKE '%" + search + "%' OR geografska_duzina::text LIKE '%" + search + "%' OR geografska_sirina::text LIKE '%" + search + "%' OR mjesto.nazmjesto LIKE '%" + search + "%' OR zupanija.nazzupanija LIKE '%" + search + "%' OR mjeritelji::text LIKE '%" + search + "%'";
            qr = qr.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
            const result = (await db.query(qr, [])).rows;
            res.render('datatable', {
                mjerenja: result,
                linkActive: 'datatable',
            });
        } else {
            let genCSV = sqlCSV.concat("\n").concat("WHERE " + category + "::text LIKE '%" + search + "%'");
            genCSV = genCSV.concat("\n").concat(") TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/lab2/webApp/public/resources/queriedResources/tlak.csv' DELIMITER ',' CSV HEADER;");
            (await db.query(genCSV, []));
            let genJSON = sqlJSON.concat("\n").concat("WHERE " + category + "::text LIKE '%" + search + "%'");
            genJSON = genJSON.concat("\n").concat(") t) TO 'D:/Hudi/FER/TrecaGodina/ZimskiSemestar/otvoreno/lab2/webApp/public/resources/queriedResources/tlak.json'");
            (await db.query(genJSON, []));
            let qr = sqlTable.concat("\n").concat("WHERE " + category + "::text LIKE '%" + search + "%'");
            qr = qr.concat("\n").concat("GROUP BY tlak, vrijeme, datum, mjerenje.\"mjerenjeID\", postaja.imepostaja, elevacija, geografska_duzina, geografska_sirina, mjesto.nazmjesto, zupanija.nazzupanija");
            const result = (await db.query(qr, [])).rows;
                res.render('datatable', {
                    mjerenja: result,
                    linkActive: 'datatable',
                });
        }
        
    } catch(err){
        console.log(err);
    }
    
});

module.exports = router;