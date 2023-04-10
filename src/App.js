import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [speed, setSpeed] = useState(undefined);
	const [isLocationGranted, setIsLocationGranted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	
	function locationGranterd(position) {
		setIsLocationGranted(true);
		var currentSpeed = (Math.round(position.coords.speed * 10) / 10);

		setSpeed(currentSpeed);
		console.log(currentSpeed);
	}

	function locationDenied() {
		setIsLocationGranted(false);
		setErrorMessage("Please Enable Your Location Services!");
	}

	useEffect(() => {
		const interval = setInterval(() => {
			navigator.geolocation.watchPosition((position) => locationGranterd(position) , locationDenied);
		}, 500);
		
		return () => clearInterval(interval);
	}, []);

  return (
    <div className="App">
			{
				isLocationGranted ? 
					<div className="granted">
						<h2>{speed === null ? 0 : speed} M/S</h2>
						<h2>{(Math.round(speed * 3.6 * 10) / 10)} KM/H</h2>
						<h2>{(Math.round(speed * 2.237 * 10) / 10)} Miles/H</h2>
					</div>
					
					:

					<div className="denied">
						<h1>{errorMessage}</h1>
					</div>
			}
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