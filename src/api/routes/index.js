const express = require('express');
const router = express.Router();
const system = require('../middleware/system');
const data = require('../middleware/data');

router.route('/healthcheck').get([
	system.healthcheck
]);

router.route('/characters').get([
	data.getCharacters
]);

router.route('/content').get([
	data.getContent
]);

module.exports = router;
