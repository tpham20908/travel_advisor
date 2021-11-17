import axios from 'axios';

const key1 = process.env.REACT_APP_RAPIDAPI_KEY1;
const key2 = process.env.REACT_APP_RAPIDAPI_KEY2;

const getPlacesData = async (type, sw, ne) => {
	const URL = `https://travel-advisor.p.rapidapi.com/${type.toLowerCase()}/list-in-boundary`;
	const options = {
		params: {
			bl_latitude: sw?.lat,
			tr_latitude: ne?.lat,
			bl_longitude: sw?.lng,
			tr_longitude: ne?.lng,
		},
		headers: {
			'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
			'x-rapidapi-key': key2,
		},
	};

	try {
		const {
			data: { data },
		} = await axios.get(URL, options);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const getWeatherData = async (lat, lng) => {
	const URL = `https://community-open-weather-map.p.rapidapi.com/find`;
	const options = {
		params: { lon: lng, lat },
		headers: {
			'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
			'x-rapidapi-key': key2,
		},
	};

	try {
		const { data } = await axios.get(URL, options);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { getPlacesData, getWeatherData };
