"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("../controllers/categoriesController");
const router = (0, express_1.Router)();
router.get('/get-categories', categoriesController_1.getCategories);
module.exports = router;
//# sourceMappingURL=categories.js.map