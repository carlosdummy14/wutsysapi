const { customError } = require('../errors/customError')
const asyncWrapper = require('../middleware/asyncWrapper')
const createAvatar = require('../utils/createAvatar')
const Employee = require('../models/employee.model')

const getAllEmployees = asyncWrapper(async (req, res) => {
  const employees = await Employee.find({})

  res.status(200).json({ msg: 'employees', data: employees, count: employees.length })
})

const createEmployee = asyncWrapper(async (req, res, next) => {
  const { internalId, name, position, area, avatar } = req.body

  if (!internalId || !name || !position || !area) {
    next(customError('Please provide a valid employee', 400))
  }

  const existEmployee = await Employee.findOne({ internalId })
  if (existEmployee) {
    next(customError('Employee already exist', 400))
  }

  const data = {
    internalId,
    name,
    position,
    area,
    avatar: avatar || createAvatar(name),
  }

  const newEmployee = await Employee.create(data)
  res.status(201).json({ msg: 'employee created', data: newEmployee })
})

const getEmployee = asyncWrapper(async (req, res, next) => {
  const { id: employeeId } = req.params

  if (!employeeId) {
    next(customError('Provide a valid employee', 400))
  }

  const employee = await Employee.findOne({ _id: employeeId })
  if (!employee) {
    next(customError('Employee did not exist', 404))
  }

  res.status(200).json({ msg: 'ok', data: employee })
})

const updateEmployee = asyncWrapper(async (req, res, next) => {
  const { name, position, area, avatar } = req.body
  const { id: employeeId } = req.params

  if (!employeeId || !name || !position || !area) {
    next(customError('Please provide a valid employee', 400))
  }

  const employeeToUpdate = await Employee.findOne({ _id: employeeId })
  if (!employeeToUpdate) {
    next(customError('Employee did not exist', 404))
  }

  employeeToUpdate.name = name
  employeeToUpdate.position = position
  employeeToUpdate.area = area
  employeeToUpdate.avatar = avatar || createAvatar(name)

  await employeeToUpdate.save({ validateBeforeSave: true })
  res.status(200).json({ msg: 'employee updated', data: employeeToUpdate })
})

const deleteEmployee = asyncWrapper(async (req, res, next) => {
  const { id: employeeId } = req.params

  if (!employeeId) {
    next(customError('Provide a valid employee', 403))
  }

  const employeeToDelete = await Employee.findOne({ _id: employeeId })
  if (!employeeToDelete) {
    next(customError('Employee did not exist', 403))
  }

  await employeeToDelete.remove()

  res.status(200).json({ msg: 'employee deleted' })
})

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
}
