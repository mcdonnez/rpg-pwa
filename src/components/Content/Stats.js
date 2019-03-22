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

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly'
	},
	card: {
		width: 300,
		marginTop: theme.spacing.unit * 2
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

		return (
			<div className={classes.root}>
				<Card classes={{root: classes.card}}>
					<CardHeader title="Vitals"/>
					<CardContent>
						<List>
							<ListItem>
								<ListItemText>
									<TextField
										label="Fortitude"
										className={classes.textField}
										value={c.fortitude}
										type="number"
										onChange={handleChange('fortitude')}
										margin="dense"
									/>
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>
									<TextField
										label="Resolve"
										className={classes.textField}
										value={c.resolve}
										type="number"
										onChange={handleChange('resolve')}
										margin="dense"
									/>
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>
									<TextField
										label="Resilience"
										className={classes.textField}
										value={c.resilience}
										type="number"
										onChange={handleChange('resilience')}
										margin="dense"
									/>
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>
									<TextField
										label="Size"
										className={classes.textField}
										value={c.size}
										type="number"
										onChange={handleChange('size')}
										margin="dense"
									/>
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>
									<TextField
										label="Bulk"
										className={classes.textField}
										value={c.bulk}
										type="number"
										onChange={handleChange('bulk')}
										margin="dense"
									/>
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>
									<TextField
										label="Burden"
										className={classes.textField}
										value={c.burden}
										type="number"
										onChange={handleChange('burden')}
										margin="dense"
									/>
								</ListItemText>
							</ListItem>
						</List>
					</CardContent>
				</Card>
				<div className={classes.root} style={{flexDirection: 'column'}}>
					<Card className={classes.card}>
						<CardHeader title="Abilities"></CardHeader>
						<CardContent>
							<List>
								<ListItem button onClick={this.handleClick('physical')}>
									<ListItemIcon>
										<Avatar className={classes.avatar}>{c.physicalAbility}</Avatar>
									</ListItemIcon>
									<ListItemText inset primary="Physical" />
									{this.state.physical ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse in={this.state.physical} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Coordination"
													className={classes.textField}
													value={c.coordination}
													type="number"
													onChange={handleChange('coordination')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Perception"
													className={classes.textField}
													value={c.perception}
													type="number"
													onChange={handleChange('perception')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Strength"
													className={classes.textField}
													value={c.strength}
													type="number"
													onChange={handleChange('strength')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
									</List>
								</Collapse>
								<ListItem button onClick={this.handleClick('mental')}>
									<ListItemIcon>
										<Avatar className={classes.avatar}>{c.mentalAbility}</Avatar>
									</ListItemIcon>
									<ListItemText inset primary="Mental" />
									{this.state.mental ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse in={this.state.mental} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Education"
													className={classes.textField}
													value={c.education}
													type="number"
													onChange={handleChange('education')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Intellect"
													className={classes.textField}
													value={c.intellect}
													type="number"
													onChange={handleChange('intellect')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Insight"
													className={classes.textField}
													value={c.insight}
													type="number"
													onChange={handleChange('insight')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Wit"
													className={classes.textField}
													value={c.wit}
													type="number"
													onChange={handleChange('wit')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
									</List>
								</Collapse>
								<ListItem button onClick={this.handleClick('wielding')}>
									<ListItemIcon>
										<Avatar className={classes.avatar}>{c.wieldingAbility}</Avatar>
									</ListItemIcon>
									<ListItemText inset primary="Wielding" />
									{this.state.wielding ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse in={this.state.wielding} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Entropy"
													className={classes.textField}
													value={c.entropy}
													type="number"
													onChange={handleChange('entropy')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Focus"
													className={classes.textField}
													value={c.focus}
													type="number"
													onChange={handleChange('focus')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Spirit"
													className={classes.textField}
													value={c.spirit}
													type="number"
													onChange={handleChange('spirit')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
										<ListItem className={classes.nested}>
											<ListItemText>
												<TextField
													label="Truth"
													className={classes.textField}
													value={c.truth}
													type="number"
													onChange={handleChange('truth')}
													margin="dense"
												/>
											</ListItemText>
										</ListItem>
									</List>
								</Collapse>
							</List>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
