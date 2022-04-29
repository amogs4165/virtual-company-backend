import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

// @desc    To get all registered company(approved by admin)
// @rout    GET /company
// @acce    Private - admin
export const getAllCompany = asyncHandler(async (req, res) => {
    const companies = await Company.find();
    if(companies)
        return res.status(201).json({companies:companies})
    
});

// @desc    To register a company
// @rout    POST /company
// @acce    Private - user
export const createCompany = asyncHandler(async (req, res) => {
    const newCompany = await Company.create(req.body);
    if(newCompany)
        return res.status(201).json({newCompany:newCompany})
    
});
