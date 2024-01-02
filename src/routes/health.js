"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Health Check
router.get('/', (req, res) => {
    res.sendStatus(200);
});
module.exports = router;
//# sourceMappingURL=health.js.map