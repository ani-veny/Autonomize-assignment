const express= require('express');
const userController= require("../controllers/user.controller")

const router=express.Router();

router.post('/:username', userController.addUser);
router.get('/', userController.getUsers);
router.get('/search', userController.getuserBylocationOrUserName)
router.delete('/:userName', userController.updateUser);
router.patch('/:userName', userController.deleteUser);

module.exports= router;