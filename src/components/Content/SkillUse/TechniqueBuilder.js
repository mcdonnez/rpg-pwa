import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {CardContent, CardActions} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Technique from '../../../modules/Technique';
import Tooltip from '@material-ui/core/Tooltip';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
	builderActions: {
		flexDirection: 'column'
	},
	saveButton: {
		width: '100%',
		maxWidth: 384,
	},
	cardBuilder: {
		maxWidth: 900,
		width: '100%'
	},
	cardContent: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	formControl: {
		width: '100%',
		maxWidth: 270,
		margin: theme.spacing.unit,
		marginBottom: theme.spacing.unit * 2,
	},
	aspectControl: {
		width: '100%',
		maxWidth: 900,
		margin: theme.spacing.unit,
		marginBottom: theme.spacing.unit * 2,
	},
	aspect: {
		paddingLeft: 0
	},
	aspectToggles: {
		display: 'flex',
		flexDirection: 'column'
	},
	resultHeader: {
		padding: theme.spacing.unit / 2
	},
	oneEffort: {
		backgroundColor: green[500],
	},
	twoEffort: {
		backgroundColor: yellow[800],
	},
	threeEffort: {
		backgroundColor: orange[500],
	},
	fourEffort: {
		backgroundColor: red[500],
	},

});

