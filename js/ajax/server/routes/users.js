const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');

const validateUserModel = require('../validators/userValidator').validateUserModel;
const validatePermitions = require('../validators/userValidator').validatePermitions;

router.get('/', userController.getUserList);

router.post('/', validateUserModel, userController.addUser);

router.put('/:id', validateUserModel, userController.updateUser);

router.delete('/:id', validatePermitions, userController.deleteUser);

module.exports = router;