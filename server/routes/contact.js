import express from 'express';

import * as contactCtrl from '../controllers/contact.js'

const router = express.Router();

router.post('/', contactCtrl.create);

export default router