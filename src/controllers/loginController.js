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
exports.authenticateUser = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticateUser = () => {
    return (req, res, next) => {
        passport_1.default.authenticate('local', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error de autenticación' });
                }
                if (!user) {
                    console.error(info.message);
                    const errorMessage = info.message || 'No fue posible validar tus credenciales. Por favor, verifícalas e inténtalo de nuevo';
                    return res.status(401).json({ error: errorMessage });
                }
                const userWithAdditionalInfo = yield User_1.default.findOne({ email: user.email }).select('-password');
                req.logIn(userWithAdditionalInfo, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Error de autenticación' });
                    }
                    if (!process.env.SECRET_PASS_JWT) {
                        return res.status(500).json({ error: 'SECRET_PASS_JWT no tiene un valor definido' });
                    }
                    const authToken = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.SECRET_PASS_JWT, {
                        expiresIn: '1h'
                    });
                    return res.json({ status: true, user: userWithAdditionalInfo, token: authToken });
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error de autenticación' });
            }
        }))(req, res, next);
    };
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=loginController.js.map