import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel";
import bcrypt from 'bcrypt'
import { token } from "morgan";

// @desc    Auth admin & get token
// @rout    POST /admin
// @acce    Private
export const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if(!admin){
        res.status(401);
        throw new Error('Invalid credentials')
    }

    const validPassword = await bcrypt.compare(req.body.password,admin.password)
    if(!validPassword) return res.status(401).send({message:"Invalid credential"})

    if(validPassword){
        const tokenn = admin.generateAuthToken();
        return res.status(200).send({data:token, message:'Logged in successfully'})
    }

    res.status(500);
    throw new Error('Internal server error')
});
