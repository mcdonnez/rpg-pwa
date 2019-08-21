const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const api = require('../../api/middleware/data');

router.route('/data/:sheet').get([
	api.getDataFromSheet,
	middleware.displayContent
]);

module.exports = router;
