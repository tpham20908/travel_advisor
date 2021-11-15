import React from 'react';

import { useStyles } from './styles';

const PlaceDetails = ({ place }) => {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<h1>{place.name}</h1>
		</div>
	);
};

export default PlaceDetails;
