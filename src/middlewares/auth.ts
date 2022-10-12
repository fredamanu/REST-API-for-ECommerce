import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string
    const isCustomAuth = token?.length < 500

    let decodedData
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, JWT_SECRET)

      req.user = decodedData
    } else {
      decodedData = jwt.decode(token)
      req.user = decodedData?.sub
    }
  } catch (err) {
    console.log(err)
  }
}

export default auth
