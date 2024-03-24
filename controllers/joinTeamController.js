const Team = require("../models/teamModel");
const joinTeam = async function (req, res) {
  try {
    const { eventId, teamId } = req.body;
    const user = req.user; //this is set by authentication middleware

    const teamExists = await Team.findOne({ eventId, teamId });
    if (teamExists) {
      //update the team with new member
      teamExists.members.push(user._id);
      await teamExists.save();
      //update the user with joined team
      const newEvent = {
        id: eventId,
        isIndividual: false,
        teamId: teamId,
        teamIsLeader: false,
      };
      user.event.push(newEvent);
      await user.save();

      res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ error: "No team found with give Team ID for this Event" });
    }
  } catch (ex) {
    console.error(ex);
    return res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later" });
  }
};

module.exports = joinTeam;
