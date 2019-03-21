import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Logo from './Header/Logo';
import Settings from './Header/Settings';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const HomeLink = props => <RouterLink to="/" {...props} />;
const CharacterSelect = props => <RouterLink to="/character" {...props} />;
const CharacterProfile = props => <RouterLink to="/character/fighter" {...props} />;

const styles = theme => ({
	app: {},
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	settings: {

	},
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
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar className={classes.appBar}>
						<div className={classes.logo}>
							<Logo />
						</div>
						<div className={classes.settings}>
							<Settings />
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
