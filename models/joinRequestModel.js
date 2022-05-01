import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Request = mongoose.model("requests", requestSchema);

export default Request;
