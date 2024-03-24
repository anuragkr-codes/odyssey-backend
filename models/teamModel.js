const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  eventId: {
    type: Number,
    ref: "Event",
    required: true,
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    required: false,
  },
  // You can add other properties as needed
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
