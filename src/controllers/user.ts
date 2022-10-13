import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'

import UserServices from '../services/user'
import { BadRequestError } from '../helpers/apiError'

export const findOrCreateUserUsingRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const { firstName, lastName, email, password } = req.body
    const user = new User({
      firstName,
      lastName,
      email,
      password: hash
    })
    
    res.json(await UserServices.findOrCreateUsingRegister(user))
    
    // res.json(await UserServices.findOrCreateUsingRegister(user))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserServices.findAllUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserServices.findUserById(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    res.json(await UserServices.findUserByEmail(req.body))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    res.json(await UserServices.updateUser(req.params.userId, update))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserServices.deleteUser(req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
