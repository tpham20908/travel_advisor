import axios from 'axios';

const URL =
	'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
const options = {
	method: 'GET',
	url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
	params: {
		bl_latitude: '11.847676',
		tr_latitude: '12.838442',
		bl_longitude: '109.095887',
		tr_longitude: '109.149359',
		restaurant_tagcategory_standalone: '10591',
		restaurant_tagcategory: '10591',
		limit: '30',
		currency: 'USD',
		open_now: 'false',
		lunit: 'km',
		lang: 'en_US',
	},
	headers: {
		'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
		'x-rapidapi-key': 'b0796f51ebmshac0e3a3f6af5491p18fa55jsnff80a242c9a8',
	},
};

const getPlacesData = async (sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(URL, {
			params: {
				bl_latitude: sw.lat,
				tr_latitude: ne.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
			},
			headers: {
				'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
				'x-rapidapi-key': 'b0796f51ebmshac0e3a3f6af5491p18fa55jsnff80a242c9a8',
			},
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { getPlacesData };
