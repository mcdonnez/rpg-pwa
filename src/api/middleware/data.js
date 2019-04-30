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
