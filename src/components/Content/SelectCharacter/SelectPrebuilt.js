import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = {
	card: {
		width: 300,
		textAlign: 'center'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
};

function SimpleCard(props) {
	const {classes} = props;
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<CardActionArea className={classes.card}>
			<Card >
				<CardContent>
					<Typography variant="h4" color="textPrimary" gutterBottom>
					Quick Build
					</Typography>
					<Typography color="textSecondary" gutterBottom>
					Get started with a prebuilt character.
					</Typography>
				</CardContent>
			</Card>
		</CardActionArea>
	);
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
