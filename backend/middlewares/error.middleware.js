const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose: Invalid ObjectId
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose: Duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value: ${Object.keys(err.keyValue).join(', ')}`;
  }

  // Mongoose: Validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Use a logging library in real applications; avoid exposing sensitive info in production
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${err.name}] ${err.message} (${statusCode})`);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
