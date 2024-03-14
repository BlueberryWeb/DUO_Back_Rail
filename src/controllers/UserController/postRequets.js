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
exports.addUser = void 0;
const generalnfo_1 = require("./helpers/generalnfo");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, email, phoneNumber, password, role, 
    //Billing Data
    bill, bussiness_name, billing_email, billing_phone, street, ext_no, int_no, Colonia, Municipio, State, CFDI, Regimen, rfc, cp, product, Payments } = req.body;
    const generalInfo = {
        name,
        last_name,
        email,
        phoneNumber,
        password,
        role,
    };
    const billingData = {
        bill,
        bussiness_name,
        billing_email,
        billing_phone,
        street,
        ext_no,
        int_no,
        Colonia,
        Municipio,
        State,
        CFDI,
        Regimen,
        rfc,
        cp,
        product,
        Payments
    };
    try {
        const response = yield (0, generalnfo_1.saveGeneralInfo)(generalInfo);
        if (!response.success) {
            return res.status(response.error.code || 500).json({ error: response.error.message });
        }
        if (generalInfo.role === 'Subscriber') {
            // if( billingData)
        }
        else if (generalInfo.role === 'Admin') {
            res.json(response);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});
exports.addUser = addUser;
//# sourceMappingURL=postRequets.js.map