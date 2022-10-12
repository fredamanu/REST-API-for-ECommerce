import bcrypt from 'bcryptjs'
import User, { UserDocument } from '../../src/models/User'
import UserServices from '../../src/services/user'
import connect, { MongodHelper } from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

const findOrCreateUser = async () => {
  const hash = await bcrypt.hash('gh793jgdjs', 10)
  const newUser = new User({
    firstName: 'Freda',
    lastName: 'Manu',
    email: 'example@gmail.com',
    password: hash,
  })
  return await UserServices.findOrCreate(newUser)
}

describe('user service', () => {
  let mongodHelper: MongodHelper
  beforeAll(async () => {
    mongodHelper = await connect()
  })
  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })
  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should find or create user', async () => {
    const newUser = await findOrCreateUser()
    expect(newUser).toHaveProperty('firstName', 'Freda')
  })
  it('should find user by email', async () => {
    await findOrCreateUser()
    const user: any = {
      firstName: 'Freda',
      lastName: 'Manu',
      email: 'example@gmail.com',
      password: 'gh793jgdjs',
    }
    const foundUser = await UserServices.findUserByEmail(user)
    expect(foundUser).toHaveProperty('firstName', 'Freda')
  })
  it('should not find a non-existing user', async () => {
    await findOrCreateUser()
    const user: any = {
      firstName: 'Freda',
      lastName: 'Manu',
      email: 'freda@gmail.com',
      password: 'gh793jgdjs',
    }
    return await UserServices.findUserByEmail(user).catch((e) => {
      expect(e.message).toMatch(`user ${user.email} not found`)
    })
  })
  it('should find all users', async () => {
    await findOrCreateUser()
    const users = await UserServices.findAllUsers()
    expect(users).toHaveLength(1)
  })
  it('should update an existing user', async () => {
    const newUser = await findOrCreateUser()
    const foundUser = await UserServices.updateUser(newUser?._id, {
      firstName: 'Linda',
    })
    expect(foundUser.firstName).toEqual('Linda')
  })
  it('should not update a non-exiting user', async () => {
    await findOrCreateUser()
    return await UserServices.updateUser(nonExistingUserId, {
      firstName: 'Linda',
    }).catch((e) => {
      expect(e.message).toMatch(`User ${nonExistingUserId} not found`)
    })
  })
  it('should delete an existing user', async () => {
    const user = await findOrCreateUser() as UserDocument
    await UserServices.deleteUser(user._id)
    return await UserServices.findUserByEmail(user).catch((e) => {
      expect(e.message).toMatch(`user ${user.email} not found`)
    })
  })
})
