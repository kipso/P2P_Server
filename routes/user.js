const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user_controller');

//Handle requests to route "/user"

// router.get("/:userId", UserController.get_user);

router.post("/signup", UserController.user_signup);

module.exports = router;