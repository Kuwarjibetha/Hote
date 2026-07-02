const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["guest", "host", "admin"],
    default: "guest",
  },
  bio: {
    type: String,
    default: "",
  },
  avatar: {
    url: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    filename: {
      type: String,
      default: "default",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Login attempt tracking
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
    default: null,
  },

  // Password reset
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiry: {
    type: Date,
    default: null,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);