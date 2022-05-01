import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";
import Request from "../models/joinRequestModel.js";
import User from "../models/userModel.js";

// @desc    To register a company
// @rout    POST /company
// @acce    Private - user
export const createCompany = asyncHandler(async (req, res) => {
  const newCompany = await Company.create(req.body);
  if (newCompany) {
    //   const Email = req.user.email
    //   const user = User.findOne({email:Email})
    //   user.isFounder = true;
    //   user.companyId = newCompany._id;
    //   await user.save();
    return res.status(201).json({ newCompany: newCompany });
  }
  res.status(500).json({ messgae: "Internal server error" });
});

// @desc    To get all registered company(approved by admin)
// @rout    GET /company
// @acce    Private - admin
export const getAllCompany = asyncHandler(async (req, res) => {
  const companies = await Company.find({ approved: true });
  if (companies) return res.status(200).json({ companies: companies });

  res.status(500).json({ messgae: "internal server error" });
});

// @desc    To get all requested company (not approved by admin)
// @rout    GET /company/pending
// @acce    Private - admin
export const getPendingCompany = asyncHandler(async (req, res) => {
  const pendingCompanies = await Company.find({ approved: false });
  if (pendingCompanies)
    return res.status(200).json({ pendingCompanies: pendingCompanies });
  res.status(500).json({ message: "Internal server error" });
});

// @desc    To approve company
// @rout    PATCH /company/approve/:id
// @acce    Private - admin
export const approveCompany = asyncHandler(async (req, res) => {
  const COMPANY_ID = req.params.id;
  const company = await Company.findOne({ _id: COMPANY_ID });
  if (company) {
    company.approved = true;
    await company.save();
    return res.status(201).json({ message: "succesfully updated" });
  }
});

// @desc    To block a company
// @rout    PATCH /company/block/:id
// @acce    Private - admin
export const blockCompany = asyncHandler(async (req, res) => {
  const COMPANY_ID = req.params.id;
  const company = await Company.findOne({ _id: COMPANY_ID });
  if (company) {
    company.isBlocked = true;
    await company.save();
    return res.status(201).json({ message: "blocked" });
  }
});

// @desc    To unBlock a company
// @rout    PATCH /company/unBlock/:id
// @acce    Private - admin
export const unBlockCompany = asyncHandler(async (req, res) => {
  const COMPANY_ID = req.params.id;
  const company = await Company.findOne({ _id: COMPANY_ID });
  if (company) {
    company.isBlocked = false;
    await company.save();
    return res.status(201).json({ message: "unblocked" });
  }
});

// @desc    To request to join a company
// @rout    POST /company/request/:id
// @acce    Private - user
export const sendRequest = asyncHandler(async (req, res) => {
  const COMPANY_ID = req.params.id;
  const request = await Request.create(req.body)
  if(request)
    res.json(201).json({message: "request sended"})
});

// @desc    To cancel a request
// @rout    DELETE /company/request
// @acce    Private - user
export const cancelRequest = asyncHandler(async(req,res)=>{
  const COMPANY_ID = req.body.userId;
  const USER_ID = req.body.companyId;
  const request = await Request.findOne({userId:USER_ID,companyId:COMPANY_ID})
  if(request)
    res.json(201).json({message:"request canceled"}) 
})
