import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
