const { BadRequestError, NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const asyncWrapper = require('../middleware/asyncWrapper')
const createAvatar = require('../utils/createAvatar')
const Employee = require('../models/employee.model')

const getAllEmployees = asyncWrapper(async (req, res) => {
  const employees = await Employee.find({})

  res.status(StatusCodes.OK).json({ msg: 'employees', data: employees, count: employees.length })
})

const createEmployee = asyncWrapper(async (req, res, next) => {
  const { internalId, name, position, area, avatar } = req.body

  if (!internalId || !name || !position || !area) {
    throw new BadRequestError('Please provide a valid employee')
  }

  const existEmployee = await Employee.findOne({ internalId })
  if (existEmployee) {
    throw new BadRequestError('Employee already exist')
  }

  const data = {
    internalId,
    name,
    position,
    area,
    avatar: avatar || createAvatar(name),
  }

  const newEmployee = await Employee.create(data)
  res.status(StatusCodes.CREATED).json({ msg: 'employee created', data: newEmployee })
})

const getEmployee = asyncWrapper(async (req, res, next) => {
  const { id: employeeId } = req.params

  const employee = await Employee.findOne({ _id: employeeId })
  if (!employee) {
    throw new NotFoundError(`Employee with id:${employeeId} not exist`)
  }

  res.status(StatusCodes.OK).json({ msg: 'ok', data: employee })
})

const updateEmployee = asyncWrapper(async (req, res, next) => {
  const { name, position, area, avatar } = req.body
  const { id: employeeId } = req.params

  if (!name || !position || !area) {
    throw new BadRequestError('Please provide a valid employee')
  }

  const employeeToUpdate = await Employee.findOne({ _id: employeeId })
  if (!employeeToUpdate) {
    throw new NotFoundError(`Employee with id:${employeeId} not exist`)
  }

  employeeToUpdate.name = name
  employeeToUpdate.position = position
  employeeToUpdate.area = area
  employeeToUpdate.avatar = avatar || createAvatar(name)

  await employeeToUpdate.save({ validateBeforeSave: true })
  res.status(StatusCodes.OK).json({ msg: 'employee updated', data: employeeToUpdate })
})

const deleteEmployee = asyncWrapper(async (req, res, next) => {
  const { id: employeeId } = req.params

  const employeeToDelete = await Employee.findOne({ _id: employeeId })
  if (!employeeToDelete) {
    throw new NotFoundError(`Employee with id:${employeeId} not exist`)
  }

  await employeeToDelete.remove()

  res.status(StatusCodes.OK).json({ msg: 'employee deleted' })
})

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
}
