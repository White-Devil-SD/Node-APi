const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');


router.get('/', UsersController.getUserList);
router.delete('/api/deleteallusers',UsersController.deleteuser);

router.get('/:id',UsersController.getUserByID);

router.post('/',UsersController.createNewUser);
module.exports = router;  