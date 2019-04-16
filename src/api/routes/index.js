const express = require('express');
const router = express.Router();
const system = require('../middleware/system');

router.route('/healthcheck')
	.get([
		system.healthcheck
	]);

module.exports = router;
