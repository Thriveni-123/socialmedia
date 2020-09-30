const express = require('express');
const router = express.Router();
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userController = require('../controller/userController');
const userSchema = require('../apiSchema/userSchema');

module.exports = router;

router.post('/login', joiSchemaValidation.validateBody(userSchema.login),
userController.Login
);

router.post('/add',
userController.Addpost
);

router.post('/update',
userController.Updatepost
);
router.post('/delete',joiSchemaValidation.validateBody(userSchema.delete),
userController.Deletepost
);