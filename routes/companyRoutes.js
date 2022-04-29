import express from 'express';
import { createCompany, getAllCompany } from '../controllers/companyController.js';

const router = express.Router();

router.route('/')
    .get(getAllCompany)
    .post(createCompany)

export default router;