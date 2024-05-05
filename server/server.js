const express = require("express");
const dbConfig = require("./config/dbConfig");

const app = express();
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute")
const theatreRoute = require("./routes/theatreRoute")
const upcomingRoute = require("./routes/upcomingRoute")
const bookingRoute = require("./routes/bookingRoute")

app.use(express.json());
app.use("/", userRoute);
app.use("/movies" , movieRoute)
app.use("/theatres" , theatreRoute)
app.use("/upcoming", upcomingRoute);
app.use("/bookings", bookingRoute);

app.listen(8082, () => {
  console.log("Server is running");
});
