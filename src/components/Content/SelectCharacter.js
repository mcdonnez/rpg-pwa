import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CreateYourOwn from './SelectCharacter/CreateYourOwn';
import SelectPrebuilt from './SelectCharacter/SelectPrebuilt';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	selectCharacter: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
		maxWidth: 900,
		maxHeight: 400,
	},
	or: {
		width: 100,
		textAlign: 'center'
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
			<div className={classes.selectCharacter}>
				<CreateYourOwn />
				<Typography className={classes.or}>
					OR
				</Typography>
				<SelectPrebuilt />
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
