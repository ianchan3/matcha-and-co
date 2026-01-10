import express from 'express';

import * as checkoutCtrl from '../controllers/checkout.js'

const router = express.Router();

router.post('/', checkoutCtrl.create);



export default router;