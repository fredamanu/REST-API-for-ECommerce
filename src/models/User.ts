import mongoose, { Document } from 'mongoose'
import { OrderDocument } from './Order'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  image: string
  isAdmin: boolean
  isBanned: boolean
  orders: OrderDocument[]
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
