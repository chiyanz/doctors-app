import { useEffect, useState } from 'react';
import './App.css';

// dataset aquired from the offical NYC physician database: https://www.nydoctorprofile.com/NYPublic/
// data has been parsed into a csv format text
const dataSet = 
`ACCURSO, ANTHONY:Brooklyn , NY Brooklyn:Internal Medicine
  AGENOR, KEESANDRA:Brooklyn , NY:Emergency Medicine
  AGUILERA ZAMBRANO, KATHERINE:Brooklyn , NY:Internal Medicine
  ALI, YAHYA:NY:Internal Medicine
  ANAND, SURYANARAYAN:Brooklyn , NY:Internal Medicine/Gastroenterology
  ANDINO NUNEZ, ANDRES:Brooklyn , NY Brooklyn , NY:Neurology
  ASHKAR, JOHN:Brooklyn , NY:Internal Medicine/Pulmonary Disease and Critical Care Medicine Sleep Medicine
  BADIN, STEVEN:Brooklyn , NY:Internal Medicine/Pulmonary Disease and Critical Care Medicine Sleep Medicine
  BEHRENS, MATTHEW:Brooklyn , NY:Emergency Medicine
  BEREKASHVILI, KETEVAN:Brooklyn , NY Greenvale , NY:Neurology/Vascular Neurology Neurology/Endovascular Surgical Neuroradiology
  BIESIADECKA-MANN, AGATA:Brooklyn , NY:Pediatrics
  CHANG, CELESTE:, NY Brooklyn , NY:Internal Medicine Internal Medicine/Nephrology
  CHANG, JERWAY:Brooklyn , NY:Internal Medicine
  CHANG, NAILUN:Brooklyn , NY:Internal Medicine/Cardiovascular Disease Internal Medicine/Interventional Cardiology Internal Medicine
  CHEEMA, FAREED:Brooklyn , NY:Surgery-General
  CLARK, MAUREEN:Brooklyn , NY Brooklyn:Obstetrics and Gynecology
  CORDEIRO, CHRISTOPHER:Brooklyn , NY:Internal Medicine
  CURCIO, ANGELA:Brooklyn , NY:Neurology/Child Neurology Pediatrics Neurology/Clinical Neurophysiology
  DOMINGUEZ-ECHEVARRIA, ALVARO:New York , NY Brooklyn , NY:Internal Medicine/Cardiovascular Disease
  DUABAN, MARIA:Brooklyn , NY:Pediatrics`

function App() {
  // used to store the complete catalog of doctor objects
  // each doctor has a key that's their name, and value is their information
  const doctors = {}

  // used to keep track of the doctor being selected
  const [selected, setSelected] = useState('')
  // used to store the resulting catalog from filtering by a specific doctor
  const [filtered, setFiltered] = useState([])

  // read the given doctors data and store it in an react state upon initial page load
  const data = dataSet.split("\n").forEach(function (line) {
    const info = line.split(":")
    // assign a random rating from 1-5 for ordering purposes later
    const rating = (Math.round(Math.random() * 5 * 10) / 10)
    const docInfo = {borough: info[1], expertise: info[2].split('/'), rating}
    const name = info[0]
    doctors[name] = docInfo
  })
  
  // default display of the complete catalog
  const doctorElements = Object.keys(doctors).map((key, i) => {
    return docToElement(key, doctors[key])
  })  

  // display filtered catalog if a doctor was selected
  const filteredDoctors = 
    <div className='filtered'>
      <p>Filtered by: {selected}</p>
      <p>Filter results:</p>
      {filtered.map((docArr) => {
    return docToElement(docArr[0], docArr[1])
  })}
    </div>

  // reset selection button logic
  function resetSelections(evt) {
    evt.preventDefault()
    setFiltered([])
  }

  // helper function that maps each doctor to a block for display
  function docToElement(name, info) {
    return (
      <div id={name} className='doctor' onClick={() => filterDoctors(name)}>
        <p>{name}</p>
        <div className='doctor-info'>
          <p>{`Borough: ${info.borough}`}</p> 
          <p>{`Expertise: ${info.expertise}`}</p>
          <p>{`Rating: ${info.rating}`}</p>
        </div>
      </div>
    )
  }

  // updates filtered catalog based on the criteria of the selected doctor
  function filterDoctors(name) {
    setSelected(name)
    const criteria = doctors[name].expertise
    const matches = []
    for(const [key, val] of Object.entries(doctors)){
      if(criteria.some(r=> val.expertise.includes(r))) {
        matches.push([key, val])
      }
    }
    const sortedMatches = matches.sort((a, b) => b[1].rating - a[1].rating)
    setFiltered(sortedMatches)
  }

  return (
    <div className="App">
      <button onClick={resetSelections}>
        Reset
      </button>
      {filtered.length ? filteredDoctors : doctorElements}
    </div>
  );
}

export default App;
