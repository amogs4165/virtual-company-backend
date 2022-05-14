import { Server } from "socket.io";
import Message from "../models/messagesModel.js";


export const createSocket = (server) => {
  console.log("socket io server creating");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  let users = [];

  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    socket.on("add user", (userId) => {
  
      addUser(userId, socket.id);
    });

    socket.on("message", async ({ name, message, senderId, receiverId, conversationId }) => {
      console.log(socket.id);
      const newMessage = await Message.create({conversationId,senderId, text: message})
      console.log(newMessage,"new message")
      io.emit("message", { name, message });
    });

    // socket.on("message", ({ name, message, senderId, conversationId }) => {
      
    //   io.to(userId).emit({ name, message });
    // });

    socket.on("notification", ({ message }) => {
      io.emit("notification", { message });
    });

    socket.on("groupMessage", ({ name, message, senderId, conversationId }) => {
      io.in(conversationId, { name, message });
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
};
