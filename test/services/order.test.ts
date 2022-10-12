import bcrypt from 'bcryptjs'
import OrderServices from '../../src/services/order'
import UserServices from '../../src/services/user'
import User from '../../src/models/User'
import Order from '../../src/models/Order'
import connect, { MongodHelper } from '../db-helper'

const nonExistingOrderId = '5e57b77b5744fa0b461c7906'

const createOrder = async () => {
  const hash = (await bcrypt.hash('gh793jgdjs', 10)) as string
  const newUser = new User({
    firstName: 'Freda',
    lastName: 'Manu',
    email: 'example@gmail.com',
    password: hash,
  })
  const user = await UserServices.findOrCreate(newUser)
  const order = new Order({
    userId: user?._id,
    orderItems: [
      {
        name: 'nuture',
        image:
          'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
        price: 14.99,
        benefits:
          'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
        ingredients:
          'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
        suggestedUse:
          'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
        disclosure:
          "Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG's MEA's, TEA's, DEA's Free, Artificial Fragrance Free, Coloring Free",
      },
    ],
    shippingAddress: {
      name: 'Freda',
      addressLine1: 'Kaserniveien 15F',
      addressLine2: 'Kristiansand',
      city: 'Agder',
      postalCode: 4630,
      country: 'Norway',
    },
  })
  return await OrderServices.createOrder(order)
}

describe('order service', () => {
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
  it('should create a new order', async () => {
    const user = await createOrder()
    expect(user.orders).toHaveLength(1)
  })
  it('should find order by Id', async () => {
    const user = await createOrder()
    const order = await OrderServices.findOrderById(user.orders[0]._id)
    expect(order._id).toEqual(user.orders[0]._id)
  })
  it('should not find a non-existing order', async () => {
    const user = await createOrder()
    return await OrderServices.findOrderById(nonExistingOrderId).catch((e) => {
      expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`)
    })
  })
  it('should find all orders ', async () => {
    const user = await createOrder()
    const orders = await OrderServices.findAllOrders(user._id)
    expect(orders).toHaveLength
    expect(orders[0].userId).toEqual(user._id)
  })
  it('should update an order ', async () => {
    const user = await createOrder()
    const order = await OrderServices.updateOrder(user.orders[0]._id, {
      shippingAddress: {
        name: 'Jeffery',
        addressLine1: 'Kaserniveien 15F',
        addressLine2: 'Kristiansand',
        city: 'Agder',
        postalCode: 4630,
        country: 'Norway',
      },
    })
    expect(order.shippingAddress).toHaveProperty('name', 'Jeffery')
  })
  it('should not update a non-existing order ', async () => {
    const user = await createOrder()
    const order = await OrderServices.updateOrder(nonExistingOrderId, {
      shippingAddress: {
        name: 'Jeffery',
        addressLine1: 'Kaserniveien 15F',
        addressLine2: 'Kristiansand',
        city: 'Agder',
        postalCode: 4630,
        country: 'Norway',
      },
    }).catch((e) => {
      expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`)
    })
  })
  it('should delete an order', async () => {
    const user = await createOrder()
    await OrderServices.deleteOrder(user.orders[0]._id, user._id)
    return await OrderServices.findOrderById(user.orders[0]._id).catch((e) => {
      expect(e.message).toMatch(`Order ${user.orders[0]._id} not found`)
    })
  })
})
