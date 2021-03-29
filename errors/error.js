class ErrorHandler extends Error {

    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

}

const handleError = (err, req, res, next) => {

    const { statusCode, message } = err;
    
    res.status(statusCode).json({
        message
    });

}

module.exports = {
    ErrorHandler,
    handleError
}