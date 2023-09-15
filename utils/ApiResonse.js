
function ApiResponse(
  res,
  data = null,
  error = null,
  statusCode = 400,
  status = false
) {
  res.status(statusCode).json({
    data: data,
    error: error,
    statusCode: statusCode,
    status: status,
  });
}

module.exports = { ApiResponse };
