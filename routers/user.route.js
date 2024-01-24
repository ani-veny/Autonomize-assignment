const express= require('express');
const userController= require("../controllers/user.controller")

const router=express.Router();

router.get('/search', userController.getuserBylocationOrUserName)
router.get('/:username', userController.addUser);
router.get('/', userController.getUsers);
router.delete('/:username', userController.deleteUser);
router.patch('/:username', userController.updateUser);

module.exports= router;