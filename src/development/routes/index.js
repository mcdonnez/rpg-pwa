const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const api = require('../../api/middleware/data');

router.route('/content').get([
	api.getContent,
	middleware.displayContent
]);

module.exports = router;
