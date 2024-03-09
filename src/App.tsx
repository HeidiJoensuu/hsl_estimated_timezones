import React from 'react';
import logo from './logo.svg';
import BasicMap from './map/BasicMap';
import './App.css';
import { recieveInformation } from './services/PointsSevice';

function App() {
  recieveInformation()
  return (
    <div className="App">
      <BasicMap />
      <button>klik!</button>
    </div>
  );
}

export default App;
