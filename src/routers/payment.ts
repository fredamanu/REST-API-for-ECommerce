import express from 'express'
import { paymentProcessing, stripeWebhook } from '../controllers/payment'
const router = express.Router()

router.post('/', paymentProcessing)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
)

export default router
