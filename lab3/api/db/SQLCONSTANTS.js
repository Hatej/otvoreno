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

module.exports = {
    SQL_TABLE : sqlTable,
    SQL_CSV : sqlCSV,
    SQL_JSON : sqlJSON
}