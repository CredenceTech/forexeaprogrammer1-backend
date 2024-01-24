const { check, validationResult } =  require("express-validator");

async function validateHandler(req, res, next) {
    console.log("req_param:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.errors[0].msg });
    } else {
        next();
    }
}
module.exports = {
    validateHandler
};