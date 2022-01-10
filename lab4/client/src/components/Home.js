import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
var fileDownload = require('js-file-download');

function Home(props) {

    async function download(file){
        if(file === "CSV"){
            axios.get('http://localhost:8080/download/CSV', {
                responseType: 'blob'
            }).then((res) => {
                    fileDownload(res.data, 'tlak.csv');
            });
        }
        if(file === "JSON"){
            axios.get('http://localhost:8080/download/JSON', {
                responseType: 'blob'
            }).then((res) => {
                    fileDownload(res.data, 'tlak.json');
            });
        }
    }

    return(
        <div className="container d-flex flex-column panel panel-primary border mt-5">
            <div className="panel-heading">Osnovni podaci:</div>
            <ul>
                <li>
                    <span>Licenca: Creative Commons Zero v1.0 Universal</span>
                </li>
                <li>
                    <span>Autor: Matej Hudiček</span>
                </li>
                <li>
                    <span>Verzija: 1.0</span>
                </li>
                <li>
                    <span>Jezik: Hrvatski</span>
                </li>
                <li>
                    <span>Vrsta podataka: podaci vremenskog niza(tlak)</span>
                </li>
                <li>
                    Atributi:
                    <ul>
                        <li>tlak - izmjereni tlak u hPa</li>
                        <li>vrijeme - vrijeme kada je mjerenje obavljeno</li>
                        <li>datum - datum kada je mjerenje obavljeno</li>
                        <li>elevacija - nadmorska visina mjesta na kojem je mjerenje obavljeno</li>
                        <li>mjesto - grad pod koji spada postaja</li>
                        <li>postaja - postaja koja je obavila mjerenje</li>
                        <li>mjeritelji - osoblje koje je izvršilo mjerenje</li>
                        <li>geografska dužina i širina - kordinate mjesta gdje je mjerenje obavljeno</li>
                        <li>županija - županija u kojoj je mjerenje obavljeno</li>
                    </ul>
                </li>
            </ul>
        </div>
    )

    /*
        <li>
            Download:
            <ul>
                <li className="mb-1"><a className="btn btn-danger" onClick={() => download("CSV")}> CSV </a></li>
                <li><a className="btn btn-danger" onClick={() => download("JSON")}> JSON </a></li>
            </ul>
        </li>
    */
        
}

export default Home;