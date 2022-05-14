import express from "express";
import { messages, newMessage } from "../controllers/messageController.js";

const router = express.Router();

router.route("/:conversationId").get(messages).post(newMessage);

export default router;