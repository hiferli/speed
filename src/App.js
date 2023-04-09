import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [speed, setSpeed] = useState(0);
	const [locationGiven, setLocationGiven] = useState(false);

	function haveLocation(position) {
		setLocationGiven(true);
		setSpeed(position.coords.speed);
		console.log(position.coords.speed);
	}

	function dontHaveLocation() {
		console.log("No Location Detected");
	}

	useEffect(() => {
		// setInterval(() => {
			navigator.geolocation.watchPosition((position) => haveLocation(position) , dontHaveLocation);
		// }, 1000);
	}, []);

	return (
		<div className="App">
			{
				locationGiven ?
					<div className="locationGranted">
						<h1>Speed: {speed === null ? "E: 0"  : speed}</h1>
					</div>
					:
					<div className="locationDenied">
						<h1>Please enable location to get your speed</h1>
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