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
exports.addUser = exports.findUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const s3Services_1 = require("../middleware/s3Services");
const Billing_1 = __importDefault(require("../models/Billing"));
const User_1 = __importDefault(require("../models/User"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailToSearch = req.query.email;
    try {
        const user = yield User_1.default.findOne({});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});
exports.findUser = findUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password, last_name, business_name, billing_email, billing_phone, street, ext_no, int_no, Colonia, Municipio, State, CFDI, Regimen, rfc, cp, bill, product } = req.body;
    console.log(product);
    try {
        const userOld = yield User_1.default.findOne({ email: email });
        if (userOld) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = yield new User_1.default();
        user.name = name;
        user.lastname = last_name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.password = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
        const stripeCustumer = yield stripe.customers.create({
            email: email,
            name: name,
        });
        user.stripeCustomerId = stripeCustumer.id;
        user.save();
        let billindId;
        if (bill == 'Si') {
            const result = yield (0, s3Services_1.uploadFile)(req.file);
            const billing = yield new Billing_1.default();
            billing.name = business_name;
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
            console.log(billing);
            billing.save();
            billindId = billing.id;
            console.log(result);
        }
        const session = yield stripe.checkout.sessions.create({
            success_url: `https://pay.duo.zone/inicio?user=${user.id}&billing=${billindId}`,
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
        });
        console.log(session);
        return res.json({ success: 200, url: session.url });
        // return res.json(session.url);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching for the user' });
    }
});
exports.addUser = addUser;
//# sourceMappingURL=usersController.js.map