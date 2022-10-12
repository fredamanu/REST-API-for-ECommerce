import mongoose, { Document } from 'mongoose'

import { productSchema, ProductDocument } from './Product'

export type ShippingAddress = {
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  postalCode: number
  country: string
}

export type OrderItem = {
  _id: string
  name: string
  image: string
  price: number
  qty: number
}

export type OrderDocument = Document & {
  userId: string
  customerId: string
  paymentIntentId: string
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  taxPrice: number
  shippingPrice: number
  shippingRate: string
  totalAmount: number
  paymentStatus: string
  isDelivered: boolean
  deliveredAt: string
}

const shippingAddressSchema = new mongoose.Schema({
  name: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  postalCode: { type: Number },
  country: { type: String },
})

const orderItemSchema = {
  _id: String,
  name: String,
  image: String,
  price: Number,
  qty: Number,
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    paymentIntentId: {
      type: String,
    },
    orderItems: {
      type: [orderItemSchema],
    },
    shippingAddress: {
      type: shippingAddressSchema,
    },
    paymentMethod: {
      type: String,
      default: 'Card',
    },
    taxPrice: {
      type: Number,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
    },
    shippingRate: {
      type: String,
      default: 'shr_1LcsMGG5HlxfACqmeW3MWHhW',
    },
    totalAmount: {
      type: Number,
      default: 0.0,
    },
    paymentStatus: {
      type: String,
    },
    isDelivered: {
      type: Boolean,

      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model<OrderDocument>('Order', orderSchema)

export default Order
