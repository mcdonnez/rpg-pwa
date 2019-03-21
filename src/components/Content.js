import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Route, Redirect} from 'react-router-dom';
import CharacterPage from './Content/CharacterPage';
import SelectCharacter from './Content/SelectCharacter';

const styles = theme => ({
	app: {},
	content: {
		padding: 0,
		paddingBottom: theme.spacing.unit * 7,
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center,'
	}
});

function Index() {
	return <h2>Home</h2>;
}

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
			<div className={classes.content}>
				<Route path="/" exact render={() => {
					return <Redirect to="/character"/>;
				}}
				// component={Index}
				/>
				<Route path="/character" exact component={SelectCharacter} />
				<Route path="/character/:character" component={CharacterPage} />
			</div>
		);
	}
}

export default withStyles(styles)(RPG);
