const Asset = require('../models/asset.model')

const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find({})

    res.status(200).json({ msg: 'assets', data: assets, count: assets.length })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createAsset = async (req, res) => {
  try {
    const {
      internalId,
      genericName,
      brand,
      model,
      serialNumber,
      type,
      comments,
    } = req.body

    if (!internalId || !genericName || !brand || !serialNumber || !type) {
      res.status(400).json({ msg: 'Please provide a valid asset' })
      return
    }

    const existAsset = await Asset.findOne({
      $or: [{ internalId }, { serialNumber }],
    })
    if (existAsset) {
      res.status(400).json({ msg: 'Asset already exist' })
      return
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
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getAsset = async (req, res) => {
  try {
    const { id: assetId } = req.params

    if (!assetId) {
      res.status(400).json({ msg: 'Provide a valid asset' })
      return
    }

    const asset = await Asset.findOne({ _id: assetId })
    if (!asset) {
      res.status(404).json({ msg: 'Asset did not exist' })
      return
    }

    res.status(200).json({ msg: 'ok', data: asset })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateAsset = async (req, res) => {
  try {
    const {
      internalId,
      genericName,
      brand,
      model,
      serialNumber,
      type,
      comments,
    } = req.body
    const { id: assetId } = req.params

    if (
      !assetId ||
      !internalId ||
      !genericName ||
      !brand ||
      !serialNumber ||
      !type
    ) {
      res.status(400).json({ msg: 'Please provide a valid asset' })
      return
    }

    const assetToUpdate = await Asset.findOne({ _id: assetId })
    if (!assetToUpdate) {
      res.status(404).json({ msg: 'Asset did not exist' })
      return
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
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteAsset = async (req, res) => {
  try {
    const { id: assetId } = req.params

    if (!assetId) {
      res.status(403).json({ msg: 'Provide a valid asset' })
      return
    }

    const assetToDelete = await Asset.findOne({ _id: assetId })
    if (!assetToDelete) {
      res.status(403).json({ msg: 'Asset did not exist' })
      return
    }

    await assetToDelete.remove()

    res.status(200).json({ msg: 'deleted' })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllAssets,
  createAsset,
  getAsset,
  updateAsset,
  deleteAsset,
}
