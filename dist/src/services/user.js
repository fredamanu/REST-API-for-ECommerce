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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
const findOrCreateUsingRegister = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findOne({ email: user.email });
    if (!foundUser) {
        const foundUser = yield user.save();
        const token = jsonwebtoken_1.default.sign({ email: foundUser.email, id: foundUser._id }, secrets_1.JWT_SECRET);
        return { foundUser, token };
    }
    const token = jsonwebtoken_1.default.sign({ email: foundUser.email, id: foundUser._id }, secrets_1.JWT_SECRET);
    return { foundUser, token };
});
const findOrCreate = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findOne({ email: user.email });
    if (!foundUser) {
        const newUser = yield user.save();
        return newUser;
    }
    const updatedFoundUser = yield User_1.default.findOneAndUpdate({ email: user.email }, { image: user.image });
    return updatedFoundUser;
});
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId).populate('orders');
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
const findUserByEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findOne({ email: user.email });
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`user ${user.email} not found`);
    }
    else {
        const match = yield bcrypt_1.default.compare(user.password, foundUser.password);
        if (match === true) {
            const token = jsonwebtoken_1.default.sign({ email: foundUser.email, id: foundUser._id }, secrets_1.JWT_SECRET);
            return { foundUser, token };
        }
        throw new apiError_1.NotFoundError('password is incorrect');
    }
});
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const foundUsers = yield User_1.default.find();
    if (!foundUsers) {
        throw new apiError_1.NotFoundError('No users');
    }
    return foundUsers;
});
const updateUser = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndUpdate(userId, update, {
        new: true,
    });
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndDelete(userId);
    if (!foundUser) {
        throw new apiError_1.NotFoundError('user not found');
    }
    return foundUser;
});
exports.default = {
    findOrCreate,
    findOrCreateUsingRegister,
    findUserById,
    findUserByEmail,
    findAllUsers,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.js.map