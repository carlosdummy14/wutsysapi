const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ msg: 'Ups!! Something was wrong...', err })
}

module.exports = errorHandler
