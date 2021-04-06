import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Router from './components/layout/Router';
import {GlobalProvider} from './context/Provider'
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true


function App() {
  return (
    <GlobalProvider>
        <BrowserRouter>
          <Navbar/>
          <Router/>
        </BrowserRouter>
      </GlobalProvider>  
   
  );
}

export default App;
