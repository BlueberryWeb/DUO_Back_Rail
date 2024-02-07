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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../models/User"));
class PassportConfig {
    initializePassport() {
        passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email: username });
                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado. Verifica tu correo electrónico e intentalo de nuevo.' });
                }
                const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordMatch) {
                    return done(null, false, { message: 'Contraseña incorrecta. Verifica tu contraseña e intentalo de nuevo.' });
                }
                return done(null, user);
            }
            catch (error) {
                return done(null, false, { message: 'Error de autenticación' });
            }
        })));
        passport_1.default.serializeUser((user, done) => {
            console.log(user);
            if (user && user.uid) {
                console.log('success');
                done(null, user.uid);
            }
            else {
                console.log('error');
                done(new Error('Usuario inválido para la serialización'));
            }
        });
        passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
            console.log('entrando deserializeUser');
            try {
                const user = yield User_1.default.findById(id);
                if (!user) {
                    console.log('error');
                    return done(null, false);
                }
                const fullUser = yield User_1.default.findUser(user.email);
                if (!fullUser) {
                    console.log('no user...');
                    return done(null, false);
                }
                console.log('deserialize user...');
                return done(null, fullUser);
            }
            catch (error) {
                console.log('error catch:', error);
                return done(error);
            }
        }));
    }
}
exports.default = new PassportConfig();
//# sourceMappingURL=authConfig.js.map