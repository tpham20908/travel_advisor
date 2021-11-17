import React, { useEffect, useState, createContext } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

export const TYPES = {
	RESTAURANTS: 'Restaurants',
	HOTELS: 'Hotels',
	ATTRACTIONS: 'Attractions',
};

const defaultImg =
	'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';
export const AppContext = createContext({});

const App = () => {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [type, setType] = useState(TYPES.RESTAURANTS);
	const [rating, setRating] = useState('');
	const [autocomplete, setAutocomplete] = useState(null);
	const { Provider } = AppContext;

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);
			getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
				setPlaces(data?.filter((place) => place.name && place.num_reviews));
				setIsLoading(false);
			});
		}
	}, [bounds, type]);

	const onLoad = (autoComplete) => {
		setAutocomplete(autoComplete);
	};

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat();
		const lng = autocomplete.getPlace().geometry.location.lng();
		setCoordinates({ lat, lng });
	};

	const filteredPlaces = places?.filter((place) => place?.rating > rating);

	return (
		<Provider
			value={{
				places: filteredPlaces,
				coordinates,
				setCoordinates,
				bounds,
				setBounds,
				childClicked,
				setChildClicked,
				defaultImg,
				isLoading,
				type,
				setType,
				rating,
				setRating,
				autocomplete,
				setAutocomplete,
				onLoad,
				onPlaceChanged,
			}}
		>
			<CssBaseline>
				<Header />
				<Grid container spacing={3} style={{ width: '100%' }}>
					<Grid item xs={12} md={4}>
						<List />
					</Grid>
					<Grid item xs={12} md={8}>
						<Map />
					</Grid>
				</Grid>
			</CssBaseline>
		</Provider>
	);
};

export default App;
