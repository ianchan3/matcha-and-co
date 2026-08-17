import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: {type: String, unique: true, sparse: true},
    displayName: {type: String, required: true},
    email: {type: String, required: true},
    photo: {type: String},
    role: {type: String, enum: ["customer", "admin"], default: "customer"},
    passwordHash: {type: String, select: false},
  },
  {timestamps: true}
)

export default mongoose.model("User", UserSchema);