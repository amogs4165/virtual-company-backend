import express from "express";
import { messages, newMessage } from "../controllers/messageController";

const router = express.Router();

router.route("/").get(messages).post(newMessage);

export default router;