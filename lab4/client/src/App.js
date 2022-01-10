import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import Page from './components/Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
