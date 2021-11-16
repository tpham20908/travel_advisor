import React, { useEffect, useState, createContext } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header';
import List from './components/List';
import Map from './components/Map';

const defaultImg =
	'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';
export const AppContext = createContext({});

const App = () => {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [childClicked, setChildClicked] = useState(null);
	const { Provider } = AppContext;

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		getPlacesData(bounds?.sw, bounds?.ne).then((data) => {
			setPlaces(data);
		});
	}, [coordinates, bounds]);

	return (
		<Provider
			value={{
				places,
				coordinates,
				setCoordinates,
				bounds,
				setBounds,
				childClicked,
				setChildClicked,
				defaultImg,
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
