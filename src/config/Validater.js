const { check, validationResult } = require("express-validator");
const constMessages = require("./messages.json");
const knex = require("../config/knex");
class Validater {

    constructor() {}
    //user's Validation
    createUserValidate() {
        return [
            check('account_number', constMessages.VALIDATION.NAME).not().isEmpty(),
            check('account_name', constMessages.VALIDATION.ACCOUNT_NUMBER.ACCOUNT_NUMBER_REQUIRED).not().isEmpty(),
            check('account_balance', constMessages.VALIDATION.ACCOUNT_BALANCE).isInt(),
            // check('account_equity', constMessages.VALIDATION.DATE).not().isEmpty(),
            // check('total_pl', constMessages.VALIDATION.DATE).not().isEmpty(),
            // check('buy_lot', constMessages.VALIDATION.DATE).not().isEmpty(),
            // check('sell_lot', constMessages.VALIDATION.DATE).not().isEmpty(),
        ];
    }
}
module.exports = Validater;