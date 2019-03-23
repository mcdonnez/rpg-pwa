import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
	techniques: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly'
	},
	card: {
		width: '100%',
		maxWidth: 400,
		marginBottom: theme.spacing.unit * 2,
	},
	header: {
		paddingBottom: theme.spacing.unit * 3,
		textAlign: 'center'
	},
	fab: {
		position: 'fixed',
		bottom: 32,
		right: 32,
	}
});

class RPG extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	static propTypes = {
		classes: PropTypes.object.isRequired,
		character: PropTypes.object,
		handleChange: PropTypes.func,
	}

	state = {
		open: false,
		physical: false,
		mental: false,
		wielding: false
	};

	handleClick = (type) => () => {
		this.setState(state => ({[type]: !state[type]}));
	};

	render() {
		const {classes, character: c, handleChange} = this.props;
		console.log(c);

		return (
			<div className={classes.root}>
				<Typography variant="h4" className={classes.header}>Techniques</Typography>
				<div className={classes.techniques}>
					<Card className={classes.card}>
						<CardActionArea>
							<CardHeader
								avatar={
									<Avatar aria-label="Effort" className={classes.avatar}>
										4
									</Avatar>
								}
								title="Lightning Strike"
								titleTypographyProps={{
									variant: 'h5'
								}}
								subheader={<React.Fragment>
									<Typography variant="subtitle2">2 d10 1 d8</Typography>
									<Typography variant="subtitle2">Ignore Enemy Cover</Typography>
									<Typography variant="subtitle2">Chain to Enemies within 10 feet</Typography>
								</React.Fragment>}
							/>
						</CardActionArea>
					</Card>
					<Card className={classes.card}>
						<CardActionArea>
							<CardHeader
								avatar={
									<Avatar aria-label="Effort" className={classes.avatar}>
										4
									</Avatar>
								}
								title="Fire & Ice"
								titleTypographyProps={{
									variant: 'h5'
								}}
								subheader={<React.Fragment>
									<Typography variant="subtitle2">2 d10</Typography>
									<Typography variant="subtitle2">Dual Wield Attack</Typography>
									<Typography variant="subtitle2">Damage is split between Fire & Ice Damage </Typography>
								</React.Fragment>}
							/>
						</CardActionArea>
					</Card>
					<Card className={classes.card}>
						<CardActionArea>
							<CardHeader
								avatar={
									<Avatar aria-label="Effort" className={classes.avatar}>
										2
									</Avatar>
								}
								title="Thunderous Smite"
								titleTypographyProps={{
									variant: 'h5'
								}}
								subheader={<React.Fragment>
									<Typography variant="subtitle2">1 d10</Typography>
									<Typography variant="subtitle2">Enemy must make a saving throw</Typography>
								</React.Fragment>}
							/>
						</CardActionArea>
					</Card>
				</div>
				<Fab color="secondary" aria-label="Add" className={classes.fab}>
					<AddIcon />
				</Fab>
				{/* Card About Effort */}
				{/* Card About Skill and Key Ability */}
				{/* Card About Weapon */}
				{/* Card About Aspects */}

			</div>
		);
	}
}

export default withStyles(styles)(RPG);
