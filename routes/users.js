const router = require('express').Router();
const userController = require('../controllers/users');

// Delete User
router.delete('/:id', userController.delete_user);

// Get User by ID
router.get('/find_by_id/:id', userController.find_user_by_id);

// Get User by username
router.get('/find_by_username/:username', userController.find_user_by_username);

// Forgot Password Send Email
router.post('/reset-password', userController.forgot_password_send_email);

// Reset Password
router.post('/reset-password/:id/:token', userController.reset_password);

// Upload profile photo
router.post('/:id/profile-picture', userController.add_pp);


module.exports = router;