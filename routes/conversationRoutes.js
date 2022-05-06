import express from "express";
import { newConversation, userConversation } from "../socket/controllers/conversationController";

const router = express.Router();

router.route("/").get(userConversation).post(newConversation);

// router.route("/group")
export default router;
