import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import ProductServices from '../services/product'
import ApiError, { BadRequestError } from '../helpers/apiError'

export const createProduct: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      image,
      benefits,
      ingredients,
      suggestedUse,
      disclosure,
      reviews,
      ratings,
      numOfReviews,
      price,
      size,
      countInStock,
    } = req.body
    const product = new Product({
      name,
      image,
      benefits,
      ingredients,
      suggestedUse,
      disclosure,
      reviews,
      ratings,
      numOfReviews,
      price,
      size,
      countInStock,
    })
    res.json(await ProductServices.createProduct(product))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductServices.findProductById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findProductByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductServices.findProductByName(req.params.productName))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findBestSellingProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductServices.findBestSellingProducts())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductServices.findAllProducts())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    res.json(await ProductServices.updateProduct(req.params.productId, update))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductServices.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
