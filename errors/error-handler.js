class ErrorHandler extends Error {

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

}

const handleError = (err, req, res, next) => {

    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token');
      }

    if (err.name === 'ErrorHandler') {
        const { statusCode, message } = err;

        res.status(statusCode).json({
            message
        });
    }


}

module.exports = {
    ErrorHandler,
    handleError
}