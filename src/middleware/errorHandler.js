const { CustomErrorAPI } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if (err.kind === 'ObjectId') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: `Id:${err.value} is not valid` })
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: 'Ups!! Something was wrong...', err: err.message })
}

module.exports = errorHandler
