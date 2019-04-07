import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {CardContent, CardActions} from '@material-ui/core';
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
	aspectToggles: {
		display: 'flex',
		flexDirection: 'row'
	},
	resultHeader: {
		padding: theme.spacing.unit / 2
	}
});

class RPG extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			skill: '',
			ability: '',
			tool: '',
			aspects: {
				proficient: false,
				precise: false,
				reliable: false
			},
			extension: false,
			technique: new Technique(props.character)
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
			tool: '',
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

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	handleAspectChange = aspect => event => {
		let technique = this.state.technique;
		if (event.target.checked) {
			technique.addAspect(aspect);
		} else {
			technique.removeAspect(aspect);
		}
		this.setState({
			aspects: {
				...this.state.aspects,
				[aspect.name]: event.target.checked
			},
			technique: technique
		});
	}

	handleExtensionChange = extension => event => {
		let technique = this.state.technique;
		if (event.target.checked) {
			technique.addExtension(extension);
		} else {
			technique.removeExtension(extension);
		}
		this.setState({
			extensionChecked: event.target.checked
		});
	}

	render() {
		const {classes, character: c} = this.props;
		const {skill, ability, tool, aspects, extensionChecked, technique} = this.state;
		const techniqueResult = technique.result;

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
									onChange={this.handleChange}
									input={<Input name="tool" id="tool-helper" />}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{c.weapons.map(weapon => (
										<MenuItem key={weapon.name} value={weapon}>{weapon.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						}
					</div>
					{skill && <div className={classes.cardContent}>
						<FormControl component="fieldset" className={classes.aspectControl}>
							<FormLabel component="legend">Aspects</FormLabel>
							<FormGroup className={classes.aspectToggles}>
								{skill.aspects && skill.aspects.map(aspect => (
									<FormControlLabel
										key={aspect.name}
										control={
											<Switch
												checked={aspects[aspect.name]}
												onChange={this.handleAspectChange(aspect)}
												value="yes"
												color="primary"
											/>
										}
										label={aspect.name}
									/>
								))}
							</FormGroup>
						</FormControl>
					</div>}
					{skill && <FormControl component="fieldset" className={classes.formControl}>
						<FormLabel component="legend">Extension</FormLabel>
						<FormGroup className={classes.cardContent}>
							{c.extensions.map(extension => (
								<FormControlLabel
									key={extension.name}
									control={
										<Switch
											checked={extensionChecked}
											onChange={this.handleExtensionChange(extension)}
											value="yes"
											color="primary"
										/>
									}
									label={extension.name}
								/>
							))}
						</FormGroup>
					</FormControl>}
					<CardHeader classes={{root: classes.resultHeader}} title="Result"/>
					<CardHeader
						avatar={
							<Avatar aria-label="Effort" className={classes.avatar}>
								{techniqueResult.effort}
							</Avatar>
						}
						titleTypographyProps={{
							variant: 'h5'
						}}
						subheader={<React.Fragment>
							<Typography variant="subtitle2">{techniqueResult.bonuses && techniqueResult.bonuses.map(bonus => bonus.bonus).filter(bonus => bonus.length > 0).join(', ')}</Typography>
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
