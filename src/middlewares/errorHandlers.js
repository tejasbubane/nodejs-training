exports.catchErrors = (routeHandler) => {
  return (req, res, next) => {
    return routeHandler(req, res, next).catch(next);
  };
};

exports.developmentErrors = (err, req, res, next) => {
  let errorDetails = {
    message: err.message,
    stackTrace: err.stack.split("\n")
  }
  res.status(err.status || 500)
  res.json(errorDetails)
};


// No stacktrace in production env
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message
  });
};
