'use strict'
/*
    EXPRESSJS 
    ! EROR HANDLER
*/

module.exports= (err, req, res, next) => {
    const errorStatusCode = res?.errorStatusCode || 500
    res.status(errorStatusCode).send({
        error: true,
        status: false,
        message: err.message,
        // cause: err.cause,
        // stack: err.stack
    })
}
// app.use(errorHandler)