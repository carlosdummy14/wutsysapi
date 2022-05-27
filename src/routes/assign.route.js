const { Router } = require('express')
const {
  getAllAssigns,
  createAssign,
  getAssign,
  updateAssign,
  deleteAssign,
} = require('../controllers/assign.controller')

const router = Router()

router.route('/').get(getAllAssigns).post(createAssign)
router.route('/:id').get(getAssign).patch(updateAssign).delete(deleteAssign)

module.exports = router
