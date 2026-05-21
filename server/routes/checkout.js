import express from 'express';

import * as checkoutCtrl from '../controllers/checkout.js'

const router = express.Router();

router.post('/', checkoutCtrl.create);
router.get('/session/:sessionId', checkoutCtrl.getSession);




export default router;