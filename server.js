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

app.use("/auth", authRoute);

//Listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
