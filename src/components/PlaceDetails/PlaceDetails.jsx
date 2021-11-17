import React, { useContext } from 'react';
import {
	Box,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	Chip,
	CardActions,
} from '@material-ui/core';
import {
	LocationOn as LocationOnIcon,
	Phone as PhoneIcon,
} from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

import { AppContext } from '../../App';
import { useStyles } from './styles';

const PlaceDetails = ({ place, selected, refProp }) => {
	const classes = useStyles();
	const { defaultImg } = useContext(AppContext);
	const {
		name = '',
		photo = '',
		rating = '',
		num_reviews = 0,
		price_level: priceLevel = '',
		ranking = '',
		awards = [],
		cuisine = [],
		address = '',
		phone = '',
		web_url = '',
		website = '',
		write_review = '',
	} = place;

	if (selected) {
		refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	if (!name) {
		return null;
	}

	return (
		<Card elevation={6}>
			<CardMedia
				style={{ height: 350 }}
				image={photo ? photo.images.large.url : defaultImg}
				title={name}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5'>
					{name}
				</Typography>

				{/* Rating */}
				<Box display='flex' justifyContent='space-between' my={2}>
					<Rating name='read-only' value={Number(rating)} readOnly />
					<Typography component='legend'>
						{num_reviews} review{num_reviews > 1 && 's'}
					</Typography>
				</Box>

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
						onClick={() => window.open(website, '_blank')}
					>
						Website
					</Button>
					<Button
						size='small'
						color='primary'
						onClick={() => window.open(web_url, '_blank')}
					>
						Trip Advisor Reviews
					</Button>

					<Button
						size='small'
						color='primary'
						onClick={() => window.open(write_review, '_blank')}
					>
						Write Review
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
};

export default PlaceDetails;
