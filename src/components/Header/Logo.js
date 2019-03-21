import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ScoreIcon from '@material-ui/icons/Score';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
	logo: {
		display: 'flex',
		flexDirection: 'row'
	},
	logoName: {
		marginLeft: theme.spacing.unit,
		alignSelf: 'center'
	}
});

class RPG extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
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
				<IconButton color="inherit">
					<ScoreIcon fontSize="large"/>
				</IconButton>
				<Typography color="inherit" variant="h5" className={classes.logoName}>RPG - PWA</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
