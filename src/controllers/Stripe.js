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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProduct = void 0;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const findProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const producto = yield stripe.products.retrieve(id);
        const precios = yield stripe.prices.list({ product: id });
        console.log('Información del producto:', precios);
        return res.json({ success: 200, product: producto, price: precios.data[0] });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error when searching product' });
    }
});
exports.findProduct = findProduct;
//# sourceMappingURL=Stripe.js.map