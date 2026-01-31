import { useState } from 'react';
import './App.css';

function App() {
  const [helloMessage, setHelloMessage] = useState<string>('');
  const [fruttaMessage, setFruttaMessage] = useState<string>('');

  const fetchHello = async () => {
    try {
      const response = await fetch('http://localhost:3001/hello');
      const data = await response.json();
      setHelloMessage(data.message);
    } catch (error) {
      setHelloMessage('Errore nel caricamento');
      console.error(error);
    }
  };

  const fetchFrutta = async () => {
    try {
      const response = await fetch('http://localhost:3002/frutta');
      const data = await response.json();
      setFruttaMessage(data.fruit);
    } catch (error) {
      setFruttaMessage('Errore nel caricamento');
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>🍌 App Frutta</h1>
      
      <div className="button-container">
        <button onClick={fetchHello} className="button">
          Chiama Hello
        </button>
        <button onClick={fetchFrutta} className="button">
          Chiama Frutta
        </button>
      </div>

      <div className="results">
        {helloMessage && (
          <div className="result-card">
            <strong>Hello dice:</strong> {helloMessage}
          </div>
        )}
        {fruttaMessage && (
          <div className="result-card">
            <strong>Frutta dice:</strong> {fruttaMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
