import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Content from './Content';
import {BrowserRouter as Router} from 'react-router-dom';

const styles = theme => ({
	app: {
		flex: '1 1 auto',
		backfaceVisibility: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		height: '100%',
		maxWidth: '100%',
		position: 'relative'
	},
});

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
			<Router>
				<div className={classes.app}>
					<CssBaseline />
					<Header></Header>
					<Content></Content>
				</div>
			</Router>
		);
	}
}

export default withStyles(styles)(RPG);
