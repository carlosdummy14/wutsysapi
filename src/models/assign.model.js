const { Schema, model } = require('mongoose')

const SingleAssetSchema = new Schema({
  asset: {
    type: Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  name: { type: String },
  serial: { type: String },
})

SingleAssetSchema.path('asset')

const AssignSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    assets: [SingleAssetSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = model('Assign', AssignSchema)
