import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';

const styles = theme => ({
	app: {}
});

const options = [
	'Profile',
	'My Characters',
	'Logout',
];

const HomeLink = props => <RouterLink to="/" {...props} />;
const CharacterSelect = props => <RouterLink to="/character" {...props} />;
const CharacterProfile = props => <RouterLink to="/character/fighter" {...props} />;

const defaultNav = [
	<Link component={HomeLink} key="home">Home</Link>,
	<Link component={CharacterSelect} key="about">About</Link>,
	<Link component={CharacterProfile} key="users">Users</Link>
];

class RPG extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		classes: PropTypes.object.isRequired
	}

	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleClose = () => {
		this.setState({anchorEl: null});
	};

	async componentDidMount() {

	}

	render() {
		const {classes} = this.props;
		const {anchorEl} = this.state;
		const open = Boolean(anchorEl);

		return (
			<div>
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : undefined}
					aria-haspopup="true"
					onClick={this.handleClick}
					color="inherit"
				>
					<AccountCircle color="inherit"/>
				</IconButton>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							maxHeight: 300,
							width: 200,
						},
					}}
				>
					{defaultNav.map((option, i) => (
						<MenuItem key={i} onClick={this.handleClose}>
							{option}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
