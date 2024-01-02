"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render('login');
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authValidate.js.map