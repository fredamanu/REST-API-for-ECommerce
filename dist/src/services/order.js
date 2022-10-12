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
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../helpers/apiError");
const Order_1 = __importDefault(require("../models/Order"));
const user_1 = __importDefault(require("../services/user"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = yield order.save();
    const user = yield user_1.default.findUserById(order.userId);
    user.orders.push(newOrder._id);
    yield user.save();
    return newOrder._id;
});
const findOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findById(orderId);
    if (!foundOrder) {
        throw new apiError_1.NotFoundError(`Order ${orderId} not found`);
    }
    return foundOrder;
});
const findAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrders = yield Order_1.default.find({ userId: userId }).sort({
        createdAt: -1,
    });
    if (!foundOrders) {
        throw new apiError_1.NotFoundError('No orders');
    }
    return foundOrders;
});
const updateOrder = (orderId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findByIdAndUpdate(orderId, update, {
        new: true,
    });
    if (!foundOrder) {
        throw new apiError_1.NotFoundError(`Order ${orderId} not found`);
    }
    return foundOrder;
});
const deleteOrder = (orderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findByIdAndDelete(orderId);
    if (!foundOrder) {
        throw new apiError_1.NotFoundError(`Order ${orderId} not found`);
    }
    const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { $pull: { orders: orderId } });
    yield (user === null || user === void 0 ? void 0 : user.save());
    return foundOrder;
});
exports.default = {
    createOrder,
    findAllOrders,
    findOrderById,
    updateOrder,
    deleteOrder,
};
//# sourceMappingURL=order.js.map