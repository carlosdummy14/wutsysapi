const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Asset = require('../models/asset.model')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllAssets = asyncWrapper(async (req, res) => {
  const assets = await Asset.find({})

  res.status(StatusCodes.OK).json({ msg: 'assets', data: assets, count: assets.length })
})

const createAsset = asyncWrapper(async (req, res, next) => {
  const { internalId, genericName, brand, model, serialNumber, type, comments } = req.body

  if (!internalId || !genericName || !brand || !serialNumber || !type) {
    throw new BadRequestError('Please provide a valid asset')
  }

  const existAsset = await Asset.findOne({ $or: [{ internalId }, { serialNumber }] })
  if (existAsset) {
    throw BadRequestError('Asset already exist')
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
  res.status(StatusCodes.CREATED).json({ msg: 'asset created', data: newAsset })
})

const getAsset = asyncWrapper(async (req, res, next) => {
  const { id: assetId } = req.params

  const asset = await Asset.findOne({ _id: assetId })
  if (!asset) {
    throw new NotFoundError(`Asset with id:${assetId} not exist`)
  }

  res.status(StatusCodes.OK).json({ msg: 'ok', data: asset })
})

const updateAsset = asyncWrapper(async (req, res, next) => {
  const { internalId, genericName, brand, model, serialNumber, type, comments } = req.body
  const { id: assetId } = req.params

  if (!internalId || !genericName || !brand || !serialNumber || !type) {
    throw new BadRequestError('Please provide a valid asset')
  }

  const assetToUpdate = await Asset.findOne({ _id: assetId })
  if (!assetToUpdate) {
    throw new NotFoundError(`Asset with id:${assetId} not exist`)
  }

  assetToUpdate.internalId = internalId
  assetToUpdate.genericName = genericName
  assetToUpdate.brand = brand
  assetToUpdate.model = model
  assetToUpdate.serialNumber = serialNumber
  assetToUpdate.type = type
  assetToUpdate.comments = comments

  await assetToUpdate.save({ validateBeforeSave: true })
  res.status(StatusCodes.OK).json({ msg: 'asset updated', data: assetToUpdate })
})

const deleteAsset = asyncWrapper(async (req, res, next) => {
  const { id: assetId } = req.params

  const assetToDelete = await Asset.findOne({ _id: assetId })
  if (!assetToDelete) {
    throw new NotFoundError(`Asset with id:${assetId} not exist`)
  }

  await assetToDelete.remove()

  res.status(StatusCodes.OK).json({ msg: 'deleted' })
})

module.exports = {
  getAllAssets,
  createAsset,
  getAsset,
  updateAsset,
  deleteAsset,
}
