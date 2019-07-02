import React from 'react';
import MqttBox from './MqttBox';
import logo from './logo.svg';
import './App.css';


function App() {
  console.log(process.env);
  return (
    <div className="App">
      <header className="App-header">
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        <small>{process.env.REACT_APP_MQTT_BROKER}</small>
        <img src={logo} className="App-logo" alt="logo" />
        <MqttBox />
      </header>
    </div>
  );
}

export default App;
