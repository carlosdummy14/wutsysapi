const { customError } = require('../errors/customError')
const Assign = require('../models/assign.model')
const Employee = require('../models/employee.model')
const Asset = require('../models/asset.model')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllAssigns = asyncWrapper(async (req, res) => {
  const assigns = await Assign.find({})

  res.status(200).json({ msg: 'assigns', data: assigns, count: assigns.length })
})

const createAssign = asyncWrapper(async (req, res, next) => {
  const { employee: employeeId, assets } = req.body

  if (!employeeId || !assets || assets.length === 0) {
    return next(customError('Please provide a valid assign', 400))
  }

  const employeeToAssign = await Employee.findOne({ _id: employeeId })
  if (!employeeToAssign) {
    return next(customError('Employee did not exist', 400))
  }

  let assetsToAssign = []
  for (const assetId of assets) {
    const validAsset = await Asset.findOne({ _id: assetId })
    if (!validAsset) {
      return next(customError('Asset did not exist', 400))
    }
    if (validAsset.assigned) {
      return next(customError('Asset already assigned', 400))
    }
    const assetToAssign = {
      asset: validAsset._id,
      name: validAsset.genericName,
      serial: validAsset.serialNumber,
    }
    assetsToAssign = [...assetsToAssign, assetToAssign]
  }

  const data = {
    employee: employeeToAssign._id,
    assets: assetsToAssign,
  }

  const newAssign = await Assign.create(data)
  res.status(201).json({ msg: 'assign created', data: newAssign })
})

const getAssign = asyncWrapper(async (req, res, next) => {
  const { id: assignId } = req.params

  const assign = await Assign.findOne({ _id: assignId })
  if (!assign) {
    return next(customError('Assign did not exist', 404))
  }

  res.status(200).json({ msg: 'ok', data: assign })
})

const updateAssign = asyncWrapper(async (req, res, next) => {
  const { internalId, genericName, brand, model, serialNumber, type, comments } = req.body
  const { id: assignId } = req.params

  if (!internalId || !genericName || !brand || !serialNumber || !type) {
    return next(customError('Please provide a valid assign', 400))
  }

  const assignToUpdate = await Assign.findOne({ _id: assignId })
  if (!assignToUpdate) {
    return next(customError('Assign did not exist', 404))
  }

  assignToUpdate.internalId = internalId
  assignToUpdate.genericName = genericName
  assignToUpdate.brand = brand
  assignToUpdate.model = model
  assignToUpdate.serialNumber = serialNumber
  assignToUpdate.type = type
  assignToUpdate.comments = comments

  await assignToUpdate.save({ validateBeforeSave: true })
  res.status(200).json({ msg: 'assign updated', data: assignToUpdate })
})

const deleteAssign = asyncWrapper(async (req, res, next) => {
  const { id: assignId } = req.params

  const assignToDelete = await Assign.findOne({ _id: assignId })
  if (!assignToDelete) {
    return next(customError('Assign did not exist', 404))
  }

  await assignToDelete.remove()

  res.status(200).json({ msg: 'deleted' })
})

module.exports = {
  getAllAssigns,
  createAssign,
  getAssign,
  updateAssign,
  deleteAssign,
}
