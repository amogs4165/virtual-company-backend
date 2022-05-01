import express from "express";
import {
  approveCompany,
  blockCompany,
  createCompany,
  getAllCompany,
  getPendingCompany,
  unBlockCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.route("/").get(getAllCompany).post(createCompany);

router.route("/pending").get(getPendingCompany);

router.route("/approve/:id").patch(approveCompany);

router.route("/block/:id").patch(blockCompany);

router.route("/unBlock/:id").patch(unBlockCompany);

router.route("/request/:id").post();

router.route("/request/:id").patch()

export default router;
