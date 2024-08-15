import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';

function App () {
  const [creatureList, setCreatureList] = useState([]);
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

  useEffect( () => {
    fetchCreatures();
  }, [])

  // Get the creatures data from the server and store it in
  // our creatureList React state:
  const fetchCreatures = () => {
    axios({
      method: 'GET',
      url: '/api/creatures'
    })
      .then((response) => {
        console.log('response.data is:', response.data);

        // Store the creatures array in React state:
        setCreatureList(response.data);
      })
      .catch((error) => {
        console.log('Error on get:', error);
      });
  }

  // Function to add a new creature to the database:
  const createCreature = (event) => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/api/creatures',
      data: {
        name: newCreatureName,
        origin: newCreatureOrigin
      }
    })
      .then((response) => {
        // Call fetchCreatures to bring our React app's state back
        // "in sync" with the underlying creatures table:
        fetchCreatures();

        // Clear the form inputs:
        setNewCreatureName('');
        setNewCreatureOrigin('')
      })
      .catch((error) => {
        console.log('Error on add:', error);
      });
  }
  
  return (
    <div className="App">
      <h2>Add Creature</h2>
      <form onSubmit={createCreature}>
        <label>Name:</label>
        <input 
          onChange={(event) => setNewCreatureName(event.target.value)} 
          value={newCreatureName}/>
        <label>Origin:</label>
        <input 
          onChange={(event) => setNewCreatureOrigin(event.target.value)} 
          value={newCreatureOrigin}/>
        <button type="submit">Add New Creature</button>
      </form>

      <h2>All Creatures</h2>
      <ul>
        {
          creatureList.map((creature) => (
            <li key={creature.id}>
              The {creature.name} originated in {creature.origin}.
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App
