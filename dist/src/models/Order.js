"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shippingAddressSchema = new mongoose_1.default.Schema({
    name: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    postalCode: { type: Number },
    country: { type: String },
});
const orderItemSchema = {
    _id: String,
    name: String,
    image: String,
    price: Number,
    qty: Number,
};
const orderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    paymentIntentId: {
        type: String,
    },
    orderItems: {
        type: [orderItemSchema],
    },
    shippingAddress: {
        type: shippingAddressSchema,
    },
    paymentMethod: {
        type: String,
        default: 'Card',
    },
    taxPrice: {
        type: Number,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        default: 0.0,
    },
    shippingRate: {
        type: String,
        default: 'shr_1LcsMGG5HlxfACqmeW3MWHhW',
    },
    totalAmount: {
        type: Number,
        default: 0.0,
    },
    paymentStatus: {
        type: String,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map