"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = require("../controllers/payment");
const router = express_1.default.Router();
router.post('/', payment_1.paymentProcessing);
router.post('/webhook', express_1.default.raw({ type: 'application/json' }), payment_1.stripeWebhook);
exports.default = router;
//# sourceMappingURL=payment.js.map