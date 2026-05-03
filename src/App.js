import Header from './Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <p>
          Bienvenue ! Cette application vous aide à trouver
          votre ligne de bus à Dakar.
        </p>
      </main>
    </div>
  );
}

export default App;