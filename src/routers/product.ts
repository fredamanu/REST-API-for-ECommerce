import express from 'express'
import { NotFoundError } from '../helpers/apiError'

import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findBestSellingProducts,
  findProductByName,
  updateProduct,
} from '../controllers/product'

const router = express.Router()

router.get('/', findAllProducts)
router.get('/bestsellers', findBestSellingProducts)
// router.get('/:productId', findProductById)
router.get('/:productName', findProductByName)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
