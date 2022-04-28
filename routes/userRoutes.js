import express from "express";
import { googleAuth } from "../controllers/userController.js";
import { userInfo } from "../middlewares/userInfo.js";
const router = express.Router();

router.route("/")
    .get(userInfo,googleAuth)
    // .put()
  
   

export default router;
