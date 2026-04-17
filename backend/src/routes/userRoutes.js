const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getUserOrders
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// All user routes require authentication
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/password', changePassword);
router.get('/orders', getUserOrders);

module.exports = router;