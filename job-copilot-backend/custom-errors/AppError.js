export class AppError extends Error {
    name = "App Error";
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}