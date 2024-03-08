const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
});

// Add timestamps option //this will add createdAt, updatedAt in the mongodb database.
userSchema.set("timestamps", true);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
