const { CustomErrorAPI } = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.status).json({ msg: err.message })
  }

  return res
    .status(500)
    .json({ msg: 'Ups!! Something was wrong...', err: err.message })
}

module.exports = errorHandler
