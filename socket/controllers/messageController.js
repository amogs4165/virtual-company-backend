import asyncHandler from "express-async-handler";
import Message from "../models/messages";

// @desc    New message
// @rout    POST /message
// @acce    Private - user
export const newMessage = asyncHandler(async (req, res) => {
  const newMessage = new Message(req.body);
  const savedMessage = await newMessage.save();
  res.status(200).json(savedMessage);
});

// @desc    New message
// @rout    GET /message/:conversationId
// @acce    Private - user
export const messages = asyncHandler(async (req, res) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId,
    })
    res.status(200).json(messages);
});
