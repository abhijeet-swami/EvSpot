import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: string,
      required: true,
    },
    favoriteStations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Station",
      },
    ],
    visitedStations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Station",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.verifyPassword(async function (password) {
  return await bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
