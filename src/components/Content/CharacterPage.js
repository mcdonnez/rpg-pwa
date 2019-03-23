import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import characters from '../../characters';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Stats from './Stats';
import Defend from './Defend';

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%'
	},
	appBar: {
		backgroundColor: theme.palette.grey[600]
	}
});

function TabContainer(props) {
	return (
		<Typography component="div" style={{padding: 8 * 3}}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

class RPG extends React.Component {
	constructor(props) {
		super(props);
		const characterType = props.match.params.character;
		const Character = characters[characterType] || characters['default'];
		this.state = {
			value: 0,
			character: new Character()
		};
	}

	static propTypes = {
		classes: PropTypes.object.isRequired,
		match: PropTypes.any,
	}

	handleChange = (event, value) => {
		this.setState({value});
	};

	handleCharacterChange = (field) => (evt) => {
		const {character} = this.state;
		character[field] = parseInt(evt.target.value) || '';
		character.calculateAbilities();
		this.setState({
			character: character
		});
	}

	render() {
		const {classes} = this.props;
		const {value} = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static" classes={{root: classes.appBar}}>
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="Stats" />
						<Tab label="Skill Use" />
						<Tab label="Defend" />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer><Stats character={this.state.character} handleChange={this.handleCharacterChange}></Stats></TabContainer>}
				{value === 1 && <TabContainer>Skill Use</TabContainer>}
				{value === 2 && <TabContainer><Defend character={this.state.character}></Defend></TabContainer>}
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
