class CustomErrorAPI extends Error {
  constructor(message, status) {
    super(message)
    this.status(status)
  }
}

const customError = (message, status) => {
  return new CustomErrorAPI(message, status)
}

module.exports = { CustomErrorAPI, customError }
