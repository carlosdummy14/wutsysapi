const { Schema, model } = require('mongoose')

const SingleAssetSchema = new Schema({
  asset: {
    type: Schema.ObjectId,
    ref: 'Asset',
    required: true,
  },
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

// TODO: set to assets assigned=true/false
module.exports = model('Assign', AssignSchema)
