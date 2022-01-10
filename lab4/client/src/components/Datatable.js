import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
var fileDownload = require('js-file-download');

function Datatable(props) {

    const [dbData, setDbData] = useState([]);
    const [formData, setFormData] = useState({search:"", stupac:"svi"});

    useEffect(() => {
        async function getData() {
            let data = await axios.get(`http://localhost:8080/datatable`).then(res => res.data);
            setDbData(data.result);
            console.log(dbData);
        }
        getData();
    }, []);

    async function download(file){
        if(file === "CSV"){
            axios.get('http://localhost:8080/download/customCSV', {
                responseType: 'blob'
            }).then((res) => {
                    fileDownload(res.data, 'tlak.csv');
            });
        }
        if(file === "JSON"){
            axios.get('http://localhost:8080/download/customJSON', {
                responseType: 'blob'
            }).then((res) => {
                    fileDownload(res.data, 'tlak.json');
            });
        }
    }

    function onChange(event){
        const {name, value} = event.target;
        let newForm = {search: formData.search, stupac: formData.stupac};
        newForm[name] = value;
        console.log(newForm);
        setFormData(newForm);
    }

    async function onSubmit(e){
        e.preventDefault();
        const data = {
            search: formData.search,
            stupac: formData.stupac
        };
        console.log(data);
        const respData = await axios.post('http://localhost:8080/datatable', data)
                    .then(res => res.data);
        setDbData(respData.result);
    }

    return(
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="th-sm">Tlak</th>
                        <th className="th-sm">Vrijeme</th>
                        <th className="th-sm">Datum</th>
                        <th className="th-sm">Postaja</th>
                        <th className="th-sm">Elevacija(m)</th>
                        <th className="th-sm">Geografska dužina</th>
                        <th className="th-sm">Geografska širina</th>
                        <th className="th-sm">Mjesto</th>
                        <th className="th-sm">Županija</th>
                        <th className="th-sm">Mjeritelji</th>
                    </tr>
                </thead>
                <tbody>
                    {dbData.map(r => {
                        return (
                            <tr>
                                <td>{r.tlak}</td>
                                <td>{r.vrijeme}</td>
                                <td>{r.datum}</td>
                                <td>{r.imepostaja}</td>
                                <td>{r.elevacija}</td>
                                <td>{r.geografska_duzina}</td>
                                <td>{r.geografska_sirina}</td>
                                <td>{r.mjesto}</td>
                                <td>{r.zupanija}</td>
                                <td>{r.mjeritelji.map(m => {
                                    return (
                                        m + " "
                                    )
                                })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control input-sm" name="search" placeholder="Search" onChange={onChange} value={formData.search}/>
                    <select className="custom-select" name="stupac" onChange={onChange} value={formData.stupac}>
                        <option value="svi">Sva polja (wildcard)</option>
                        <option value="tlak">Tlak</option>
                        <option value="vrijeme">Vrijeme</option>
                        <option value="datum">Datum</option>
                        <option value="imepostaja">Postaja</option>
                        <option value="elevacija">Elevacija</option>
                        <option value="geografska_duzina">Geografska dužina</option>
                        <option value="geografska_sirina">Geografska širina</option>
                        <option value="mjesto.nazmjesto">Mjesto</option>
                        <option value="zupanija.nazzupanija">Županija</option>
                        <option value="mjeritelji">Mjeritelji</option>
                    </select>
                    <button type="submit" value="Submit" className="btn btn-danger ms-1">Submit</button>
                </div>
            </form>
            <br/>
            Downloads:
            <a class="btn btn-danger me-1" onClick={() => download("CSV")}>CSV</a>
            <a class="btn btn-danger" onClick={() => download("JSON")}>JSON</a>
        </div>
    )
        
}

export default Datatable;