import React from 'react';
import {
	Box,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardAction,
	Chip,
	CardActions,
} from '@material-ui/core';
import {
	LocationOn,
	LocationOn as LocationOnIcon,
	Phone as PhoneIcon,
} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

import { useStyles } from './styles';

const PlaceDetails = ({ place }) => {
	const classes = useStyles();
	const {
		name = '',
		photo = '',
		price_level: priceLevel = '',
		ranking = '',
		awards = [],
		cuisine = [],
		address = '',
		phone = '',
		web_url = '',
		website = '',
	} = place;

	if (!name) {
		return null;
	}

	return (
		<Card elevation={6}>
			<CardMedia
				style={{ height: 350 }}
				image={
					photo
						? photo.images.large.url
						: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
				}
				title={name}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5'>
					{name}
				</Typography>

				{/* Price level */}
				<Box display='flex' justifyContent='space-between'>
					<Typography variant='subtitle1'>Price</Typography>
					<Typography gutterBottom variant='subtitle1'>
						{priceLevel}
					</Typography>
				</Box>

				{/* Ranking */}
				<Box display='flex' justifyContent='space-between'>
					<Typography variant='subtitle1'>Ranking</Typography>
					<Typography gutterBottom variant='subtitle1'>
						{ranking}
					</Typography>
				</Box>

				{/* Award */}
				{awards.map((award, idx) => (
					<Box key={idx} display='flex' justifyContent='space-between' my={1}>
						<img src={award.images.small} alt={award.display_name} />
						<Typography variant='subtitle2' color='textSecondary'>
							{award.display_name}
						</Typography>
					</Box>
				))}

				{/* Specialities */}
				{cuisine?.map(({ name }, idx) => (
					<Chip key={idx} size='small' label={name} className={classes.chip} />
				))}

				{/* Address */}
				{!!address && (
					<Typography
						gutterBottom
						variant='body2'
						color='textSecondary'
						className={classes.subtitle}
					>
						<LocationOnIcon /> {address}
					</Typography>
				)}

				{/* Address */}
				{!!phone && (
					<Typography
						gutterBottom
						variant='body2'
						color='textSecondary'
						className={classes.spacing}
					>
						<PhoneIcon /> {phone}
					</Typography>
				)}

				{/* Buttons */}
				<CardActions>
					<Button
						size='small'
						color='primary'
						onClick={() => window.open(web_url, '_blank')}
					>
						Trip Advisor
					</Button>
					<Button
						size='small'
						color='primary'
						onClick={() => window.open(website, '_blank')}
					>
						Website
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
};

export default PlaceDetails;
