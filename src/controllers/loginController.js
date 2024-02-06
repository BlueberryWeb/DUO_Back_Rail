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
exports.validateTokenUser = exports.logout = exports.authenticateUser = void 0;
const passport_1 = __importDefault(require("passport"));
const newToken_1 = require("../helpers/newToken");
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
                // const userWithAdditionalInfo = await User.findOne({ email: user.email }).select('-password') as UserProps;
                const userWithAdditionalInfo = yield User_1.default.findUser(user.email);
                req.logIn(userWithAdditionalInfo, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Error de autenticación' });
                    }
                    const authToken = yield (0, newToken_1.generateJWT)(user._id);
                    return res.json({ status: true, user: userWithAdditionalInfo, token: authToken });
                }));
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error de autenticación' });
            }
        }))(req, res, next);
    };
};
exports.authenticateUser = authenticateUser;
const logout = (req, res) => {
    console.log(req.sessionID);
    try {
        req.logout((err) => {
            if (err) {
                res.json({
                    status: 500,
                    message: err
                });
            }
            req.session.destroy((err) => {
                if (err) {
                    res.json({
                        status: 500,
                        message: 'Error al eliminar la sesión',
                        devTool: err
                    });
                }
                res.json({ status: 200, message: 'Sesión finalizada' });
            });
        });
    }
    catch (passportError) {
        console.log('error');
        res.status(500).json({ status: 500, message: '', devTool: passportError.message });
        console.log(passportError);
    }
};
exports.logout = logout;
const validateTokenUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        if (!req.user) {
            // console.log('object')
            return res.json({
                status: 401
            });
        }
        const user = req.user;
        if (!user || !user.uid) {
            return res.status(401).json({ message: 'Usuario no autorizado' });
        }
        const token = yield (0, newToken_1.generateJWT)(user.uid);
        res.json({
            status: 200,
            user: req.user,
            token: token,
        });
    }
    catch (error) {
        return res.json({
            status: 501,
            message: 'Error interno del servidor',
            devTool: error.message
        });
    }
});
exports.validateTokenUser = validateTokenUser;
//# sourceMappingURL=loginController.js.map