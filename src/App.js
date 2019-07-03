import React from 'react';
import { Container } from 'semantic-ui-react';
import MqttBox from './MqttBox';
import './App.css';


function App() {
  console.log(process.env);
  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <p>
            <small>You are running this application in <strong>{process.env.NODE_ENV}</strong> mode.</small>
          </p>
          <p>
            <small>[MQTT broker] {process.env.REACT_APP_MQTT_BROKER}:{process.env.REACT_APP_MQTT_PORT}</small>
          </p>
          <MqttBox />
        </header>
      </Container>
    </div>
  );
}

export default App;
