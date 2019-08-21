const express = require('express');
const router = express.Router();
const system = require('../middleware/system');
const data = require('../middleware/data');

router.route('/healthcheck').get([
	system.healthcheck
]);

router.route('/data/:sheet').get([
	data.getDataFromSheet,
	system.returnResult,
]);

router.route('/data').get([
	data.getSheets,
	system.returnResult,
]);

module.exports = router;
