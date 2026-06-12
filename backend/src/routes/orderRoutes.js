const express = require('express');
const router = express.Router();
const {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
  getOrders,
  getOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/:id', protect, getOrder);

module.exports = router;