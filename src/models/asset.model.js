const { Schema, model } = require('mongoose')

const AssetSchema = new Schema(
  {
    internalId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: [20, 'internalId too large max size 20'],
    },
    genericName: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, 'generic name too large max size 20'],
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, 'brand too large max size 20'],
    },
    model: {
      type: String,
      trim: true,
      maxlength: [20, 'model too large max size 20'],
      default: 'N/A',
    },
    serialNumber: {
      type: String,
      trim: true,
      required: true,
      maxlength: [20, 'serial number too large max size 20'],
    },
    type: {
      type: String,
      required: true,
      enum: ['HARDWARE', 'SOFTWARE', 'OTHER'],
      default: 'HARDWARE',
    },
    comments: {
      type: String,
      trim: true,
      maxlength: [100, 'comments too large max size 100'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Asset', AssetSchema)
