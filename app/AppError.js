class AppError extends Error {
    constructor (description, isOperational=false){
        super(description);
        Error.captureStackTrace(this, this.constructor);
        this.isOperational = isOperational;
  }
}


module.exports = AppError;