import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import {
	LocationOn as LocationOnIcon,
	LocationOnOutlined as LocationOnOutlinedIcon,
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

import { AppContext } from '../../App';
import { useStyles } from './styles';

const Map = () => {
	const classes = useStyles();
	const isDesktop = useMediaQuery('(min-width: 600px)');
	const {
		coordinates,
		setCoordinates,
		setBounds,
		places,
		setChildClicked,
		defaultImg,
	} = useContext(AppContext);

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
				onChildClick={(child) => {
					setChildClicked(child);
				}}
			>
				{places.length &&
					places.map((place, idx) => {
						const {
							latitude = '',
							longitude = '',
							name = '',
							rating = '',
						} = place;
						return (
							<div
								key={idx}
								className={classes.markerContainer}
								lat={Number(latitude)}
								lng={Number(longitude)}
							>
								{!isDesktop ? (
									<LocationOnIcon />
								) : (
									<Paper elevation={3} className={classes.paper}>
										<Typography
											className={classes.typography}
											variant='subtitle2'
										>
											{name}
										</Typography>
										<img
											className={classes.pointer}
											src={defaultImg}
											alt={name}
										/>
										<Rating
											style={{ fontSize: '1rem' }}
											value={Number(rating)}
											readOnly
										/>
									</Paper>
								)}
							</div>
						);
					})}
			</GoogleMapReact>
		</div>
	);
};

export default Map;
