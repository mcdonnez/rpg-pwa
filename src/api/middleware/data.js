const {google} = require('googleapis');
const asyncHandler = require('express-async-handler');

module.exports.getCharacters = asyncHandler(async (req, res, next) => {
	const sheets = google.sheets('v4');
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: '1ZSLzvbiAccPmVdikXiEEsNQwA3bxGdxxrASMGu6IcsU',
		range: 'Characters!A:Z',
		auth: process.env.GOOGLE_API_KEY
	});
	let keys = response.data.values.shift();
	let characters = response.data.values.map(values => {
		return keys.reduce((map, key, i) => {
			let intValue = parseInt(values[i]);
			map[key.toLowerCase()] = isNaN(intValue) ? values[i] || '' : intValue;
			return map;
		}, {});
	}).map(character => {
		if (character.skills) {
			character.skills = character.skills.split(',').map(val => val.trim());
		}
		if (character.items) {
			character.items = character.items.split(',').map(val => val.trim());
		}
		if (character.armors) {
			character.armors = character.armors.split(',').map(val => val.trim());
		}
		if (character.weapons) {
			character.weapons = character.weapons.split(',').map(val => val.trim());
		}
		if (character.extensions) {
			character.extensions = character.extensions.split(',').map(val => val.trim());
		}
		if (character.aspects) {
			character.aspects = character.aspects.split(',').map(val => val.trim());
		}
		return character;
	});
	req.result = characters;
	next();
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
	req.result = content;
	next();
});

module.exports.getDataFromSheet = asyncHandler(async (req, res, next) => {
	const sheets = google.sheets('v4');
	const sheet = req.params.sheet;
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: '1ZSLzvbiAccPmVdikXiEEsNQwA3bxGdxxrASMGu6IcsU',
		range: `${sheet}!A:Z`,
		auth: process.env.GOOGLE_API_KEY
	});
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
	req.result = content;
	next();
});

