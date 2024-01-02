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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
// import PassportConfig from '../middleware/Auth/authConfig'
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../database/config");
const authConfig_1 = __importDefault(require("../middleware/Auth/authConfig"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.paths = {
            health: '/',
            login: '/api/login',
            users: '/api/users',
            payments: '/api/payments',
        };
        this.dbConnection();
        this.middleware();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, config_1.connectionDB)();
                console.log('Data base connection success');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    routes() {
        this.app.use(this.paths.login, require('../routes/login'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.payments, require('../routes/payment'));
        this.app.use(this.paths.health, require('../routes/health'));
    }
    middleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
        // Login config view
        this.app.set('views', path_1.default.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        // Authenticate confg
        this.app.use((0, cookie_parser_1.default)(process.env.SECRET_PASS_COOKIES_PARSER));
        this.app.use((0, express_session_1.default)({
            secret: process.env.SECRETORPRIVATEKEY,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 3600000,
                sameSite: 'none',
            }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        authConfig_1.default.initializePassport();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server up on ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map