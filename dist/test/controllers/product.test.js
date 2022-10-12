"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const db_helper_1 = __importDefault(require("../db-helper"));
const nonExistingProductId = '5e57b77b5744fa0b461c7906';
const createProduct = (override) => __awaiter(void 0, void 0, void 0, function* () {
    let product = {
        name: 'nuture',
        image: 'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
        price: 14.99,
        benefits: 'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
        ingredients: 'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
        suggestedUse: 'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
        disclosure: "Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG's MEA's, TEA's, DEA's Free, Artificial Fragrance Free, Coloring Free",
    };
    if (override) {
        product = Object.assign(Object.assign({}, product), override);
    }
    return yield supertest_1.default(app_1.default).post('/api/v1/products').send(product);
});
describe('product controller', () => {
    let mongodHelper;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongodHelper = yield db_helper_1.default();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongodHelper.clearDatabase();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongodHelper.closeDatabase();
    }));
    it('should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield createProduct();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('nuture');
    }));
    it('should not create a product with wrong data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).post('/api/v1/products').send({
            name: 'nuture',
            image: 'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
            price: 14.99,
            //   benefits:
            //     'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
            //   ingredients:
            //     'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
            suggestedUse: 'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
            disclosure: "Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG's MEA's, TEA's, DEA's Free, Artificial Fragrance Free, Coloring Free",
        });
        expect(res.status).toBe(400);
    }));
    it('should find an existing product by name', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createProduct();
        expect(res.status).toBe(200);
        const productName = res.body.name;
        res = yield supertest_1.default(app_1.default).get(`/api/v1/products/${productName}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toEqual(productName);
    }));
    //   it('should find all bestselling products', async () => {
    //     let res = await request(app).post('/api/v1/products')
    //     .send({
    //       name: 'nuture',
    //       image:
    //         'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
    //       price: 14.99,
    //       benefits:
    //         'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
    //       ingredients:
    //         'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
    //       suggestedUse:
    //         'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
    //       disclosure:
    //         "Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG's MEA's, TEA's, DEA's Free, Artificial Fragrance Free, Coloring Free",
    //         isBestSeller: true,
    //     })
    //     expect(res.status).toBe(200)
    //     res = await request(app).get('/api/v1/products/bestsellers')
    //     expect(res.status).toBe(200)
    //     expect(res.body).toHaveLength(1)
    //   })
    it('should find all products', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createProduct();
        expect(res.status).toBe(200);
        res = yield supertest_1.default(app_1.default).get('/api/v1/products');
        expect(res.body).toHaveLength(1);
    }));
    it('should update an existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createProduct();
        expect(res.status).toBe(200);
        const productId = res.body._id;
        res = yield supertest_1.default(app_1.default).put(`/api/v1/products/${productId}`).send({
            name: 'butter',
        });
        expect(res.body.name).toBe('butter');
    }));
    it('should not update a non-existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createProduct();
        expect(res.status).toBe(200);
        res = yield supertest_1.default(app_1.default)
            .put(`/api/v1/products/${nonExistingProductId}`)
            .send({
            name: 'butter',
        });
        expect(res.status).toBe(404);
    }));
    it('should delete an existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield createProduct();
        expect(res.status).toBe(200);
        const productId = res.body._id;
        const productName = res.body.name;
        res = yield supertest_1.default(app_1.default).delete(`/api/v1/products/${productId}`);
        expect(res.status).toBe(204);
        res = yield supertest_1.default(app_1.default).get(`/api/v1/products/${productName}`);
        expect(res.status).toBe(404);
    }));
});
//# sourceMappingURL=product.test.js.map