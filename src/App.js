import { useEffect, useState } from 'react';
import './App.css';

function App() {

	const [latitude, setLatitude] = useState(undefined);
	const [longitude, setLongitude] = useState(undefined);
	const [distance, setDistance] = useState(undefined);

	const [isLocationGranted, setIsLocationGranted] = useState(false);

	const locationGranted = (position) => {
		setIsLocationGranted(true)
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	};

	const locationDenied = () => {
		console.log("Location Service Denied");
	};

	function calculateDistance(lat1, lon1, lat2, lon2) {
		var p = 0.017453292519943295;    // Math.PI / 180
		var c = Math.cos;
		var a = 0.5 - c((lat2 - lat1) * p) / 2 +
			c(lat1 * p) * c(lat2 * p) *
			(1 - c((lon2 - lon1) * p)) / 2;

		return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}


	useEffect(() => {
		setInterval(() => {
			if (latitude === undefined && longitude === undefined) {
				navigator.geolocation.getCurrentPosition((position) => locationGranted(position), locationDenied);
			} else {
				let oldLatitude = latitude;
				let oldLongitude = longitude;
				navigator.geolocation.getCurrentPosition((position) => locationGranted(position), locationDenied);
				
				let distance = calculateDistance(oldLatitude, oldLongitude, latitude, longitude);
				setDistance(distance);
				console.log(distance)
			}
		}, 1000);
	}, [latitude , longitude]);

	return (
		<div className="App">
			{
				isLocationGranted ? 
					<div className="locationGranted">
						<h1>
							Latitude: {latitude}
						</h1>

						<h1>
							Longitude: {longitude}
						</h1>

						<h1>
							Distance: {distance}
						</h1>
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