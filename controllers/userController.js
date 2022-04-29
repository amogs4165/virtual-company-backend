import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Using authO
// @rout    GET /user
// @acce    Private - Registered users with authO
export const googleAuth = asyncHandler(async (req, res) => {
  try {
    console.log("userInfo", req.userInfo);
    const { name, email, email_verified, picture, sub } = req.userInfo;

    const user = await User.findOne({ email });
    if (user) {
      if (email_verified && !user.isEmailVerified) {
        await User.updateOne(
          { _id: user._id },
          { isEmailVerified: email_verified }
        );
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
      const user = await User.create({
        name,
        email,
        isEmailVerified: email_verified,
        picture,
      });

      if (user.isEmailVerified) {
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

      if (!user.isEmailVerified) {
        return res.status(400).json({
          message: "verify email",
        });
      }
    }
    res.status(400);
    throw new Error("Invalid user data");
  } catch (error) {
    console.log(error);
  }
});