class RPG extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			skill: '',
			ability: '',
			tool: 'None',
			aspects: {
				proficient: false,
				Reliable: false,
				Expert: false
			},
			extension: false,
			technique: new Technique(props.character),
			extensionChecked: false
		};
	}

	static propTypes = {
		classes: PropTypes.object.isRequired,
		character: PropTypes.object,
	}

	handleSkillChange = (event) => {
		let technique = new Technique(this.props.character);
		technique.addSkill(event.target.value);
		this.setState({
			skill: '',
			ability: '',
			tool: 'None',
			aspects: {
				proficient: false,
				precise: false,
				reliable: false
			},
			extension: false,
			technique: technique
		});
		this.setState({
			[event.target.name]: event.target.value,
			ability: event.target.value.ability,
		});
	}

	toggleSkillProficiency = (skill, isProficient) => {
		let technique = this.state.technique;
		technique.addSkill(skill, isProficient);
		this.setState({
			technique
		});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	handleAspectChange = aspect => event => {
		let technique = this.state.technique;
		if (!this.state.aspects[aspect.name]) {
			technique.addAspect(aspect);
		} else {
			technique.removeAspect(aspect);
		}
		this.setState({
			aspects: {
				...this.state.aspects,
				[aspect.name]: !this.state.aspects[aspect.name]
			},
			technique: technique
		});
	}

	handleItemChange = (item, isProficient = false) => event => {
		if (!item) {
			item = this.props.character.weapons.find(weapon => event.target.value === weapon.name);
		}
		let technique = this.state.technique;
		technique.addItem(item, isProficient);
		this.setState({
			technique,
			tool: item ? item.name : 'None'
		});
	}

	handleExtensionChange = extension => event => {
		let technique = this.state.technique;
		if (!this.state.extensionChecked) {
			technique.addExtension(extension);
		} else {
			technique.removeExtension(extension);
		}
		this.setState({
			extensionChecked: !this.state.extensionChecked
		});
	}

	getEffortColor = (effort, classes) => {
		let map = {
			1: classes.oneEffort,
			2: classes.twoEffort,
			3: classes.threeEffort,
			4: classes.fourEffort
		};

		if (map[effort]) {
			return map[effort];
		} else {
			return map[4];
		}
	}

	render() {
		const {classes, character: c} = this.props;
		const {skill, ability, tool, aspects, extensionChecked, technique} = this.state;
		const techniqueResult = technique.result;
		let effortLevel = this.getEffortColor(techniqueResult.effort, classes);
		console.log(this.state);

		return (
			<Card className={classes.cardBuilder}>
				<CardHeader title="Technique Builder"/>
				<CardContent >
					<div className={classes.cardContent}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="skill-helper">Skill</InputLabel>
							<Select
								value={skill}
								onChange={this.handleSkillChange}
								input={<Input name="skill" id="skill-helper" />}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{c.skills.map(skill => (
									<MenuItem key={skill.name} value={skill}>{skill.name}</MenuItem>
								))}
							</Select>
						</FormControl>
						{skill &&
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="ability-helper">Ability</InputLabel>
								<Select
									value={ability}
									onChange={this.handleChange}
									input={<Input name="ability" id="ability-helper" />}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{skill.ability && <MenuItem value={skill.ability}>{skill.ability}</MenuItem>}
								</Select>
							</FormControl>}
						{skill &&
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="tool-helper">Tool</InputLabel>
								<Select
									value={tool}
									onChange={this.handleItemChange()}
									input={<Input name="tool" id="tool-helper" />}
								>
									<MenuItem value="None">
										<em>None</em>
									</MenuItem>
									{c.weapons.map(weapon => (
										<MenuItem key={weapon.name} value={weapon.name}>{weapon.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						}
					</div>
					{skill && <div className={classes.cardContent}>
						<FormControl component="fieldset" className={classes.aspectControl}>
							<FormLabel component="legend">Skill Proficient</FormLabel>
							<List>
								<ListItem role={undefined} button onClick={() => this.toggleSkillProficiency(technique.skill, !technique.skill.isProficient)} className={classes.aspect}>
									<Switch
										checked={!!technique.skill.isProficient}
										onChange={() => {}}
										value="yes"
										color="primary"
									/>
									<ListItemText primary={'Proficient'} secondary={<React.Fragment>
										<Typography variant="subtitle2">{'Plus 2 to base score'}</Typography>
									</React.Fragment>}/>
								</ListItem>
							</List>
						</FormControl>
						{tool !== 'None' &&
						<FormControl component="fieldset" className={classes.aspectControl}>
							<FormLabel component="legend">Weapon Proficient</FormLabel>
							<List>
								<ListItem role={undefined} button onClick={this.handleItemChange(technique.item, !technique.item.isProficient)} className={classes.aspect}>
									<Switch
										checked={!!technique.item.isProficient}
										onChange={() => {}}
										value="yes"
										color="primary"
									/>
									<ListItemText primary={'Proficient'} secondary={<React.Fragment>
										<Typography variant="subtitle2">{'Plus 2 to base score'}</Typography>
									</React.Fragment>}/>
								</ListItem>
							</List>
						</FormControl>
						}
					</div>}
					{skill && <div className={classes.cardContent}>
						<FormControl component="fieldset" className={classes.aspectControl}>
							<FormLabel component="legend">Aspects</FormLabel>
							<List>
								{skill.aspects && skill.aspects.map(aspect => (
									<ListItem key={aspect.name} role={undefined} button onClick={this.handleAspectChange(aspect)} className={classes.aspect}>
										<Switch
											checked={!!this.state.aspects[aspect.name]}
											onChange={() => {}}
											value="yes"
											color="primary"
										/>
										<ListItemText primary={aspect.name} secondary={<React.Fragment>
											{aspect.bonus && <Typography variant="subtitle2">{this.state.technique.calculateDice(aspect).dice} ({aspect.bonus})</Typography>}
											<Typography variant="subtitle2">{aspect.effect}</Typography>
										</React.Fragment>}/>
									</ListItem>
								))}
							</List>
						</FormControl>
					</div>}
					{skill && <FormControl component="fieldset" className={classes.aspectControl}>
						<FormLabel component="legend">Extension</FormLabel>
						<List>
							{c.extensions.map(extension => (
								<ListItem key={extension.name} role={undefined} button onClick={this.handleExtensionChange(extension)} className={classes.aspect}>
									<Switch
										checked={extensionChecked}
										value="yes"
										color="primary"
									/>
									<ListItemText primary={extension.name} secondary={<React.Fragment>
										{extension.bonus && <Typography variant="subtitle2">{this.state.technique.calculateDice(extension).dice} ({extension.bonus})</Typography>}
										<Typography variant="subtitle2">{extension.effect}</Typography>
									</React.Fragment>}/>
								</ListItem>
							))}
						</List>
					</FormControl>}
					<CardHeader classes={{root: classes.resultHeader}} title="Result"/>
					<CardHeader
						avatar={
							<Tooltip title={'Effort Required'}>
								<Avatar aria-label="Effort" className={classes.avatar + ' ' + effortLevel}>
									{techniqueResult.effort}
								</Avatar>
							</Tooltip>
						}
						titleTypographyProps={{
							variant: 'h5'
						}}
						subheader={<React.Fragment>
							<Typography variant="subtitle2">{techniqueResult.dice && techniqueResult.dice.join(', ')}</Typography>
							{techniqueResult.effects && techniqueResult.effects.map(effect => (
								<Typography variant="subtitle2" key={effect.name}>{effect.effect}</Typography>
							))}
							{techniqueResult.extensions && techniqueResult.extensions.map(extension => (
								<Typography variant="subtitle2" key={extension.name}>{extension.effect}</Typography>
							))}
						</React.Fragment>}
					/>
				</CardContent>
				<CardActions className={classes.builderActions}>
					<Button size="small" variant="contained" color="secondary" className={classes.saveButton}>Save</Button>
				</CardActions>
			</Card>
		);
	}
}

export default withStyles(styles)(RPG);
