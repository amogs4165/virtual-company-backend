import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";

// @desc    New conversation
// @rout    POST /conversation
// @acce    Private - user
export const newConversation = asyncHandler(async (req, res) => {
  console.log("slfdj",req.body)
  const conversation = await Conversation.findOne({members:{$all:[req.body.senderId,req.body.receiverId]}})
  console.log(conversation)
  if (conversation)
    return res.status(200).json(conversation)

    console.log("new created")
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  const savedConversation = await newConversation.save();
  res.status(200).json(savedConversation);
});

// @desc    get conversation
// @rout    GET /conversation
// @acce    Private - user
export const userConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(conversation);
});

// @desc    get conversation
// @rout    GET /conversation/group
// @acce    Private - user
export const groupConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findOne({
    members: { $all: [...req.body.users] },
  });
  res.status(200).json(conversation);
});
