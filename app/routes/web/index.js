const express = require('express');
const router = express.Router();
const adminRoutes = require('app/routes/web/admin');
const authRoutes = require('app/routes/web/auth');

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);

module.exports = router