import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  const locationGranted = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  
  const locationDenied = () => {
    console.log("Location Service Denied");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => locationGranted(position) , locationDenied);
  }, []);

  return (
    <div className="App">
      <h1>
        Latitude: {latitude}
      </h1>

      <h1>
        Longitude: {longitude}
      </h1>
    </div>
  );
}

export default App;

/*
Backbone Code:

setInterval(() => {
    navigator.geolocation.getCurrentPosition((position) => { console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude) } , () => { console.log("Error getting location")})
}, 1000);

*/