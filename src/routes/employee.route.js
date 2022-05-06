const { Router } = require('express')
const {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller')

const router = Router()

router.route('/').get(getAllEmployees).post(createEmployee)
router
  .route('/:id')
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee)

module.exports = router
