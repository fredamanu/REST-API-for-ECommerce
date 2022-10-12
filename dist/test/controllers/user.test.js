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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const db_helper_1 = __importDefault(require("../../test/db-helper"));
const nonExistingProductId = '5e57b77b5744fa0b461c7906';
const findOrCreateUser = (override) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash('gh793jgdjs', 10);
    let newUser = {
        firstName: 'Freda',
        lastName: 'Manu',
        email: 'example@gmail.com',
        password: hash,
    };
    if (override) {
        newUser = Object.assign(Object.assign({}, newUser), override);
    }
    return yield supertest_1.default(app_1.default).post('/api/v1/users/register').send(newUser);
});
describe('order controller', () => {
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
    it('should find or create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield findOrCreateUser();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.firstName).toBe('Freda');
    }));
    it('should create of find user with wrong data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(app_1.default).post('/api/v1/users/register').send({
            firstName: 'Freda',
            lastName: 'Manu',
            email: 'example@gmail.com',
        });
        expect(res.status).toBe(500);
    }));
    it('should find all users', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield findOrCreateUser();
        expect(res.status).toBe(200);
        res = yield supertest_1.default(app_1.default).get(`/api/v1/users`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    }));
    it('should find an existing user by Id', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield findOrCreateUser();
        expect(res.status).toBe(200);
        const userId = res.body._id;
        res = yield supertest_1.default(app_1.default).get(`/api/v1/users/${userId}`);
        expect(res.status).toBe(200);
        expect(res.body._id).toEqual(userId);
    }));
    //   it('should find an existing user by email', async () => {
    //     let res = await findOrCreateUser()
    //     expect(res.status).toBe(200)
    //     const userId = res.body._id
    //     const user = {
    //       email: 'example@gmail.com',
    //       password: "gh793jgdjs",
    //     }
    //     res = await request(app).post(`/api/v1/users/login`).send(user)
    //     expect(res.status).toBe(200)
    //     expect(res.body._id).toEqual(userId)
    //   })
    it('should update an existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield findOrCreateUser();
        expect(res.status).toBe(200);
        const userId = res.body._id;
        res = yield supertest_1.default(app_1.default).put(`/api/v1/users/${userId}`).send({
            firstName: 'Chilly',
        });
        expect(res.body.firstName).toBe('Chilly');
    }));
    it('should not update a non-existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield findOrCreateUser();
        expect(res.status).toBe(200);
        res = yield supertest_1.default(app_1.default)
            .put(`/api/v1/users/${nonExistingProductId}`)
            .send({
            firstName: 'Chilly',
        });
        expect(res.status).toBe(404);
    }));
    it('should delete an existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield findOrCreateUser();
        expect(res.status).toBe(200);
        const userId = res.body._id;
        const productName = res.body.name;
        res = yield supertest_1.default(app_1.default).delete(`/api/v1/users/${userId}`);
        expect(res.status).toBe(204);
        res = yield supertest_1.default(app_1.default).get(`/api/v1/users/${userId}`);
        expect(res.status).toBe(404);
    }));
});
//# sourceMappingURL=user.test.js.map