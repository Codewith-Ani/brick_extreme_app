class ErrorHandler extends Error {
	constructor(message, satusCode) {
		super(message);
		this.statusCode = satusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default ErrorHandler;
