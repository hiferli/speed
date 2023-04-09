import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [speed, setSpeed] = useState(undefined);
	const [isLocationGranted, setIsLocationGranted] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	
	function locationGranterd(position) {
		setIsLocationGranted(true);
		setSpeed(position.coords.speed);
		console.log(position.coords.speed);
	}

	function locationDenied() {
		setIsLocationGranted(false);
		setErrorMessage("Please Enable Your Location Services!");
	}

	useEffect(() => {
		const interval = setInterval(() => {

			if(navigator.geolocation){
				navigator.geolocation.watchPosition((position) => locationGranterd(position) , locationDenied);
			} else {
				setIsLocationGranted(false);
				setErrorMessage("Geolocation is not supported on This Device. Try using some other device!");
			}

		}, 1000);
		
		return () => clearInterval(interval);
	}, []);

  return (
    <div className="App">
			{
				isLocationGranted ? 
					<div className="granted">
						<h2>{speed === null ? 0 : speed} M/S</h2>
						<h2>{speed * 3.6} KM/H</h2>
						<h2>{speed * 2.237} Miles/H</h2>
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