const loggingMiddleware = (req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
};

module.exports = loggingMiddleware;
