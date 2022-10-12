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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const user_1 = __importDefault(require("./routers/user"));
const movie_1 = __importDefault(require("./routers/movie"));
const product_1 = __importDefault(require("./routers/product"));
const order_1 = __importDefault(require("./routers/order"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
const payment_1 = __importDefault(require("./routers/payment"));
const secrets_1 = require("./util/secrets");
const User_1 = __importDefault(require("./models/User"));
const user_2 = __importDefault(require("./services/user"));
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
// Express configuration
app.set('port', process.env.PORT || 5000);
// Global middleware
app.use(apiContentType_1.default);
app.use(express_1.default.json());
app.use(cors_1.default());
//passport middleware config
app.use(express_session_1.default({ secret: 'This is a secret', resave: true, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//Passport
passport_1.default.serializeUser((user, done) => {
    return done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    return done(null, user);
});
passport_1.default.use(new passport_google_id_token_1.default({
    clientID: secrets_1.GOOGLE_CLIENT_ID,
}, function (accessToken, googleId, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = new User_1.default({
            firstName: accessToken.payload.given_name,
            lastName: accessToken.payload.family_name,
            email: accessToken.payload.email,
            image: accessToken.payload.picture,
        });
        const user = yield user_2.default.findOrCreate(newUser);
        done(null, user);
    });
}));
app.post('/auth/google', passport_1.default.authenticate('google-id-token'), function (req, res) {
    // do something with req.user
    res.json(req.user);
});
//Dummy test
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
// Set up routers
app.use('/api/v1/movies', movie_1.default);
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/products', product_1.default);
app.use('/api/v1/orders', order_1.default);
app.use('/api/v1/stripe', payment_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map