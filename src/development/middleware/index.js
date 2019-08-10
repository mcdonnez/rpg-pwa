const log = require('../../bin/log');

module.exports.displayContent = (req, res, next) => {
	let html = ``;
	req.result.forEach(result => {
		Object.keys(result).forEach(key => {
			if (['Computed', 'Tags', 'Value_1', 'Value_2', 'Value_3'].includes(key)) {
				html += `<b>${key}</b><br>`;
				result[key].forEach(value => {
					html += `${value}<br>`;
				});
			} else {
				html += `<b>${key}</b> ${result[key]}<br>`;
			}
		});
		html += '<br><br>';
	});
	res.send(html);
};
