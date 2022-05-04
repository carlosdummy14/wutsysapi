const { Router } = require('express')
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/employee.controller')

const router = Router()

router.route('/').get(getAll).post(createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router
