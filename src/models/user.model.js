import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },

  resetPasswordToken: {
  type: String
  },

  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },

  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
  }
});

const User = mongoose.model("User", userSchema);
export default User;
