const CustomErrorAPI = require('./customError.js')
const { StatusCodes } = require('http-status-codes')

class NotFound extends CustomErrorAPI {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFound
