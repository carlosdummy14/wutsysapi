const { BadRequestError, NotFoundError } = require('../errors')
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
    throw new BadRequestError('Please provide a valid assign')
  }

  const employeeToAssign = await Employee.findOne({ _id: employeeId })
  if (!employeeToAssign) {
    throw new NotFoundError(`Employee with id:${employeeId} not exist`)
  }

  let assetsToAssign = []
  for (const assetId of assets) {
    const validAsset = await Asset.findOne({ _id: assetId })
    if (!validAsset) {
      throw new NotFoundError(`Asset with id:${assetId} not exist`)
    }
    if (validAsset.assigned) {
      throw new BadRequestError(`Asset with id:${assetId} already assigned`)
    }

    const { genericName: name, serialNumber: serial, _id } = validAsset
    const assetToAssign = {
      asset: _id,
      name,
      serial,
    }
    assetsToAssign = [...assetsToAssign, assetToAssign]
  }

  const data = {
    employee: employeeToAssign._id,
    assets: assetsToAssign,
  }

  const assign = await Assign.create(data)
  res.status(201).json({ msg: 'assign created', data: assign })
})

const getAssign = asyncWrapper(async (req, res, next) => {
  const { id: assignId } = req.params

  const assign = await Assign.findOne({ _id: assignId })
  if (!assign) {
    throw new NotFoundError(`Assign with id:${assignId} not exist`)
  }

  res.status(200).json({ msg: 'ok', data: assign })
})

const updateAssign = asyncWrapper(async (req, res, next) => {
  const { internalId, genericName, brand, model, serialNumber, type, comments } = req.body
  const { id: assignId } = req.params

  if (!internalId || !genericName || !brand || !serialNumber || !type) {
    throw new BadRequestError('Please provide a valid assign')
  }

  const assignToUpdate = await Assign.findOne({ _id: assignId })
  if (!assignToUpdate) {
    throw new NotFoundError(`Assign with id:${assignId}, not exist`)
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
    throw new NotFoundError(`Assign with id:${assignId}, not exist`)
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
