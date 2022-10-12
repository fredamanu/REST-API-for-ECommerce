import express from 'express'

import {
  createOrder,
  findOrderById,
  findAllOrders,
  updateOrder,
  deleteOrder,
} from '../controllers/order'

const router = express.Router()

router.get('/:userId', findAllOrders)
router.get('/:orderId', findOrderById)
router.post('/:userId', createOrder)
router.put('/:orderId', updateOrder)
router.delete('/:orderId/:userId', deleteOrder)

export default router
