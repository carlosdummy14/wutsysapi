const { Schema, model } = require('mongoose')

const EmployeeSchema = new Schema(
  {
    internalId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Employee', EmployeeSchema)
