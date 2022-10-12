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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../src/models/User"));
const user_1 = __importDefault(require("../../src/services/user"));
const db_helper_1 = __importDefault(require("../db-helper"));
const nonExistingUserId = '5e57b77b5744fa0b461c7906';
const findOrCreateUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash('gh793jgdjs', 10);
    const newUser = new User_1.default({
        firstName: 'Freda',
        lastName: 'Manu',
        email: 'example@gmail.com',
        password: hash,
    });
    return yield user_1.default.findOrCreate(newUser);
});
describe('user service', () => {
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
    it('should find or create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield findOrCreateUser();
        expect(newUser).toHaveProperty('firstName', 'Freda');
    }));
    it('should find user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield findOrCreateUser();
        const user = {
            firstName: 'Freda',
            lastName: 'Manu',
            email: 'example@gmail.com',
            password: 'gh793jgdjs',
        };
        const foundUser = yield user_1.default.findUserByEmail(user);
        expect(foundUser).toHaveProperty('firstName', 'Freda');
    }));
    it('should not find a non-existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield findOrCreateUser();
        const user = {
            firstName: 'Freda',
            lastName: 'Manu',
            email: 'freda@gmail.com',
            password: 'gh793jgdjs',
        };
        return yield user_1.default.findUserByEmail(user).catch((e) => {
            expect(e.message).toMatch(`user ${user.email} not found`);
        });
    }));
    it('should find all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield findOrCreateUser();
        const users = yield user_1.default.findAllUsers();
        expect(users).toHaveLength(1);
    }));
    it('should update an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield findOrCreateUser();
        const foundUser = yield user_1.default.updateUser(newUser === null || newUser === void 0 ? void 0 : newUser._id, {
            firstName: 'Linda',
        });
        expect(foundUser.firstName).toEqual('Linda');
    }));
    it('should not update a non-exiting user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield findOrCreateUser();
        return yield user_1.default.updateUser(nonExistingUserId, {
            firstName: 'Linda',
        }).catch((e) => {
            expect(e.message).toMatch(`User ${nonExistingUserId} not found`);
        });
    }));
    it('should delete an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield findOrCreateUser();
        yield user_1.default.deleteUser(user._id);
        return yield user_1.default.findUserByEmail(user).catch((e) => {
            expect(e.message).toMatch(`user ${user.email} not found`);
        });
    }));
});
//# sourceMappingURL=user.test.js.map