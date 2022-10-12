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
const db_helper_1 = __importDefault(require("../db-helper"));
const Product_1 = __importDefault(require("../../src/models/Product"));
const product_1 = __importDefault(require("../../src/services/product"));
const nonExistingProductId = '5e57b77b5744fa0b461c7906';
const createProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new Product_1.default({
        name: 'nuture',
        image: 'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
        price: 14.99,
        benefits: 'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
        ingredients: 'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
        suggestedUse: 'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
        disclosure: "Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG's MEA's, TEA's, DEA's Free, Artificial Fragrance Free, Coloring Free",
    });
    return yield product_1.default.createProduct(newProduct);
});
describe('product service', () => {
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
        const newProduct = yield createProduct();
        expect(newProduct).toHaveProperty('name', 'nuture');
    }));
    it('should find product by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield createProduct();
        const foundProduct = yield product_1.default.findProductById(newProduct._id);
        expect(foundProduct._id).toEqual(newProduct._id);
    }));
    it('should not find an non-existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield createProduct();
        return yield product_1.default.findProductById(nonExistingProductId).catch((e) => {
            expect(e.message).toMatch(`Product ${nonExistingProductId} not found`);
        });
    }));
    it('should find product by name', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield createProduct();
        const foundProduct = yield product_1.default.findProductByName(newProduct.name);
        expect(foundProduct.name).toEqual(newProduct.name);
    }));
    it('should find bestselling product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createProduct();
        return yield product_1.default.findBestSellingProducts().catch((e) => {
            expect(e.message).toMatch('There are no best-sellers available');
        });
    }));
    it('should find all products', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createProduct();
        const products = yield product_1.default.findAllProducts();
        expect(products).toHaveLength(1);
    }));
    it('should update an existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield createProduct();
        const updatedProduct = yield product_1.default.updateProduct(newProduct._id, {
            price: 10.99,
        });
        expect(updatedProduct.price).toEqual(10.99);
    }));
    it('should not update a non-existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield createProduct();
        return yield product_1.default.updateProduct(nonExistingProductId, {
            price: 10.99,
        }).catch((e) => {
            expect(e.message).toMatch(`Product ${nonExistingProductId} not found`);
        });
    }));
    it('should delete an existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield createProduct();
        const deletedProduct = yield product_1.default.deleteProduct(newProduct._id);
        return product_1.default.findProductById(deletedProduct._id).catch((e) => {
            expect(e.message).toMatch(`Product ${deletedProduct._id} not found`);
        });
    }));
});
//# sourceMappingURL=product.test.js.map