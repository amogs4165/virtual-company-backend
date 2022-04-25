import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isMobileVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  wallet: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: false,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isFounder: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEmployee: {
    type: Boolean,
    required: true,
    default: false,
  },
  companyId: {
    type: String,
    required: true,
    default: 0,
  },
  skills: {
    type: Array,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  },
});

// userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", userSchema);

export default User;
