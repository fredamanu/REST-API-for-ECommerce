import bcrypt from 'bcrypt'
import request from 'supertest'

import app from '../../src/app'
import User, { UserDocument } from '../../src/models/User'
import connect, { MongodHelper } from '../../test/db-helper'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

const findOrCreateUser = async (override?: Partial<UserDocument>) => {
  const hash = await bcrypt.hash('gh793jgdjs', 10)
  let newUser = {
    firstName: 'Freda',
    lastName: 'Manu',
    email: 'example@gmail.com',
    password: hash,
  }
  if (override) {
    newUser = { ...newUser, ...override }
  }
  return await request(app).post('/api/v1/users/register').send(newUser)
}

describe('order controller', () => {
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
  it('should find or create a user', async () => {
    const res = await findOrCreateUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.firstName).toBe('Freda')
  })
  it('should create of find user with wrong data', async () => {
    const res = await request(app).post('/api/v1/users/register').send({
      firstName: 'Freda',
      lastName: 'Manu',
      email: 'example@gmail.com',
    })
    expect(res.status).toBe(500)
  })
  it('should find all users', async () => {
    let res = await findOrCreateUser()
    expect(res.status).toBe(200)

    res = await request(app).get(`/api/v1/users`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
  })
  it('should find an existing user by Id', async () => {
    let res = await findOrCreateUser()
    expect(res.status).toBe(200)

    const userId = res.body._id

    res = await request(app).get(`/api/v1/users/${userId}`)
    expect(res.status).toBe(200)
    expect(res.body._id).toEqual(userId)
  })
//   it('should find an existing user by email', async () => {
//     let res = await findOrCreateUser()
//     expect(res.status).toBe(200)
//     const userId = res.body._id
//     const user = {
//       email: 'example@gmail.com',
//       password: "gh793jgdjs",
//     }

//     res = await request(app).post(`/api/v1/users/login`).send(user)
//     expect(res.status).toBe(200)
//     expect(res.body._id).toEqual(userId)
//   })
it('should update an existing product', async () => {
    let res = await findOrCreateUser()
    expect(res.status).toBe(200)
    const userId = res.body._id

    res = await request(app).put(`/api/v1/users/${userId}`).send({
      firstName: 'Chilly',
    })
    expect(res.body.firstName).toBe('Chilly')
  })
  it('should not update a non-existing product', async () => {
    let res = await findOrCreateUser()
    expect(res.status).toBe(200)

    res = await request(app)
      .put(`/api/v1/users/${nonExistingProductId}`)
      .send({
        firstName: 'Chilly',
      })
    expect(res.status).toBe(404)
  })
  it('should delete an existing product', async () => {
    let res = await findOrCreateUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const productName = res.body.name
    res = await request(app).delete(`/api/v1/users/${userId}`)
    expect(res.status).toBe(204)
    res = await request(app).get(`/api/v1/users/${userId}`)
    expect(res.status).toBe(404)
  })
})
