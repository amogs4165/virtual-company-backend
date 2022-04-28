import express from 'express';
import { authAdmin } from '../controllers/adminController';

const router = express.Router();

router.route('/')
    .post(authAdmin)
    