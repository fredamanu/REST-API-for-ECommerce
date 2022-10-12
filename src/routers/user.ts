import express from 'express'
import User from '../models/User'

import {
  deleteUser,
  findAllUsers,
  findOrCreateUserUsingRegister,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../controllers/user'

const router = express.Router()

router.get('/', findAllUsers)
router.get('/:userId', findUserById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/register', findOrCreateUserUsingRegister)
router.post('/login', findUserByEmail)

export default router

// function (req, res) {
//   res.send('hello')
// }
