import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
  },
});

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

export default UserAccount;
