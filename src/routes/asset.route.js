const { Router } = require('express')
const {
  getAllAssets,
  createAsset,
  getAsset,
  updateAsset,
  deleteAsset,
} = require('../controllers/asset.controller')

const router = Router()

router.route('/').get(getAllAssets).post(createAsset)
router.route('/:id').get(getAsset).patch(updateAsset).delete(deleteAsset)

module.exports = router
