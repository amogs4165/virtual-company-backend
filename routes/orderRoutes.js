import express from "express";
import { acceptOrder, orderRequest, verifyPayment } from "../controllers/orderController.js";

const router = express.Router();

router.route("/")
.get()
.post(orderRequest)
.put(acceptOrder);

router.route("/verify").get(verifyPayment)

export default router;
