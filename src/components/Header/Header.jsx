import React, { useContext } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import { SearchSharp as SearchIcon } from '@material-ui/icons';

import { AppContext } from '../../App';
import { useStyles } from './styles';

const Header = () => {
	const classes = useStyles();
	const { onLoad, onPlaceChanged } = useContext(AppContext);

	return (
		<AppBar position='relative'>
			<Toolbar className={classes.toolbar}>
				<Typography variant='h5' className={classes.title}>
					Travel Advisor
				</Typography>
				<Box display='flex'>
					<Typography variant='h6' className={classes.title}>
						Explore new places
					</Typography>

					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>

							<InputBase
								placeholder='Search...'
								classes={{ root: classes.inputRoot, input: classes.inputInput }}
							/>
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
