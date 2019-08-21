const {google} = require('googleapis');
const asyncHandler = require('express-async-handler');

module.exports.getDataFromSheet = asyncHandler(async (req, res, next) => {
	const sheet = req.params.sheet;
	const content = await getDataForSheet(sheet);
	req.result = content;
	next();
});

module.exports.getSheets = asyncHandler(async (req, res, next) => {
	const sheets = google.sheets('v4');
	const response = await sheets.spreadsheets.get({
		spreadsheetId: '1ZSLzvbiAccPmVdikXiEEsNQwA3bxGdxxrASMGu6IcsU',
		auth: process.env.GOOGLE_API_KEY
	});
	const dataTypes = response.data.sheets.map(sheet => sheet.properties.title);
	req.result = {};
	console.log(dataTypes);
	dataRequests = dataTypes.map(sheet => {
		return async function() {
			console.log(sheet);
			req.result[sheet] = await getDataForSheet(sheet);
		}();
	});
	console.log(dataRequests);
	await Promise.all(dataRequests);
	console.log(dataRequests);
	next();
});

async function getDataForSheet(sheet) {
	const sheets = google.sheets('v4');
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: '1ZSLzvbiAccPmVdikXiEEsNQwA3bxGdxxrASMGu6IcsU',
		range: `${sheet}!A:Z`,
		auth: process.env.GOOGLE_API_KEY
	});
	if (!response.data.values) {
		return [];
	}
	let keys = response.data.values.shift();
	let content = response.data.values.map(values => {
		return keys.reduce((map, key, i) => {
			let val = values[i] || '';
			if (val.includes(',')) { // is it an array
				map[key] = val.split(',').map(value => value.trim());
			// } else if (val.match(/^\(.+\)$/)) { // is it a formula
			// 	map[key] = {
			// 		formula: val,
			// 		variables: val.match(/\[[^\]]+\]/gi).map(value => value.replace(/\[|\]/g, ''))
			// 	};
			} else {
				map[key] = val;
			}
			return map;
		}, {});
	});
	return content;
};
