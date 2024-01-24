// app/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/api/userController');
const {validateHandler} = require('../middleware/middleware');
let Validater = require('../../config/Validater');
let ValidaterClass = new Validater();

const router = express.Router();

//user routes
router.get('/users/list', userController.getUserList);
router.post('/user/add',  userController.createUser);
module.exports = router;
