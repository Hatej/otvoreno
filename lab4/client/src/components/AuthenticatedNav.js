import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'reactstrap';
import axios from 'axios';
var fileDownload = require('js-file-download');

function AuthenticatedNav(props) {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  async function download(){
      axios.get('http://localhost:8080/download/CSV', {
          responseType: 'blob'
      }).then((res) => {
              fileDownload(res.data, 'tlak.csv');
      });
      axios.get('http://localhost:8080/download/JSON', {
          responseType: 'blob'
      }).then((res) => {
              fileDownload(res.data, 'tlak.json');
      }); 
}

  return isAuthenticated && (
    <div>
        <Button className='btn-danger me-1' onClick={() => {download()}}>Preslika baze</Button>
        <Button className='btn-danger me-1' onClick={() => {props.setView("PROFILE")}}>Profil</Button>
        <Button onClick={() => {
        logout({ returnTo: window.location.origin });
        }} className="btn-danger me-1">Odjava</Button>
    </div>
  );
}

export default AuthenticatedNav;