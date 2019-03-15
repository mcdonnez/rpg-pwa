import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CreateYourOwn from './SelectCharacter/CreateYourOwn';
import SelectPrebuilt from './SelectCharacter/SelectPrebuilt';

const styles = theme => ({
	app: {}
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
			<div>
				<CreateYourOwn />
				<SelectPrebuilt />
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
