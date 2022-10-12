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
exports.deleteProduct = exports.updateProduct = exports.findAllProducts = exports.findBestSellingProducts = exports.findProductByName = exports.findProductById = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const product_1 = __importDefault(require("../services/product"));
const apiError_1 = require("../helpers/apiError");
exports.createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image, benefits, ingredients, suggestedUse, disclosure, reviews, ratings, numOfReviews, price, size, countInStock, } = req.body;
        const product = new Product_1.default({
            name,
            image,
            benefits,
            ingredients,
            suggestedUse,
            disclosure,
            reviews,
            ratings,
            numOfReviews,
            price,
            size,
            countInStock,
        });
        res.json(yield product_1.default.createProduct(product));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findProductById(req.params.productId));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findProductByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findProductByName(req.params.productName));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findBestSellingProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findBestSellingProducts());
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.findAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield product_1.default.findAllProducts());
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        res.json(yield product_1.default.updateProduct(req.params.productId, update));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.default.deleteProduct(req.params.productId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=product.js.map