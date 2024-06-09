import React, { useEffect } from 'react';
import logo from './logo.svg';
import BasicMap from './map/BasicMap';
import './App.css';
import { useAppDispatch } from './utils/hooks';

const App = () => {
  const dispatch = useAppDispatch()

  /*useEffect(() => {
    dispatch(recieveNewPoint())
    console.log("moi");
    
  }, [dispatch])
  */

  return (
    <div className="App">
      <BasicMap />
      <button>klik!</button>
    </div>
  );
}

export default App;
