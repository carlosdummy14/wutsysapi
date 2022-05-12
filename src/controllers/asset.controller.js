const { customError } = require('../errors/customError')
const Asset = require('../models/asset.model')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllAssets = asyncWrapper(async (req, res) => {
  const assets = await Asset.find({})

  res.status(200).json({ msg: 'assets', data: assets, count: assets.length })
})

const createAsset = asyncWrapper(async (req, res, next) => {
  const { internalId, genericName, brand, model, serialNumber, type, comments } = req.body

  if (!internalId || !genericName || !brand || !serialNumber || !type) {
    next(customError('Please provide a valid asset', 400))
  }

  const existAsset = await Asset.findOne({
    $or: [{ internalId }, { serialNumber }],
  })

  if (existAsset) {
    next(customError('Asset already exist', 400))
  }

  const data = {
    internalId,
    genericName,
    brand,
    model,
    serialNumber,
    type,
    comments,
  }

  const newAsset = await Asset.create(data)
  res.status(201).json({ msg: 'asset created', data: newAsset })
})

const getAsset = asyncWrapper(async (req, res, next) => {
  const { id: assetId } = req.params

  if (!assetId) {
    next(customError('Please provide a valid asset', 400))
  }

  const asset = await Asset.findOne({ _id: assetId })
  if (!asset) {
    next(customError('Asset did not exist', 404))
  }

  res.status(200).json({ msg: 'ok', data: asset })
})

const updateAsset = asyncWrapper(async (req, res, next) => {
  const { internalId, genericName, brand, model, serialNumber, type, comments } = req.body
  const { id: assetId } = req.params

  if (!assetId || !internalId || !genericName || !brand || !serialNumber || !type) {
    next(customError('Please provide a valid asset', 400))
  }

  const assetToUpdate = await Asset.findOne({ _id: assetId })
  if (!assetToUpdate) {
    next(customError('Asset did not exist', 404))
  }

  assetToUpdate.internalId = internalId
  assetToUpdate.genericName = genericName
  assetToUpdate.brand = brand
  assetToUpdate.model = model
  assetToUpdate.serialNumber = serialNumber
  assetToUpdate.type = type
  assetToUpdate.comments = comments

  await assetToUpdate.save({ validateBeforeSave: true })
  res.status(200).json({ msg: 'asset updated', data: assetToUpdate })
})

const deleteAsset = asyncWrapper(async (req, res, next) => {
  const { id: assetId } = req.params

  if (!assetId) {
    next(customError('Please provide a valid asset', 400))
  }

  const assetToDelete = await Asset.findOne({ _id: assetId })
  if (!assetToDelete) {
    next(customError('Asset did not exist', 404))
  }

  await assetToDelete.remove()

  res.status(200).json({ msg: 'deleted' })
})

module.exports = {
  getAllAssets,
  createAsset,
  getAsset,
  updateAsset,
  deleteAsset,
}
