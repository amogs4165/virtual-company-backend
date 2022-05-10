import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  type: String,
  required: false,
});

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: false,
      ref: "User",
    },
    name: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const portfolioSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const hiringSchema = mongoose.Schema({
  requirements: {
    type: String,
    required: false,
  },
  pdf: {
    type: String,
    required: false,
  },
});

const requestSchema = mongoose.Schema({
  type: String,
  required: false,
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "This name already taken please enter another name"],
  },
  founder: {
    type: String,
    required: true,
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
  images: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  startingAt: {
    type: Number,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  hiring: {
    type: Boolean,
    required: true,
    default: false,
  },
  employees: [employeeSchema],
  portfolio: [portfolioSchema],
  hiringDetails: [hiringSchema],
  joinRequest: [requestSchema],
  review: [reviewSchema],
});

const Company = mongoose.model("company", companySchema);
export default Company;
