const { Schema, model } = require('mongoose')

const EmployeeSchema = new Schema(
  {
    internalId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: [20, 'internalId too large max size 20'],
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: [50, 'name too large max size 50'],
    },
    position: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, 'position too large max size 20'],
    },
    area: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, 'area too large max size 20'],
    },
    avatar: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Employee', EmployeeSchema)
