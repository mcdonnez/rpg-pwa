import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Logo from './Header/Logo';
import Settings from './Header/Settings';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

const HomeLink = props => <RouterLink to="/" {...props} />;
const CharacterSelect = props => <RouterLink to="/character" {...props} />;
const CharacterProfile = props => <RouterLink to="/character/fighter" {...props} />;

const styles = theme => ({
	app: {},
	header: {
		height: '120px',
		padding: '15px 50px',
		position: 'relative',
		display: 'flex',
		alignItems: 'flex-end',
		backgroundColor: theme.palette.primary.main,
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
			<div className={classes.header}>
				<Logo></Logo>
				<Settings></Settings>
				<nav>
					<ul>
						<li>
							<Link component={HomeLink}>Home</Link>
						</li>
						<li>
							<Link component={CharacterSelect}>About</Link>
						</li>
						<li>
							<Link component={CharacterProfile}>Users</Link>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
