const asyncWrapper = require('../middleware/asyncWrapper')
const Employee = require('../models/employee.model')

const DEFAULT_AVATAR =
  'https://www.gravatar.com/avatar/c21f969b5f03d33d43e04f8f136e7682?d=robohash&s=200'

const getAllEmployees = asyncWrapper(async (req, res) => {
  const employees = await Employee.find({})

  res
    .status(200)
    .json({ msg: 'employees', data: employees, count: employees.length })
})

const createEmployee = asyncWrapper(async (req, res) => {
  const { internalId, name, position, area, avatar } = req.body

  if (!internalId || !name || !position || !area) {
    res.status(400).json({ msg: 'Please provide a valid employee' })
    return
  }

  const existEmployee = await Employee.findOne({ internalId })
  if (existEmployee) {
    res.status(400).json({ msg: 'Employee already exist' })
    return
  }

  const newAvatar = `https://robohash.org/${name
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase()}.png?size=100x100&set=set1`

  const data = {
    internalId,
    name,
    position,
    area,
    avatar: avatar || newAvatar,
  }

  const newEmployee = await Employee.create(data)
  res.status(201).json({ msg: 'employee created', data: newEmployee })
})

const getEmployee = asyncWrapper(async (req, res) => {
  const { id: employeeId } = req.params

  if (!employeeId) {
    res.status(400).json({ msg: 'Provide a valid employee' })
    return
  }

  const employee = await Employee.findOne({ _id: employeeId })
  if (!employee) {
    res.status(404).json({ msg: 'Employee did not exist' })
    return
  }

  res.status(200).json({ msg: 'ok', data: employee })
})

const updateEmployee = asyncWrapper(async (req, res) => {
  const { name, position, area, avatar } = req.body
  const { id: employeeId } = req.params

  if (!employeeId || !name || !position || !area) {
    res.status(400).json({ msg: 'Please provide a valid employee' })
    return
  }

  const employeeToUpdate = await Employee.findOne({ _id: employeeId })
  if (!employeeToUpdate) {
    res.status(404).json({ msg: 'Employee did not exist' })
    return
  }

  employeeToUpdate.name = name
  employeeToUpdate.position = position
  employeeToUpdate.area = area
  employeeToUpdate.avatar = avatar || DEFAULT_AVATAR

  await employeeToUpdate.save({ validateBeforeSave: true })
  res.status(200).json({ msg: 'employee updated', data: employeeToUpdate })
})

const deleteEmployee = asyncWrapper(async (req, res) => {
  const { id: employeeId } = req.params

  if (!employeeId) {
    res.status(403).json({ msg: 'Provide a valid employee' })
    return
  }

  const employeeToDelete = await Employee.findOne({ _id: employeeId })
  if (!employeeToDelete) {
    res.status(403).json({ msg: 'Employee did not exist' })
    return
  }

  await employeeToDelete.remove()

  res.status(200).json({ msg: 'deleted' })
})

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
}
