const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const tenantRouter = require('./tenantRouter');
const mpRouter = require('./mpRouter');
const cloudinaryRouter = require('./cloudinaryRouter');

const router = express.Router();

router.use('/tenants', tenantRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/mercado-pago', mpRouter);
router.use('/cloudinary', cloudinaryRouter);

module.exports = router;
