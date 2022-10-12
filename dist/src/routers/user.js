"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get('/', user_1.findAllUsers);
router.get('/:userId', user_1.findUserById);
router.put('/:userId', user_1.updateUser);
router.delete('/:userId', user_1.deleteUser);
router.post('/register', user_1.findOrCreateUserUsingRegister);
router.post('/login', user_1.findUserByEmail);
exports.default = router;
// function (req, res) {
//   res.send('hello')
// }
//# sourceMappingURL=user.js.map