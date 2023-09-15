// errorResponse.js
function ApiError(errorData, errorMessage, statusCode = 500) {
  return {
    data: errorData,
    error: errorMessage,
    response: statusCode,
    status: false,
  };
}

module.exports = { ApiError };
