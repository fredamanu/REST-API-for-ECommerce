"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.get('/', product_1.findAllProducts);
router.get('/bestsellers', product_1.findBestSellingProducts);
// router.get('/:productId', findProductById)
router.get('/:productName', product_1.findProductByName);
router.post('/', product_1.createProduct);
router.put('/:productId', product_1.updateProduct);
router.delete('/:productId', product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map