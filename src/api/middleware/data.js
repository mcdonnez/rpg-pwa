const {google} = require('googleapis');
const asyncHandler = require('express-async-handler');

module.exports.getCharacters = asyncHandler(async (req, res, next) => {
	const sheets = google.sheets('v4');
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: '1ZSLzvbiAccPmVdikXiEEsNQwA3bxGdxxrASMGu6IcsU',
		range: 'Characters!A:Z',
		auth: process.env.GOOGLE_API_KEY
	});
	res.json(response.data.values);
});

module.exports.getContent = asyncHandler(async (req, res, next) => {
	const sheets = google.sheets('v4');
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: '1ZSLzvbiAccPmVdikXiEEsNQwA3bxGdxxrASMGu6IcsU',
		range: 'Content!A:Z',
		auth: process.env.GOOGLE_API_KEY
	});
	let keys = response.data.values.shift();
	let content = response.data.values.map(values => {
		return keys.reduce((map, key, i) => {
			map[key] = values[i] || '';;
			return map;
		}, {});
	}).map(item => {
		if (item.Tags) {
			item.Tags = item.Tags.split(',').map(item => item.trim());
		}
		if (item.Value_1) {
			item.Value_1 = item.Value_1.split(',').map(item => item.trim());
		} else {
			item.Value_1 = [];
		}
		if (item.Value_2) {
			item.Value_2 = item.Value_2.split(',').map(item => item.trim());
		} else {
			item.Value_2 = [];
		}
		if (item.Value_3) {
			item.Value_3 = item.Value_3.split(',').map(item => item.trim());
		} else {
			item.Value_3 = [];
		}
		if (item.Tags) {
			item.Computed = item.Tags.map((tag, i) => `${tag} is ${item.Value_1[i] ? item.Value_1[i] : ''} ${item.Value_2[i] ? item.Value_2[i] : ''}`.trim());
		}
		return item;
	});
	res.json(content);
});
