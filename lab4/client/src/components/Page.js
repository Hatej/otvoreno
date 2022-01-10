import React, { useState } from 'react';
import Home from './Home';
import Datatable from './Datatable';
import Navigation from './Navigation';
import Profile from './Profile';

function Page() {

    const [view, setView] = useState("HOME");
  
    return (
      <div>
        <Navigation setView={setView}/>
        {(() => {
          switch(view){
            case "HOME":
              return <Home/>;
            case "DATATABLE":
              return <Datatable/>;
            case "PROFILE":
              return <Profile/>;
            default:
              break;
          }
        })()}
      </div>  
    )
  }

  export default Page;