const mongoose = require("mongoose");

const event = new mongoose.Schema({
  id: { type: Number, required: true },
  isIndividual: { type: Boolean, required: true }, //true for individual event
  team: { type: mongoose.Schema.ObjectId, required: false },
});

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
  event: { type: [event], required: false },
});

// Add timestamps option //this will add createdAt, updatedAt in the mongodb database.
userSchema.set("timestamps", true);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
