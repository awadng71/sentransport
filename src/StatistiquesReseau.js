function StatReseau({ lignes }) {
  const nbLignes = lignes.length;
  
  let totalArrets = 0;
  for (let i = 0; i < lignes.length; i++) {
    totalArrets = totalArrets + lignes[i].arrets;
  }

  let ligneMax = lignes[0];
  for (let i = 0; i < lignes.length; i++) {
    if (lignes[i].arrets > ligneMax.arrets) {
      ligneMax = lignes[i];
    }
  }

  return (
    <div style={{ border: "1px solid gray", padding: "15px", marginBottom: "20px", color: "darkblue", backgroundColor:"lightgray"}}>
      <h3>Statistiques</h3>
      <p>Total lignes : {nbLignes}</p>
      <p>Total arrêts : {totalArrets}</p>
      <p>Ligne avec le plus d'arrêts : Ligne {ligneMax.numero} avec {ligneMax.arrets} arrêts</p>
    </div>
  );
}

export default StatReseau;