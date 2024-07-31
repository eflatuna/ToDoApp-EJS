"use strict";
/*
    EXPRESSJS 
    ! EROR HANDLER
*/

module.exports = (err, req, res, next) => {
	const errorStatusCode = res?.errorStatusCode || 500;
	console.log(req.originalUrl);
	// res.status(errorStatusCode).send({
	//     error: true,
	//     status: false,
	//     message: err.message,
	//     // cause: err.cause,
	//     // stack: err.stack
	// })

	const data = {
		error: true,
		status: false,
		message: err.message,
		// cause: err.cause,
		// stack: err.stack
	};
	if (req.originalUrl.startsWith("/view")) {
		res.render("error", { data });
	} else {
		res.status(errorStatusCode).send(data);
	}
};
// app.use(errorHandler)
