// ResponseHandler.js
class ResponseHandler {
  static sendResponse(res, statusCode, success, message, data = null) {
    const responseObject = { success, message };
    if (data !== null) {
      responseObject.data = data;
    }
    return res.status(statusCode).json(responseObject);
  }

  static error(res, statusCode, message, data = null) {
    return this.sendResponse(res, statusCode, false, message, data);
  }

  static successResponse(res, message, data = null) {
    return this.sendResponse(res, 200, true, message, data);
  }

  static errorResponse(res, statusCode, message) {
    return this.sendResponse(res, statusCode, false, message);
  }
}

module.exports = ResponseHandler;
