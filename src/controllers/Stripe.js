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
exports.savePayment = exports.findProduct = void 0;
const Manage_subscriptions_1 = __importDefault(require("../models/Manage_subscriptions"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const findProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id);
    try {
        const producto = yield stripe.products.retrieve(id);
        const precios = yield stripe.prices.list({ product: id });
        // console.log('Información del producto:', precios);
        return res.json({ success: 200, product: producto, price: precios.data[0] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching product' });
    }
});
exports.findProduct = findProduct;
const savePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, billing, product } = req.body;
    try {
        const manageSubscriptionDuo = yield Manage_subscriptions_1.default.findOne({
            user: user,
            status: { $in: ['Active', 'Pending'] }
        });
        if (manageSubscriptionDuo || !user) {
            return res.status(404).json({ error: 'Usuario con una subscription' });
        }
        const fechaDeseada = new Date('2024-05-01T00:00:00');
        const fechaActual = new Date();
        let status;
        let fechaGuardada;
        if (fechaActual < fechaDeseada) {
            fechaGuardada = fechaDeseada;
            status = 'Pending';
        }
        else {
            fechaGuardada = fechaActual;
            status = 'Active';
        }
        const nuevaFecha = new Date(fechaGuardada);
        nuevaFecha.setFullYear(fechaGuardada.getFullYear() + 1);
        const manageSubscription = new Manage_subscriptions_1.default();
        manageSubscription.status = status;
        manageSubscription.start = fechaGuardada;
        manageSubscription.end = nuevaFecha;
        manageSubscription.user = user;
        manageSubscription.save();
        // console.log(nuevaFecha);
        return res.json({ success: 200 });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching product' });
    }
});
exports.savePayment = savePayment;
//# sourceMappingURL=Stripe.js.map