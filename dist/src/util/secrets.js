"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.JWT_SECRET = exports.STRIPE_WEBHOOK_ENDPOINT_SECRET = exports.STRIPE_SECRET_KEY = exports.STRIPE_PUBLISHABLE_KEY = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.Secret = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = process.env.NODE_ENV;
exports.Secret = process.env.SOME_LONG_UNGUESSABLE_STRING;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.STRIPE_PUBLISHABLE_KEY = process.env
    .STRIPE_PUBLISHABLE_KEY;
exports.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
exports.STRIPE_WEBHOOK_ENDPOINT_SECRET = process.env
    .STRIPE_WEBHOOK_ENDPOINT_SECRET;
const prod = exports.ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
exports.JWT_SECRET = process.env['JWT_SECRET'];
exports.MONGODB_URI = (prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI']);
if (!exports.JWT_SECRET) {
    logger_1.default.error('No client secret. Set JWT_SECRET environment variable.');
    process.exit(1);
}
if (!exports.MONGODB_URI) {
    if (prod) {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI environment variable.');
    }
    else {
        logger_1.default.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map