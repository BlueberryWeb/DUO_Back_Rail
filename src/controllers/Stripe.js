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
exports.savePayment = exports.Purchase_details_add = exports.findProduct = void 0;
const Manage_subscriptions_1 = __importDefault(require("../models/Manage_subscriptions"));
const random_order_1 = require("../helpers/random-order");
const Purchase_details_1 = __importDefault(require("../models/Purchase_details"));
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const findProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const producto = yield stripe.products.retrieve(id);
        const precios = yield stripe.prices.list({ product: id });
        return res.json({ success: 200, product: producto, price: precios.data[0] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching product' });
    }
});
exports.findProduct = findProduct;
const Purchase_details_add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pagos = yield stripe.paymentIntents.list({
            customer: id,
        });
        console.log(pagos);
        const ultimoCargo = yield stripe.charges.retrieve(pagos.data[0].latest_charge);
        return res.json({ success: 200, data: pagos.data[0] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching product' });
    }
});
exports.Purchase_details_add = Purchase_details_add;
const savePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, id_stripe, billing, product, Payment, paypal_order, price_original, finaly_price } = req.body;
    try {
        const manageSubscriptionDuo = yield Manage_subscriptions_1.default.findOne({
            user: user,
            status: { $in: ['Active', 'Pending'] }
        });
        if (manageSubscriptionDuo || !user) {
            const Purchase_details_old = yield Purchase_details_1.default.findOne({
                id_user: user
            }).sort({ createdAt: -1 }).select('-id_user');
            ;
            if (Purchase_details_old) {
                return res.json({ success: 200, data: Purchase_details_old });
            }
            return res.status(500).json({ error: 'Error when searching subscription' });
        }
        const fechaDeseada = new Date('2024-05-31T00:00:00');
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
        let finaly_price_str;
        let ultimoCargo;
        let stripe_id;
        const price_original_str = parseFloat(price_original.replace(",", ""));
        if (finaly_price) {
            finaly_price_str = parseFloat(finaly_price.replace(",", ""));
        }
        else {
            const pagos = yield stripe.paymentIntents.list({
                customer: id_stripe,
            });
            stripe_id = pagos.data[0].latest_charge;
            ultimoCargo = yield stripe.charges.retrieve(pagos.data[0].latest_charge);
            finaly_price_str = parseFloat(ultimoCargo.payment_method_details.card.amount_authorized);
        }
        console.log(finaly_price);
        const purchase_details = new Purchase_details_1.default();
        purchase_details.id_user = user;
        purchase_details.bill = billing == 'Si' ? true : false;
        purchase_details.order = (0, random_order_1.GenerateRandomsCode)(8);
        purchase_details.pay_method = Payment;
        purchase_details.stripe_order = stripe_id;
        purchase_details.paypal_order = paypal_order;
        purchase_details.original_price = price_original_str;
        purchase_details.discount = price_original_str - (Payment === 'Card' ? (finaly_price_str / 100) : finaly_price_str);
        purchase_details.final_price = (Payment === 'Card' ? (finaly_price_str / 100) : finaly_price_str);
        purchase_details.save();
        const nuevaFecha = new Date(fechaGuardada);
        nuevaFecha.setFullYear(fechaGuardada.getFullYear() + 1);
        const manageSubscription = new Manage_subscriptions_1.default();
        manageSubscription.status = status;
        manageSubscription.type = product;
        manageSubscription.start = fechaGuardada;
        manageSubscription.end = nuevaFecha;
        manageSubscription.user = user;
        manageSubscription.save();
        return res.json({ success: 200, data: purchase_details });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching product' });
    }
});
exports.savePayment = savePayment;
//# sourceMappingURL=Stripe.js.map