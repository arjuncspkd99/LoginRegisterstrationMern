const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require('../middleware/authMiddleware');



router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/home', authMiddleware, (req, res) => {
  res.send('Welcome to the home page!');
});

module.exports = router;
