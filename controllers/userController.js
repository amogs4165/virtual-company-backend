import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Using authO
// @rout    GET /user
// @access  Public - Registered users with authO
export const googleAuth = asyncHandler(async (req, res) => {
  try {
    console.log("userInfo", req.userInfo);
    const { name, email, email_verified, picture, sub } = req.userInfo;

    const user = await User.findOne({ email });
    if (user) {
      if (email_verified && !user.isEmailVerified) {
        
      }

      if (!email_verified) {
        return res.status(400).json({
          message: "verify email",
        });
      }

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });
    }
    console.log(user, "user-------");
    if (!user) {
      console.log("create user");
      const user = await User.create({
        name,
        email,
        isEmailVerified: email_verified,
        picture,
      });
      console.log("helo");
      console.log(user, "here");
      if (user) {
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          wallet: user.wallet,
          isFounder: user.isFounder,
          isEmployee: user.isEmployee,
          company: user.company,
          picture: user.picture,
        });
      }
    }
    res.status(400);
    throw new Error("Invalid user data");
  } catch (error) {
    console.log(error);
  }
});
