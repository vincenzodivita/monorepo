import { useState } from 'react';
import './App.css';

const HELLO_API_URL = import.meta.env.VITE_HELLO_API_URL || 'http://localhost:3001';
const VERDURA_API_URL = import.meta.env.VITE_VERDURA_API_URL || 'http://localhost:3003';

function App() {
  const [helloMessage, setHelloMessage] = useState<string>('');
  const [verduraMessage, setVerduraMessage] = useState<string>('');

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

  const fetchVerdura = async () => {
    try {
      const response = await fetch(`${VERDURA_API_URL}/verdura`);
      const data = await response.json();
      setVerduraMessage(data.vegetable);
    } catch (error) {
      setVerduraMessage('Errore nel caricamento');
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>🥬 App Verdura</h1>
      
      <div className="button-container">
        <button onClick={fetchHello} className="button">
          Chiama Hello
        </button>
        <button onClick={fetchVerdura} className="button">
          Chiama Verdura
        </button>
      </div>

      <div className="results">
        {helloMessage && (
          <div className="result-card">
            <strong>Hello dice:</strong> {helloMessage}
          </div>
        )}
        {verduraMessage && (
          <div className="result-card">
            <strong>Verdura dice:</strong> {verduraMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
