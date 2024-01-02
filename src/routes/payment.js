"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentStripe_1 = require("../controllers/paymentStripe");
const Stripe_1 = require("../controllers/Stripe");
const router = (0, express_1.Router)();
router.get('/payment', paymentStripe_1.paymentIntent);
router.get('/find_product/:id', Stripe_1.findProduct);
// router.post('/save-user', saveUser);
// router.patch('/update-user/:id', updateUser);
// router.delete('/remove-user/:id', removeUser);
module.exports = router;
//# sourceMappingURL=payment.js.map