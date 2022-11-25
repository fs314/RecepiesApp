import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // token: { type: String },

  //   email:{
  //     type:String,
  //     required:true,
  //     unique:true,
  // },
});

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

export default UserAccount;
