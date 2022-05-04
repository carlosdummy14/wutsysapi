const getAll = async (req, res) => {
  res.status(200).json({ msg: 'get all employees' })
}

const createOne = async (req, res) => {
  const { internalId, name, position, area, avatar } = req.body

  if (!internalId || !name || !position || !area) {
    res.status(403).json({ msg: 'Please provide a valid employee' })
    return
  }

  const data = {
    ...req.body,
    avatar:
      avatar ||
      'https://www.gravatar.com/avatar/c21f969b5f03d33d43e04f8f136e7682?d=robohash&s=200',
  }

  res.status(201).json({ msg: 'employee created', data })
}

const getOne = async (req, res) => {
  res.status(200).json({ msg: 'get one employee' })
}

const updateOne = async (req, res) => {
  res.status(200).json({ msg: 'update one employee' })
}

const deleteOne = async (req, res) => {
  res.status(200).json({ msg: 'delete one employee' })
}

module.exports = { getAll, createOne, getOne, updateOne, deleteOne }
