const logger = (req, res, next) => {
  let start = new Date()
  console.log(`${start} : ${req.method} ${req.originalUrl}`)
  next()
}

module.exports = logger;
