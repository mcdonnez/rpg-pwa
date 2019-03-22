import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = theme => ({
	card: {
		width: 300,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	pos: {
		marginBottom: 12,
	},
});

function SimpleCard(props) {
	const {classes} = props;
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.card}>
			<Link component={() => (
				<RouterLink to="/character/custom" className={classes.link}>
					<CardActionArea >
						<CardContent>
							<Typography variant="h4" color="textPrimary" gutterBottom>
						Create Your Own
							</Typography>
							<Typography color="textSecondary" gutterBottom>
						Build your character from the ground up.
							</Typography>
						</CardContent>
					</CardActionArea>
				</RouterLink>
			)} color="inherit" underline="none">
			</Link>

		</Card>
	);
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
