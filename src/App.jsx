import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [planetData, setPlanetData] = useState([]);

  useEffect(() => {
    const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']; // Move inside useEffect

    const fetchPlanetData = async () => {
      try {
        const results = await Promise.all(
          planetNames.map((name) =>
            fetch(`https://api.api-ninjas.com/v1/planets?name=${name}`, {
              method: 'GET',
              headers: {
                'X-Api-Key': '+N8VDmi3IPpD6ygKcZzhoA==cD7b1gv1GcElTiR6',
                'Content-Type': 'application/json',
              },
            }).then((response) => {
              console.log(response);

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
          )
        );
        setPlanetData(results.flat()); // Combine results into a single array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlanetData();
  }, []); // No dependency on planetNames now

  return (
    <>
      <div className='planet-container'>
        {planetData.map((planet, index) => (
          <div key={index}>
            <h3>{planet.name}</h3>
            <p>Details about {planet.name}</p>
            <ul>
              <li>
                <strong>Mass:</strong> {planet.mass}
              </li>
              <li>
                <strong>Radius:</strong> {planet.radius}
              </li>
              <li>
                <strong>Period:</strong> {planet.period} days
              </li>
              <li>
                <strong>Semi-Major Axis:</strong> {planet.semi_major_axis} AU
              </li>
              <li>
                <strong>Temperature:</strong> {planet.temperature} K
              </li>
              <li>
                <strong>Distance from Earth (Light Years):</strong> {planet.distance_light_year} ly
              </li>
              <li>
                <strong>Host Star Mass:</strong> {planet.host_star_mass} M☉
              </li>
              <li>
                <strong>Host Star Temperature:</strong> {planet.host_star_temperature} K
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
