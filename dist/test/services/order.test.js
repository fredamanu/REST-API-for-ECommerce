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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const order_1 = __importDefault(require("../../src/services/order"));
const user_1 = __importDefault(require("../../src/services/user"));
const User_1 = __importDefault(require("../../src/models/User"));
const Order_1 = __importDefault(require("../../src/models/Order"));
const db_helper_1 = __importDefault(require("../db-helper"));
const nonExistingOrderId = '5e57b77b5744fa0b461c7906';
const createOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const hash = (yield bcryptjs_1.default.hash('gh793jgdjs', 10));
    const newUser = new User_1.default({
        firstName: 'Freda',
        lastName: 'Manu',
        email: 'example@gmail.com',
        password: hash,
    });
    const user = yield user_1.default.findOrCreate(newUser);
    const order = new Order_1.default({
        userId: user === null || user === void 0 ? void 0 : user._id,
        orderItems: [
            {
                name: 'nuture',
                image: 'https://res.cloudinary.com/defgcg7hn/image/upload/v1659885762/products/hairproducts/nurture_zncdxq.jpg',
                price: 14.99,
                benefits: 'The Nurture Treatment deeply nourishes the hair while the de-frizz system leaves it shiny and defined. Rebalances the hair oils with a lustrous formula made of sunflower seed, avocado, argan, evening primrose, grapeseed, and olive oils, shea butter, ginseng, and rosehip extracts. It contains a combination of grapefruit, ylang-ylang, and bergamot essential oils that gives its scent.',
                ingredients: 'Purified Water, Olea Europaea (Olive) Oil, Avocado Oil, Sunflower Seed Oil, Argan Oil, Helianthus Annuus (Sunflower) Seed Oil, Butyrospermum Parkii (Shea Butter), Cetearyl Alcohol, Stearic Acid, Vegetable Glycerin, Panthenol, Rosa Rubiginosa (Rosehip) Extract, Panax Ginseng Extracts, D-Alpha Tocopherol, Coco-Caprylate/Caprate,  Ylang Ylang Oil, Citrus Aurantium Bergamia (Bergamot) Oil, Benzyl Alcohol, Salicylic Acid, Glycerin, Sorbic Acid',
                suggestedUse: 'After you shampoo your hair and rinse it off, spread the mask throughout your damp hair and wait for 7 to 20 minutes. Rinse off and condition your hair to seal the cuticles and trap the treatment in the strands',
                disclosure: "Vegan, Cruelty Free, Sulphate Free, Parabens Free, Silicons Free, Petrochemicals Free, Phthalates Free, PEG's MEA's, TEA's, DEA's Free, Artificial Fragrance Free, Coloring Free",
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
    });
    return yield order_1.default.createOrder(order);
});
describe('order service', () => {
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
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        expect(user.orders).toHaveLength(1);
    }));
    it('should find order by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        const order = yield order_1.default.findOrderById(user.orders[0]._id);
        expect(order._id).toEqual(user.orders[0]._id);
    }));
    it('should not find a non-existing order', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        return yield order_1.default.findOrderById(nonExistingOrderId).catch((e) => {
            expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`);
        });
    }));
    it('should find all orders ', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        const orders = yield order_1.default.findAllOrders(user._id);
        expect(orders).toHaveLength;
        expect(orders[0].userId).toEqual(user._id);
    }));
    it('should update an order ', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        const order = yield order_1.default.updateOrder(user.orders[0]._id, {
            shippingAddress: {
                name: 'Jeffery',
                addressLine1: 'Kaserniveien 15F',
                addressLine2: 'Kristiansand',
                city: 'Agder',
                postalCode: 4630,
                country: 'Norway',
            },
        });
        expect(order.shippingAddress).toHaveProperty('name', 'Jeffery');
    }));
    it('should not update a non-existing order ', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        const order = yield order_1.default.updateOrder(nonExistingOrderId, {
            shippingAddress: {
                name: 'Jeffery',
                addressLine1: 'Kaserniveien 15F',
                addressLine2: 'Kristiansand',
                city: 'Agder',
                postalCode: 4630,
                country: 'Norway',
            },
        }).catch((e) => {
            expect(e.message).toMatch(`Order ${nonExistingOrderId} not found`);
        });
    }));
    it('should delete an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield createOrder();
        yield order_1.default.deleteOrder(user.orders[0]._id, user._id);
        return yield order_1.default.findOrderById(user.orders[0]._id).catch((e) => {
            expect(e.message).toMatch(`Order ${user.orders[0]._id} not found`);
        });
    }));
});
//# sourceMappingURL=order.test.js.map