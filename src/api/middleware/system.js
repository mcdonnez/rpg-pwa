const log = require('../../bin/log');

module.exports.errorHandler = (err, req, res, next) => {
	log.error({err});
	res.status(err.status || 500);
	res.json({error: err.message});
	next();
};


module.exports.notFoundHandler = (req, res, next) => {
	let err = new Error('Not Found');
	if (req.headers.referer) {
		err.referer = req.headers.referer;
	}
	err.status = 404;
	next(err);
};

module.exports.healthcheck = (req, res, next) => {
	res.json({status: 'ok'});
};
