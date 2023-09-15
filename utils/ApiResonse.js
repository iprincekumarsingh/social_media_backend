// responseUtils.js

function ApiSuccess(data, error, statusCode = 200, status) {
  return {
    data: data,
    error: error,
    response: statusCode,
    status: status,
  };
}

module.exports = { ApiSuccess };
