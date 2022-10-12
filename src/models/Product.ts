import mongoose, { Document } from 'mongoose'

export type ReviewDocument = Document & {
  name: string
  rating: number
  titleOfReview: string
  comment: string
  user: string
}

export type ProductDocument = Document & {
  name: string
  image: string
  benefits: string
  ingredients: string
  suggestedUse: string
  disclosure: string
  isBestSeller: boolean
  tags: string[]
  reviews: ReviewDocument[]
  rating: number
  numOfReviews: number
  price: number
  size: number
  countInStock: number
}

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    default: 0,
  },
  titleOfReview: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    benefits: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    suggestedUse: {
      type: String,
      required: true,
    },
    disclosure: {
      type: String,
      required: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: ['All'],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    size: {
      type: Number,
      required: true,
      default: 8,
    },
    countInStock: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model<ProductDocument>('Product', productSchema)

// const arr = [
//   {
//     name: 'Coconut and Olive Oil Moisturising Hair Mask',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/moisture_gz2mxx.jpg',
//     price: 14.99,
//     benefits:
//       'The Moisture Treatment deeply hydrates the hair strand from root to end It adds silkiness, malleability, and smoothness. Its soothing, moisture-locking formulation is made with glacial water, pro-vitamin B5, sweet almond, grapeseed, olive, and coconut oils. It contains a combination of lavender and lemon essential oils that give it its scent',
//     ingredients:
//       'Purified Water, Cetearyl Alcohol, Vegetable Glycerin, Coconut (Cocos Nucifera) Oil, Pro-Vitamin B5 (Panthenol), Hydrolysed Wheat Protein, Vitus Vinifera (Grape) Seed Oil, Sucrose, Olive Oil (Olea Europaea), Prunus Amygdalus Dulcis (Sweet Almond) Oil, Lavandula Angustifolia (Lavender) Oil, Citrus Medica Limonum (Lemon) Oil, Benzyl Alcohol, Salicylic Acid, Sorbic Acid',
//     suggestedUse:
//       'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     isBestSeller: true,
//     tags: ['All', 'Treatment', 'Moisture', 'Conditioner', 'Mask'],
//   },
//   {
//     name: 'Hydrolysed Oat Strengthening and Repair Hair Mask',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885763/products/hairproducts/repair_hyatio.jpg',
//     price: 14.99,
//     benefits:
//       'The Repair Treatment restores hair mass and volume with regenerative ingredients such as keratin, oats, corn, wheat, soy proteins, and oat amino acids. Blended with cocoa butter, coconut oil, meadowfoam seed oil, vitamin E, panthenol, white nettle flower, ginseng, and gleditsia australis seed extracts, this formula helps the strands regain strength. It contains a combination of clary sage and lemongrass oils that gives its scent.',
//     ingredients:
//       'Purified Water, Vegetable Glycerin, Hydrolyzed Oats, Cetyl Alcohol, Cocoa Butter, Coconut Oil, Vitamin E, Panthenol, Hydrolyzed Corn Protein, Hydrolyzed Wheat Protein, Hydrolyzed Soy Protein, Gleditsia Australis Seed Extract, Lamium Album Flower Extract, Panax Ginseng Root Extract, Cymbopogon Flexuosus (Lemongrass) Oil, Salvia Sclarea (Clary) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
//     suggestedUse:
//       'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands.',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     tags: [
//       'All',
//       'Treatment',
//       'Repair',
//       'Strengthening',
//       'Conditioner',
//       'Mask',
//     ],
//   },
//   {
//     name: 'Shea Butter and Rosehip Nourishing Hair Treatment',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
//     price: 14.99,
//     benefits:
//       'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
//     ingredients:
//       'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
//     suggestedUse:
//       'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     tags: ['All', 'Treatment', 'Nourish', 'Conditioner', 'Mask'],
//   },
//   {
//     name: 'Shea, Mango and Cocoa Hair Butter for Sealing Moisture',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/butter_m4x1pk.jpg',
//     price: 14.95,
//     benefits:
//       'A moisturising hair butter made with three (3) awesome butters, shea, mango and cocoa butter for deeper hair shaft penetration. Good for chronically dry hair, helps to seal in moisture and a good styler for braids, twists and more',
//     ingredients:
//       'Water, Shea Butter, Mango Butter, Cocoa Butter, Cetearyl Alcohol, Cocos Nucifera (Coconut) Oil, Avocado Oil, Sweet Almond Oil, Glycerin,  Castor Oil, Phenoxyethanol, Honey, Simmondsia Chinensis (Jojoba) Seed Oil, Aminomethyl Propanol, Hydrolyzed Keratin, Iodopropynyl Butylcarbamate, Linalool, Butylphenyl Methylpropional, Hexyl Cinnamal, Alpha-Isomethyl Ionone, Coumarin, Geraniol, Hydroxycitronellal, Citronellol, Yellow 5 (CI 19140)',
//     suggestedUse:
//       'Apply a small amount in hand, rub palms together and apply all over hair, especially concentrating on the ends. With a wide tooth comb or soft bristle brush, gently comb or brush through hair',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     isBestSeller: true,
//     tags: ['All', 'Butter', 'Sealant', 'Oil'],
//   },
//   {
//     name: 'Aloe Vera and Flaxseed Hair Gel for Strong Hold',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/gel_hvtiq0.jpg',
//     price: 14.99,
//     benefits:
//       'This amazing styling gel gives beautiful stretch to shriveling curls, without flaking or caking. A blend of moisturizing conditioners, Flaxseed, Shea Butter and Extra Virgin Olive Oil. With nourishing Omega-3 fatty acids, Flaxseed has been widely used as a natural remedy for hair growth, anti-thinning and overall scalp health. With regular use, hair is left soft without a crunchy, tacky feel',
//     ingredients:
//       ' Water, Glycerin, Aloe Vera Powder, Hydrolyzed Wheat Protein, Esseential Oils, Potassium Sorbate, Linum Usitatissimum Seed Oil, Tocopherol, Limonene, Amyl Cinnamal, Butylphenyl Methylpropional',
//     suggestedUse:
//       'A small amount can be used on clean, dry hair, but this gel works best when used on clean, wet or damp hair. Apply more for tighter curls and less for elongated curls',
//       isBestSeller: true,
//       disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     tags: ['All', 'Gel'],
//   },
//   {
//     name: 'Eucalyptus and Tea Tree Oil Hydrating Shampoo',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885763/products/hairproducts/shampoo_p1gd5b.jpg',
//     price: 14.99,
//     benefits:
//       'The Balancing Shampoo gently cleanses the scalp while preserving the strand’s health. Its formula includes vitamin B5, natural sugars, coconut oil, and eucalyptus and tea tree essential oils that create a creamy texture to freshen and nourish the scalp. The Balancing Shampoo performs on all hair types and delivers results that last',
//     ingredients:
//       'Purified Water, Guar Gum, Lauryl Glucoside, Decyl Glucoside, Coco-Glucoside, Vitamin B5 Panthenol, Sodium Lauryl Sulfoacetate, Disodium Laureth Sulfosuccinate, Vegetable Glycerin, Coconut Oil, Eucalyptus Oil, Tea Tree Oil, Benzyl Alcohol/Salicylic Acid/Glycerin/Sorbic Acid',
//     suggestedUse:
//       'Wet hair thoroughly. Pump 2 - 3 times and work the product on the scalp by massaging it with the tip of the fingers. Breathe in and let the natural fragrances from the oils relax you. Rinse off completely. Repeat the process if needed',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     tags: ['All', 'Shampoo', 'Moisture'],
//   },

//   {
//     name: 'Argan Oil Balancing and Nourishing Hair Conditioner',
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/conditioner_n66cig.jpg',
//     price: 18.95,
//     benefits:
//       'The Balancing Conditioner has a low pH formula designed for daily nourishment and hydration. Its thick texture is from the coconut, grapeseed, and argan oils which soften the strands instantly. The subtle additions of eucalyptus and tea tree essential oils help leave the strands fostered and refreshed.The Balancing Conditioner performs on all hair types and delivers results that last. It can function as a rinse-out or as a leave-in',
//     ingredients:
//       'Purified  Water(Aqua), Cetyl Alcohol, Cetearyl Alcohol, Behentrimonium Methosulphate, Behentrimonium Chloride, Glyceryl Stearate, Polyglyceryl -6 Palmitate, Vegetable Glycerin, Coconut Oil, Argan Oil, Sucrose, Eucalptus, Olive Oil, Tea Tree Oil, Vitamin E Oil, Benzyl Alcohol, Sorbic Acid',
//     suggestedUse:
//       'Apply it from mid length to the ends, after the shampoo and the hair treatment mask. Breathe in and let the natural aroma from the essential oils relax you. Rinse off',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     tags: ['All', 'Conditioner', 'Moisture'],
//   },
//   {
//     name: 'Avocado Butter and Green Tea Extract Nourishing Leave-In',
//     size: 6,
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/leavein_nxzyup.jpg',
//     price: 18.95,
//     benefits:
//       'A moisture and repair balanced deep conditioner for regular use. Strenghtens weak damaged hair and locks in moisture for shinier touchably soft hair',
//     ingredients:
//       'Distilled Water(Aqua), Vegetable Glycerin, Hydrolyzed Oats Powder, Cetyl Alcohol, Cetearyl Alcohol, Behentrimonium Methosulphate, Glyceryl Stearate, Polyglyceryl -6 Palmitate, Avocado Butter, Sweet Almond Oil, Vitamin E, Panthenol, Aloe Vera Juice, Green Tea Extract, Cymbopogon Flexuosus (Lemongrass) Oil, Salvia Sclarea(Clary) Oil, Benzyl Alcohol, Citric Acid, Dehydroacetic Acid',
//     suggestedUse:
//       'After the shower, remove excess water gently with a soft towel and detangle with a wide-toothed comb. Apply a small amount to your hands and run them through your hair to spread the product evenly. Let hair dry',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     isBestSeller: true,
//     tags: ['All', 'Leave-In', 'Moisture'],
//   },

//   {
//     name: 'Rosemary and Mint Scalp and Hair Strengthening Oil',
//     size: 6,
//     image:
//       'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885763/products/hairproducts/oil_kn6bcj.jpg',
//     price: 10.95,
//     benefits:
//       'Blended with carrier and essential oils, including: Coconut, Grapeseed & Jojoba Oils, Shea Butter and Ginseng, this exceptional recipe softens, shines, invigorates, and will not clog pores. N.C scalp and hair oil oil is an excellent remedy to relieve dry scalp, hair, nails and skin. Just a little gets the job done',
//     ingredients:
//       'Argan Oil, Cocos Nucifera (Coconut) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil,  Vitamin E Oil, Ricinus Communis (Castor) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Sunflower Seed Oil, Essential Oil Blend',
//     suggestedUse:
//       'Use daily, or as needed. Apply a small amount to dry areas, including: scalp, hair (can be used on wet or dry hair), nails, skin, and face',
//     disclosure:
//       'Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG\'s MEA\'s, TEA\'s, DEA\'s Free, Artificial Fragrance Free, Coloring Free',
//     tags: ['All', 'Oil', 'Scalp Oil'],
//   },
// ]

// Product.insertMany(arr)

export default Product
