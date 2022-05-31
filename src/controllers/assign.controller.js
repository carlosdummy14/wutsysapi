const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const Asset = require('../models/asset.model')
const Assign = require('../models/assign.model')
const asyncWrapper = require('../middleware/asyncWrapper')
const Employee = require('../models/employee.model')

const getAllAssigns = asyncWrapper(async (req, res) => {
  const assigns = await Assign.find({}).populate(['employee', 'assets.asset'])

  res.status(StatusCodes.OK).json({ msg: 'assigns', data: assigns, count: assigns.length })
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

    const assetToAssign = { asset: validAsset._id }

    assetsToAssign = [...assetsToAssign, assetToAssign]
  }

  const data = {
    employee: employeeToAssign._id,
    assets: assetsToAssign,
  }

  const assign = await Assign.create(data)
  res.status(StatusCodes.CREATED).json({ msg: 'assign created', data: assign })
})

const getAssign = asyncWrapper(async (req, res, next) => {
  const { id: assignId } = req.params

  const assign = await Assign.findOne({ _id: assignId })
  if (!assign) {
    throw new NotFoundError(`Assign with id:${assignId} not exist`)
  }

  res.status(StatusCodes.OK).json({ msg: 'ok', data: assign })
})

const getEmployeeAssign = asyncWrapper(async (req, res, next) => {
  const { id: employeeId } = req.params

  const validEmployee = await Employee.findOne({ _id: employeeId })
  if (!validEmployee) {
    throw new NotFoundError(`Employee with id:${employeeId} not exist`)
  }

  const assign = await Assign.findOne({ employee: employeeId }).populate('employee assets.asset')
  if (!assign) {
    return res.status(StatusCodes.OK).json({
      msg: 'ok',
      data: {
        employee: validEmployee,
        assets: [],
      },
    })
  }

  res.status(StatusCodes.OK).json({ msg: 'ok', data: assign })
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
  res.status(StatusCodes.OK).json({ msg: 'assign updated', data: assignToUpdate })
})

const deleteAssign = asyncWrapper(async (req, res, next) => {
  const { id: assignId } = req.params

  const assignToDelete = await Assign.findOne({ _id: assignId })
  if (!assignToDelete) {
    throw new NotFoundError(`Assign with id:${assignId}, not exist`)
  }

  await assignToDelete.remove()

  res.status(StatusCodes.OK).json({ msg: 'deleted' })
})

module.exports = {
  getAllAssigns,
  createAssign,
  getAssign,
  updateAssign,
  deleteAssign,
  getEmployeeAssign,
}
