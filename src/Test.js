function Test() {
  const [compteur, modifiercompteur] = useState(0);
  const [nom, setNom] = useStae("Ousmane")
  function Incrementer() {
    modifiercompteur(compteur+1)
  }
  function Decrementer() {
    modifiercompteur(compteur-1)
  }
  return (
    <div classname="Test">
        <button onclick={() => {Incrementer()}}>Incrementer</button>
        {compteur}
        <button  onclick={() => {Decrementer()}}>Decrementer</button>
        <button onclick={(evenement) => {console.log(evenement)}}>Evenement</button>
        <input value={nom} onChange={(e) => {console.log(e.target)}}/>
        
    </div>
  )
}