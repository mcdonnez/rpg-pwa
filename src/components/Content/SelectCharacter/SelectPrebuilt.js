import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import CardHeader from '@material-ui/core/CardHeader';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = theme => ({
	card: {
		width: 300,
		textAlign: 'center',
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
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	paper: {
		position: 'absolute',
		width: '100%',
		maxWidth: theme.spacing.unit * 100,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		outline: 'none',
		borderRadius: '4px'
	},
	characterCard: {
		width: 200,
	},
	link: {
		textDecoration: 'none'
	},
	header: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	content: {
		backgroundColor: theme.palette.grey[200],
		padding: theme.spacing.unit * 4,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	}
});

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

class SimpleCard extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	};

	state = {
		openModal: false
	}

	openModal = () => {
		this.setState({
			openModal: true,
		});
	}

	closeModal = () => {
		this.setState({
			openModal: false
		});
	}

	render() {
		const {classes} = this.props;

		return (
			<Card className={classes.card}>
				<CardActionArea onClick={this.openModal}>
					<CardContent>
						<Typography variant="h4" color="textPrimary" gutterBottom>
						Quick Build
						</Typography>
						<Typography color="textSecondary" gutterBottom>
						Get started with a prebuilt character.
						</Typography>
					</CardContent>
				</CardActionArea>
				<Modal
					aria-labelledby="Question of the Week"
					aria-describedby="Question of the Week"
					open={this.state.openModal}
					onClose={this.closeModal}
				>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h4" className={classes.header}>Choose A Character</Typography>
						<div className={classes.content}>
							<Card className={classes.characterCard}>
								<Link component={() => (
									<RouterLink to="/character/fighter" className={classes.link}>
										<CardActionArea onClick={() => { }}>
											<CardHeader title={'Fighter'} />
											<CardContent>
												<Typography component="p">
													Do you like hitting stuff? Become a fighter!
												</Typography>
											</CardContent>
										</CardActionArea>
									</RouterLink>
								)} color="inherit" underline="none">
								</Link>
							</Card>
						</div>
					</div>
				</Modal>
			</Card>
		);
	}
}

SimpleCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
