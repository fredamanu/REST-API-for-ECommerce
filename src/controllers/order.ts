import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import OrderServices from '../services/order'
import { BadRequestError } from '../helpers/apiError'

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = new Order({
      userId: req.params.userId,
      orderItems: req.body.cartItems,
    })
    res.json(await OrderServices.createOrder(order))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await OrderServices.findOrderById(req.params.orderId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderServices.findAllOrders(req.params.userId)
    res.json(orders)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    res.json(await OrderServices.updateOrder(req.params.orderId, update))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await OrderServices.deleteOrder(req.params.orderId, req.params.userId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
