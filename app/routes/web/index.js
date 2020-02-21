const express = require('express');
const router = express.Router();
const adminRoutes = require('app/routes/web/admin');
const authRoutes = require('app/routes/web/auth');
const Payment = require('app/http/controller/api/paymentController')

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.post('/api/product/payment', Payment.pay);

module.exports = router