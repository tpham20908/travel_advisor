import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined as LocationOnOutlinedIcon } from '@material-ui/icons';
import Rating from '@material-ui/lab';

import { useStyles } from './styles';

const Map = ({ coordinates, setCoordinates, setBounds }) => {
	const classes = useStyles();
	const isMobile = useMediaQuery('(min-width: 600px)');

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyBXndcGP5uVQIhOPGHC5wDp0Wk8CIu4_go' }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={''}
				onChange={(e) => {
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
				onChildClick={''}
			></GoogleMapReact>
		</div>
	);
};

export default Map;
