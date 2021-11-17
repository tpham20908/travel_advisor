import axios from 'axios';

const getPlacesData = async (type, sw, ne) => {
	const URL = `https://travel-advisor.p.rapidapi.com/${type.toLowerCase()}/list-in-boundary`;
	try {
		const {
			data: { data },
		} = await axios.get(URL, {
			params: {
				bl_latitude: sw?.lat,
				tr_latitude: ne?.lat,
				bl_longitude: sw?.lng,
				tr_longitude: ne?.lng,
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
