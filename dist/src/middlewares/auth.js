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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const isCustomAuth = (token === null || token === void 0 ? void 0 : token.length) < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jsonwebtoken_1.default.verify(token, secrets_1.JWT_SECRET);
            req.user = decodedData;
        }
        else {
            decodedData = jsonwebtoken_1.default.decode(token);
            req.user = decodedData === null || decodedData === void 0 ? void 0 : decodedData.sub;
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = auth;
//# sourceMappingURL=auth.js.map