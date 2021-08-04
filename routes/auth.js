const router = require('express').Router();
const authControllers = require('../controllers/auth')

// Register Request
router.post('/register', authControllers.register_post)

// Login Request
router.post('/login', authControllers.login_post)

// Logout Request
// router.get('/logout', authControllers.logout_get)

module.exports = router;