import RPG from './components/RPG';
import ReactDOM from 'react-dom';
import {renderToString} from 'react-dom/server';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import React from 'react';
// import './manifest.json';
// import './images/favicon.png';
// import './images/manifest/icon-48x48.png';
// import './images/manifest/icon-72x72.png';
// import './images/manifest/icon-96x96.png';
// import './images/manifest/icon-144x144.png';
// import './images/manifest/icon-192x192.png';
// import './images/manifest/icon-512x512.png';
// import './images/manifest/ios-icon-48x48.png';
// import './images/manifest/ios-icon-72x72.png';
// import './images/manifest/ios-icon-96x96.png';
// import './images/manifest/ios-icon-144x144.png';
// import './images/manifest/ios-icon-192x192.png';
// import './images/manifest/ios-icon-512x512.png';
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#007ac0',
		},
		secondary: pink,
	},
});

// For this to work you locally need to manually set the this on line 44
// __resourceQuery = '?http://localhost:8080';
// node_modules/webpack-dev-server/client/index.js
if (global.name !== 'nodejs') {
	const mountPoint = document.getElementById('app');
	ReactDOM.hydrate(<MuiThemeProvider theme={theme}>
		<RPG />
	</MuiThemeProvider>, mountPoint);
}

export default () => {
	return renderToString(<MuiThemeProvider theme={theme}>
		<RPG />
	</MuiThemeProvider>);
};
