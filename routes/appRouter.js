const express = require('express');

const authRouter = require('./authRouter');
const propertyRouter = require('./propertyRouter');
const userRouter = require('./userRouter');
const tenantRouter = require('./tenantRouter');
const mpRouter = require('./mpRouter');
const cloudinaryRouter = require('./cloudinaryRouter');
const resolveTenant = require('../middlewares/resolveTenant');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.use('/tenants', tenantRouter);
router.use('/auth', resolveTenant, authRouter);
router.use('/properties', resolveTenant, propertyRouter);
router.use('/users', resolveTenant, validateUser, userRouter);
router.use('/mercado-pago', resolveTenant, validateUser, mpRouter);
router.use('/cloudinary', resolveTenant, validateUser, cloudinaryRouter);

module.exports = router;
