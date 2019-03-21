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
	link: {
		width: '100%',
		padding: '11px 16px',
	},
	menuItem: {
		padding: 0,
		height: 36,
	}
});

const HomeLink = props => <RouterLink to="/" {...props} />;
const CharacterSelect = props => <RouterLink to="/character" {...props} />;
const CharacterProfile = props => <RouterLink to="/character/fighter" {...props} />;

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

		const defaultNav = [
			// <Link component={HomeLink} classes={{
			// 	root: classes.link
			// }} key="home" color="inherit" underline="none">Home</Link>,
			<Link component={CharacterSelect} classes={{
				root: classes.link
			}} key="about" color="inherit" underline="none">Select A Character</Link>,
			<Link component={CharacterProfile} classes={{
				root: classes.link
			}} key="users" color="inherit" underline="none">Character: Fighter</Link>
		];

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
						<MenuItem key={i} onClick={this.handleClose} classes={{
							root: classes.menuItem
						}}>
							{option}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
