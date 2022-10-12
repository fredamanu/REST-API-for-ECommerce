import connect, { MongodHelper } from '../db-helper'
import Product from '../../src/models/Product'
import ProductServices from '../../src/services/product'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

const createProduct = async () => {
  const newProduct = new Product({
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
  })
  return await ProductServices.createProduct(newProduct)
}

describe('product service', () => {
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
  it('should create a product', async () => {
    const newProduct = await createProduct()
    expect(newProduct).toHaveProperty('name', 'nuture')
  })
  it('should find product by Id', async () => {
    const newProduct = await createProduct()
    const foundProduct = await ProductServices.findProductById(newProduct._id)
    expect(foundProduct._id).toEqual(newProduct._id)
  })
  it('should not find an non-existing product', async () => {
    const newProduct = await createProduct()
    return await ProductServices.findProductById(nonExistingProductId).catch(
      (e) => {
        expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
      }
    )
  })
  it('should find product by name', async () => {
    const newProduct = await createProduct()
    const foundProduct = await ProductServices.findProductByName(
      newProduct.name
    )
    expect(foundProduct.name).toEqual(newProduct.name)
  })
  it('should find bestselling product', async () => {
    await createProduct()
    return await ProductServices.findBestSellingProducts().catch((e) => {
      expect(e.message).toMatch('There are no best-sellers available')
    })
  })
  it('should find all products', async () => {
    await createProduct()
    const products = await ProductServices.findAllProducts()
    expect(products).toHaveLength(1)
  })
  it('should update an existing product', async () => {
    const newProduct = await createProduct()
    const updatedProduct = await ProductServices.updateProduct(newProduct._id, {
      price: 10.99,
    })
    expect(updatedProduct.price).toEqual(10.99)
  })
  it('should not update a non-existing product', async () => {
    const newProduct = await createProduct()
    return await ProductServices.updateProduct(nonExistingProductId, {
      price: 10.99,
    }).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })
  it('should delete an existing product', async () => {
    const newProduct = await createProduct()
    const deletedProduct = await ProductServices.deleteProduct(newProduct._id)
    return ProductServices.findProductById(deletedProduct._id).catch((e) => {
      expect(e.message).toMatch(`Product ${deletedProduct._id} not found`)
    })
  })
})
