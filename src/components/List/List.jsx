import React, { useState, useContext, useEffect, createRef } from 'react';
import {
	CircularProgress,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@material-ui/core';

import { AppContext, TYPES } from '../../App';
import PlaceDetails from '../PlaceDetails';
import { useStyles } from './styles';

const List = () => {
	const classes = useStyles();

	const [elRefs, setElRefs] = useState([]);
	const { places, childClicked, isLoading, type, setType, rating, setRating } =
		useContext(AppContext);

	useEffect(() => {
		setElRefs((refs) =>
			Array(places?.length)
				.fill()
				.map((_, i) => refs[i] || createRef())
		);
	}, [places]);

	return (
		<div className={classes.container}>
			<Typography variant='h4'>
				Restaurants, Hotels and Attactions around you
			</Typography>
			{isLoading ? (
				<div className={classes.loading}>
					<CircularProgress size='5rem' />
				</div>
			) : (
				<>
					{/* Type selection */}
					<FormControl className={classes.formControl}>
						<InputLabel>Type</InputLabel>
						<Select value={type} onChange={(e) => setType(e.target.value)}>
							<MenuItem value={TYPES.RESTAURANTS}>{TYPES.RESTAURANTS}</MenuItem>
							<MenuItem value={TYPES.HOTELS}>{TYPES.HOTELS}</MenuItem>
							<MenuItem value={TYPES.ATTRACTIONS}>{TYPES.ATTRACTIONS}</MenuItem>
						</Select>
					</FormControl>

					{/* Rating selection */}
					<FormControl className={classes.formControl}>
						<InputLabel>Rating</InputLabel>
						<Select value={rating} onChange={(e) => setRating(e.target.value)}>
							<MenuItem value={0}>All</MenuItem>
							<MenuItem value={3}>Above 3.0</MenuItem>
							<MenuItem value={4}>Above 4.0</MenuItem>
							<MenuItem value={4.5}>Above 4.5</MenuItem>
						</Select>
					</FormControl>

					{/* List */}
					<Grid container spacing={3} className={classes.list}>
						{places?.map((place, idx) => (
							<Grid item key={idx} xs={12} ref={elRefs[idx]}>
								<PlaceDetails
									place={place}
									selected={Number(childClicked) === idx}
									refProp={elRefs[idx]}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</div>
	);
};

export default List;
