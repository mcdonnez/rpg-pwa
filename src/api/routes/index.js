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

module.exports = router;
