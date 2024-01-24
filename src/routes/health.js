"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authReCaptch_1 = require("../middleware/Auth/authReCaptch");
const services_1 = require("../controllers/services");
const router = (0, express_1.Router)();
// Health Check
router.post('/recaptcha', authReCaptch_1.ReCaptcha);
router.get('/cp/:cp', services_1.FindCity);
module.exports = router;
//# sourceMappingURL=health.js.map