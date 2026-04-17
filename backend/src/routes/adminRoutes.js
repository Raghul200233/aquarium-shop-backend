const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUser,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard stats
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);

// Order management
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;