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
exports.updatePassword = exports.addUser = exports.findUserByEmail = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const s3Services_1 = require("../middleware/s3Services");
const Billing_1 = __importDefault(require("../models/Billing"));
const User_1 = __importDefault(require("../models/User"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const data = yield User_1.default.findByEmail(email);
        if (!data) {
            return res.json({
                status: 400,
                message: 'Usuario no encontrado. Verifique el correo electrónico y e intentolo de nuevo'
            });
        }
        res.json(data);
    }
    catch (error) {
        res.json({
            status: 500,
            message: 'Error interno del servidor',
            devTool: error.message
        });
    }
});
exports.findUserByEmail = findUserByEmail;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password, last_name, bussiness_name, billing_email, billing_phone, street, ext_no, int_no, Colonia, Municipio, State, CFDI, Regimen, rfc, cp, bill, product, Payments } = req.body;
    try {
        const userOld = yield User_1.default.findOne({ email: email });
        if (userOld) {
            return res.json({ status: 201, error: 'Usuario registrado si ya tienes un usuario registrado con este correo inicia sesion en DUO' });
        }
        const user = yield new User_1.default();
        user.name = name;
        user.lastname = last_name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.rol = 'user';
        user.password = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
        const stripeCustumer = yield stripe.customers.create({
            email: email,
            name: name,
        });
        user.stripeCustomerId = stripeCustumer.id;
        user.save();
        if (bill == 'Si') {
            const result = yield (0, s3Services_1.uploadFile)(req.file);
            const billing = yield new Billing_1.default();
            billing.name = bussiness_name;
            billing.rfc = rfc;
            billing.email = billing_email;
            billing.phone = billing_phone;
            billing.street = street;
            billing.outdoor_num = ext_no;
            billing.interior_num = int_no;
            billing.cp = cp;
            billing.colony = Colonia;
            billing.city = Municipio;
            billing.state = State;
            billing.cfdi = CFDI;
            billing.tax_regime = Regimen;
            billing.tax_certificate = result.Location,
                billing.status = 'Pending';
            billing.user = user.id;
            billing.save();
        }
        if (Payments === 'Card') {
            const session = yield stripe.checkout.sessions.create({
                success_url: `http://localhost:5173/success?user=${user.id}&billing=${bill}&stripe_ref=${stripeCustumer.id}`,
                cancel_url: 'https://WWW.DUO.ZONE',
                customer: stripeCustumer.id,
                line_items: [
                    {
                        price: product,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                payment_method_options: {
                    card: {
                        installments: {
                            enabled: true,
                        },
                    },
                },
                allow_promotion_codes: true,
            });
            return res.json({ success: 200, url: session.url, payment: 'Card' });
        }
        else if (Payments === 'Paypal') {
            return res.json({ success: 200, payment: 'Paypal', id_user: user.id, billindId: bill });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching for the user' });
    }
});
exports.addUser = addUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.json({
                status: 404,
                message: 'Usuario no encontrado'
            });
        }
        const newPassword = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
        user.password = newPassword;
        yield user.save();
        res.json({
            status: 202,
            message: 'Contraseña actualizada'
        });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error interno del servidor', devTool: error.message });
        console.log(error);
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=usersController.js.map