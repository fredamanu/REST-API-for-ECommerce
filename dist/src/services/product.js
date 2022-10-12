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
const apiError_1 = require("../helpers/apiError");
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield product.save();
    return newProduct;
});
const findProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findById(productId);
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} not found`);
    }
    return foundProduct;
});
const findProductByName = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findOne({ name: productName });
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productName} not found`);
    }
    return foundProduct;
});
const findBestSellingProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const foundProducts = yield Product_1.default.find({ isBestSeller: true });
    if (!foundProducts) {
        throw new apiError_1.NotFoundError('There are no best-sellers available');
    }
    return foundProducts;
});
const findAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const foundProducts = yield Product_1.default.find();
    if (!foundProducts) {
        throw new apiError_1.NotFoundError('No products');
    }
    return foundProducts;
});
const updateProduct = (productId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findByIdAndUpdate(productId, update, {
        new: true,
    });
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} not found`);
    }
    return foundProduct;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findByIdAndDelete(productId);
    if (!foundProduct) {
        throw new apiError_1.NotFoundError(`Product ${productId} not found`);
    }
    return foundProduct;
});
exports.default = {
    createProduct,
    findProductById,
    findBestSellingProducts,
    findProductByName,
    findAllProducts,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.js.map