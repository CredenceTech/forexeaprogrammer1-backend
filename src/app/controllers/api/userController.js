const moment = require('moment');
const constMessages = require('../../../config/messages.json');
const knex = require('../../../config/knex');
const {user} = require("../../../config/dbConfig");

const users = {
    getUserList: async function (req, res){
        try {
            let query = knex('users')
                    .select('*')
                    .whereNull('deleted_at')
                    .orderBy('id', 'DESC')
                    .modify(function (queryBuilder) {
                        if (req.query.search){
                            queryBuilder.where('account_name', 'like', '%' + req.query.search + '%')
                                .orWhere('account_number', 'like', '%' + req.query.search + '%')
                        }
                    })

            var pageNumber = req.query.pageNumber;
            var page = ((pageNumber === undefined || pageNumber == null) ? 1 : pageNumber);
            var offset = 0;
            var pageSize = ((req.query.pageSize === undefined || req.query.pageSize === null) ? 10 : req.query.pageSize);
            if (pageNumber !== undefined) {
                offset = (page - 1) * pageSize;
            }

            var totalCount = (await query).length;
            var userList = await query.limit(parseInt(pageSize)).offset(parseInt(offset));
            var totalPages = (totalCount !== undefined) ? Math.ceil(parseInt(totalCount) / parseInt(pageSize)) : 0;
            return res.status(200).json({
                success: true,
                message: constMessages.SUCCESSAPI.GET_USER_LIST_SUCCESS,
                data: userList,
                totalCount : totalCount,
                totalPages: totalPages,
                page: page
            });
        } catch (err) {
            return res.status(400).json({success: false, message: err.message});
        }
    },

    createUser: async function(req, res){
        try{
            console.log("req.params:", req.body);
            let insertedUser;
            let user = await knex('users')
                .where('account_number', req.body.account_number)
                .first();

            if (user === undefined){
                user = await knex('users')
                    .insert({
                        account_name: req.body.account_name,
                        account_number: req.body.account_number,
                        account_balance: req.body.account_balance,
                        account_equity: req.body.account_equity,
                        total_pl: req.body.total_pl,
                        buy_lot: req.body.buy_lot,
                        sell_lot: req.body.sell_lot
                    })
                insertedUser = knex('users')
                    .select('*')
                    .whereNull('deleted_at')
                    .where('id', user.toString());
            }else{
                user = await knex('users')
                    .where('account_number', req.body.account_number)
                    .update({
                        account_name: req.body.account_name,
                        account_number: req.body.account_number,
                        account_balance: req.body.account_balance,
                        account_equity: req.body.account_equity,
                        total_pl: req.body.total_pl,
                        buy_lot: req.body.buy_lot,
                        sell_lot: req.body.sell_lot
                    })

                insertedUser = knex('users')
                    .select('*')
                    .whereNull('deleted_at')
                    .where('account_number', req.body.account_number)
            }
            console.log(user);
            console.log((await insertedUser.first()));
            return res.status(200).send("true");
        }catch (err) {
            console.log("error: ", err);
            return res.status(200).send("false");
        }
    }
}

module.exports = users;

