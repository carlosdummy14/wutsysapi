const Employee = require('../models/employee.model')

const DEFAULT_AVATAR =
  'https://www.gravatar.com/avatar/c21f969b5f03d33d43e04f8f136e7682?d=robohash&s=200'

const getAll = async (req, res) => {
  const employees = await Employee.find({})

  res
    .status(200)
    .json({ msg: 'employees', data: employees, count: employees.length })
}

const createOne = async (req, res) => {
  const { internalId, name, position, area, avatar } = req.body

  if (!internalId || !name || !position || !area) {
    res.status(403).json({ msg: 'Please provide a valid employee' })
    return
  }

  const existEmployee = await Employee.findOne({ internalId })
  if (existEmployee) {
    res.status(403).json({ msg: 'Employee already exist' })
    return
  }

  const data = {
    ...req.body,
    avatar: avatar || DEFAULT_AVATAR,
  }

  const newEmployee = await Employee.create(data)

  res.status(201).json({ msg: 'employee created', data: newEmployee })
}

const getOne = async (req, res) => {
  const { id: employeeId } = req.params

  if (!employeeId) {
    res.status(403).json({ msg: 'Provide a valid employee' })
    return
  }

  const employee = await Employee.findById(employeeId)
  if (!employee) {
    res.status(403).json({ msg: 'Employee did not exist' })
    return
  }

  res.status(200).json({ msg: 'ok', data: employee })
}

const updateOne = async (req, res) => {
  res.status(200).json({ msg: 'update one employee' })
}

const deleteOne = async (req, res) => {
  const { id: employeeId } = req.params

  if (!employeeId) {
    res.status(403).json({ msg: 'Provide a valid employee' })
    return
  }

  const existEmployee = await Employee.findById(employeeId)
  if (!existEmployee) {
    res.status(403).json({ msg: 'Employee did not exist' })
    return
  }

  await Employee.findOneAndRemove({ _id: employeeId })

  res.status(200).json({ msg: 'deleted' })
}

module.exports = { getAll, createOne, getOne, updateOne, deleteOne }
