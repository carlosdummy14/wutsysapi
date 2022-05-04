const getAll = async (req, res) => {
  res.status(200).json({ msg: 'get all' })
}

const createOne = async (req, res) => {
  res.status(201).json({ msg: 'create one' })
}
const getOne = async (req, res) => {
  res.status(200).json({ msg: 'get one' })
}

const updateOne = async (req, res) => {
  res.status(200).json({ msg: 'update one' })
}

const deleteOne = async (req, res) => {
  res.status(200).json({ msg: 'delete one' })
}

module.exports = { getAll, createOne, getOne, updateOne, deleteOne }
