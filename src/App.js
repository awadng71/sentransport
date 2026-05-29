import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';
import Carte from './Carte';

function App() {
    const [lignes, setLignes] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState(null);
    const [recherche, setRecherche] = useState("");
    const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

    // 1. Fonction de chargement separee
    function chargerLignes() {
        setChargement(true);
        setErreur(null);
        fetch("http://localhost:5000/lignes")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur serveur : " + response.status);
                }
                return response.json();
            })
            .then(data => {
                setLignes(data);
                setChargement(false);
            })
            .catch(error => {
                setErreur(error.message);
                setChargement(false);
            });
    }

    // 2. Un seul useEffect qui appelle chargerLignes
    useEffect(() => {
        chargerLignes();
    }, []);

    const lignesFiltrees = lignes.filter(l =>
        l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
        l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
        l.numero.includes(recherche)
    );

    
    function handleClickLigne(ligne) {
        if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
            setLigneSelectionnee(null);
            return;
        }
        fetch(`http://localhost:5000/lignes/${ligne.id}`)
            .then(response => response.json())
            .then(data => {
                setLigneSelectionnee(data);
            })
            .catch(error => {
                console.error("Erreur chargement detail :", error);
            });
    }

    if (chargement) {
        return (
            <div className="App">
                <Header />
                <main className="contenu">
                    <p className="message-chargement">Chargement des lignes...</p>
                </main>
            </div>
        );
    }

    if (erreur) {
        return (
            <div className="App">
                <Header />
                <main className="contenu">
                    <div className="message-erreur">
                        <p>Impossible de charger les lignes.</p>
                        <p className="erreur-detail">{erreur}</p>
                        <p>Verifiez que le serveur Flask est lance (python api/app.py).</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="App">
            <Header />
            <main className="contenu">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Recherche valeur={recherche} onChange={setRecherche} />
                    <button className="btn" onClick={chargerLignes}>Recharger</button>
                </div>

                <p className="resultat-recherche">
                    {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''}{' '}
                    trouvee{lignesFiltrees.length > 1 ? 's' : ''}
                </p>

                {lignesFiltrees.map(ligne => (
                    <LigneBus
                        key={ligne.id}
                        numero={ligne.numero}
                        depart={ligne.depart}
                        arrivee={ligne.arrivee}
                        arrets={ligne.arrets}
                        estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
                        onClick={() => handleClickLigne(ligne)}
                    />
                ))}

                {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
               <Carte />  
            </main>
            <Footer />
        </div>
    );
}

export default App;
