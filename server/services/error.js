class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode;
    this.message = message;
  };
};

const handleError = (err, res) => res.status(err.statusCode || 500).json(err.message);

module.exports = { ErrorHandler, handleError };
