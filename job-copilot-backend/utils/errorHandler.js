export const errorHandler = (err, req, res, next) => {
    const errorName = err.name || '';
    const statusCode = err.status || 500;
    const message = err.message || 'Internal server error';
    console.error(`[${errorName}]: Error occurred with Status Code: ${statusCode} and Message: ${message}`);
    res.status(statusCode).json({ status: statusCode, message: message, success: false });
};