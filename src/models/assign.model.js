const { Schema, model } = require('mongoose')

const SingleAssetSchema = new Schema({
  asset: {
    type: Schema.ObjectId,
    ref: 'Asset',
    required: true,
  },
  name: { type: String },
  serial: { type: String },
})

const AssignSchema = new Schema(
  {
    employee: {
      type: Schema.ObjectId,
      ref: 'Employee',
      required: true,
    },
    assets: [SingleAssetSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = model('Assign', AssignSchema)
