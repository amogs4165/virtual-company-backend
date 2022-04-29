import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:[true,"This name already taken please enter another name"]
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model("company",companySchema);
export default Company;
