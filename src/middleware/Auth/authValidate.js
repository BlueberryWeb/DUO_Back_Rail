"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.json({
            status: 401,
            message: 'Usuario con sesión no autorizada.'
        });
    }
    // Redirect to a login view (web only)
    // res.render('login');
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authValidate.js.map