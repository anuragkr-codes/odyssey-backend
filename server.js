const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//database connection
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error conntecting to database. Error = ", err);
  });

const app = express();
const port = 3000;

//middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//ROUTING
const authRoute = require("./routes/authRoutes");
const registerRoute = require("./routes/registerRoutes");
const profileRoute = require("./routes/profileRoute");
const joinTeamRoute = require("./routes/joinTeamRoute");

app.use("/auth", authRoute);
app.use("/register", registerRoute);
app.use("/profile", profileRoute); //used to login user directly with the help of cookie/token in case of a page refresh
app.use("/joinTeam", joinTeamRoute);

//Listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
