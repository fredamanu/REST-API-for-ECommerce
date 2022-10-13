import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

const findOrCreateUsingRegister = async (user: UserDocument) => {
  console.log(user)
  const foundUser = await User.findOne({ email: user.email })
  if (!foundUser) {
    const newUser = await user.save()
    return newUser
  }
  throw new BadRequestError("user already exist")
}

const findOrCreate = async (user: UserDocument) => {
  const foundUser = await User.findOne({ email: user.email })
  if (!foundUser) {
    const newUser = await user.save()
    return newUser
  }
  const updatedFoundUser = await User.findOneAndUpdate(
    { email: user.email },
    { image: user.image }
  )
  return updatedFoundUser
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId).populate('orders')
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const findUserByEmail = async (
  user: UserDocument
): Promise<{
  foundUser: UserDocument
  token: string
}> => {
  const foundUser = await User.findOne({ email: user.email })
  if (!foundUser) {
    throw new NotFoundError(`user ${user.email} not found`)
  } else {
    const match = await bcrypt.compare(user.password, foundUser.password)
    if (match === true) {
      const token = jwt.sign(
        { email: foundUser.email, id: foundUser._id },
        JWT_SECRET
      )
      return { foundUser, token }
    }
    throw new NotFoundError('password is incorrect')
  }
}

const findAllUsers = async (): Promise<UserDocument[]> => {
  const foundUsers = await User.find()
  if (!foundUsers) {
    throw new NotFoundError('No users')
  }
  return foundUsers
}

const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndDelete(userId)
  if (!foundUser) {
    throw new NotFoundError('user not found')
  }
  return foundUser
}

export default {
  findOrCreate,
  findOrCreateUsingRegister,
  findUserById,
  findUserByEmail,
  findAllUsers,
  updateUser,
  deleteUser,
}
