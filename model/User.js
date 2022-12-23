import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  dob: {
    type: Date,
  },
  age: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  education: {
    type: String,
  },
  occupation: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
