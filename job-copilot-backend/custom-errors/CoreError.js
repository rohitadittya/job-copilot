export class CoreError extends Error {
    name = "Core Error";
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}