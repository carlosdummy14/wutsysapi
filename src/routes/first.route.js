const { Router } = require('express')
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('../controllers/first.controller')

const router = Router()

router.route('/').get(getAll).post(createOne)
router.route('/:id').get(getOne).patch(updateOne).delete(deleteOne)

module.exports = router
