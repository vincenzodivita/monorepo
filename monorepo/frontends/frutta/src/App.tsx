import { useState } from 'react';
import './App.css';

const HELLO_API_URL = import.meta.env.VITE_HELLO_API_URL || 'http://localhost:3001';
const FRUTTA_API_URL = import.meta.env.VITE_FRUTTA_API_URL || 'http://localhost:3002';

function App() {
  const [helloMessage, setHelloMessage] = useState<string>('');
  const [fruttaMessage, setFruttaMessage] = useState<string>('');

  const fetchHello = async () => {
    try {
      const response = await fetch(`${HELLO_API_URL}/hello`);
      const data = await response.json();
      setHelloMessage(data.message);
    } catch (error) {
      setHelloMessage('Errore nel caricamento');
      console.error(error);
    }
  };

  const fetchFrutta = async () => {
    try {
      const response = await fetch(`${FRUTTA_API_URL}/frutta`);
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
