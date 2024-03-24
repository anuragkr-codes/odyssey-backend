const Team = require("../models/teamModel");
const register = async function (req, res) {
  try {
    const { eventId, isIndividual, teamName } = req.body;
    const user = req.user; //this is set by authentication middleware

    const alreadyRegistered =
      user.event && user.event.find((event) => event.id === eventId);

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ error: "Already registered for this event" });
    }

    if (isIndividual) {
      //if registering for an individual event
      const newEvent = {
        id: eventId,
        isIndividual: true,
      };
      user.event.push(newEvent);

      await user.save();
      return res.status(200).json(user);
    } else {
      //Create a team and save it
      const teamExists = await Team.findOne({ name: teamName });
      if (teamExists) {
        return res
          .status(400)
          .json({ error: "Team with the same name already exists" });
      }

      const team = new Team({
        name: teamName,
        eventId: eventId,
        leader: user._id,
      });
      await team.save();

      const newEvent = {
        id: eventId,
        isIndividual: false,
        team: team._id,
      };
      user.event.push(newEvent);
      await user.save();
      return res.status(200).json({ message: "Team created successfully" });
    }
  } catch (ex) {
    console.error(ex);
    return res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later" });
  }
};

module.exports = register;
