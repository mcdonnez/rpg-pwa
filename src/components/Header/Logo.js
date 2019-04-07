import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ScoreIcon from '@material-ui/icons/Score';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

const styles = theme => ({
	logo: {
		display: 'flex',
		flexDirection: 'row'
	},
	link: {
		textDecoration: 'none',
		color: 'inherit'
	},
	logoName: {
		marginLeft: theme.spacing.unit,
		alignSelf: 'center'
	}
});

class RPG extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		classes: PropTypes.object.isRequired
	}

	async componentDidMount() {

	}

	render() {
		const {classes} = this.props;

		return (
			<div className={classes.logo}>
				<Link component={() => (
					<RouterLink to="/" className={classes.link}>
						<IconButton color="inherit">
							<ScoreIcon fontSize="large"/>
						</IconButton>
					</RouterLink>
				)} color="inherit" underline="none">
				</Link>

				<Typography color="inherit" variant="h5" className={classes.logoName}>RPG - PWA</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
