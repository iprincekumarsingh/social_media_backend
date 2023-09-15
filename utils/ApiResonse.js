const ApiResponse = (res, data, error, statusCode = 200, status = true) => {
  res.status(statusCode).json({
    data,
    error,
    status,
  });
};

module.exports = {
  ApiResponse,
};
