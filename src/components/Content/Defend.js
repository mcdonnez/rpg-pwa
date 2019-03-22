import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly'
	},
	card: {
		width: 400,
		marginTop: theme.spacing.unit * 2
	},
	table: {
		maxWidth: 400,
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
				<Card classes={{root: classes.card}}>
					<CardHeader title="Base Physical"/>
					<CardContent>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell align="center" padding="dense">Fortitude</TableCell>
									<TableCell align="right" padding="none"></TableCell>
									<TableCell align="center" padding="dense">Physical Ability</TableCell>
									<TableCell align="right" padding="none"></TableCell>
									<TableCell align="center" padding="dense">Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell align="center" padding="dense">{c.fortitude}</TableCell>
									<TableCell align="right" padding="none">+</TableCell>
									<TableCell align="center" padding="dense">{c.physicalAbility}</TableCell>
									<TableCell align="right" padding="none">=</TableCell>
									<TableCell align="center" padding="dense">{c.fortitude + c.physicalAbility}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card classes={{root: classes.card}}>
					<CardHeader title="Armor"/>
					<CardContent>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell padding="dense">Armor</TableCell>
									<TableCell align="center" padding="dense">Defense</TableCell>
									<TableCell align="center" padding="dense">Block</TableCell>
									<TableCell align="center" padding="dense">Hardened</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{c.armorArray.map((armor) => (
									<TableRow key={armor.name}>
										<TableCell padding="dense" component="th" scope="row">{armor.name}</TableCell>
										<TableCell align="center" padding="dense">{armor.bonus}</TableCell>
										<TableCell align="center" padding="dense">{armor.block}</TableCell>
										<TableCell align="center" padding="dense">{armor.hardened}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card classes={{root: classes.card}}>
					<CardHeader title="Results"/>
					<CardContent>

					</CardContent>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
