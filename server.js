const express = require("express");
const nunjucks = require("nunjucks");

function getTimestamp() {
  // Calculate the loop length in milliseconds (1 hour, 37 minutes, and 35 seconds)
  const loopLength = (1 * 3600 + 37 * 60 + 35) * 1000;

  const now = new Date().getTime();

  // Get the current time since Brexit in milliseconds
  const startTime =
    now - new Date("January 31, 2020 23:00:00 GMT").getTime() / 1000;

  // Calculate the current time within the loop
  const timeInLoop = startTime % loopLength;

  // Convert time in loop to hours, minutes, and seconds
  let seconds = Math.floor((timeInLoop / 1000) % 60);
  let minutes = Math.floor((timeInLoop / (1000 * 60)) % 60);
  let hours = Math.floor((timeInLoop / (1000 * 60 * 60)) % 24);

  // Format the time in YouTube timestamp notation
  const formattedTime = `${hours.toString().padStart(2, "0")}h${minutes
    .toString()
    .padStart(2, "0")}m${seconds.toString().padStart(2, "0")}s`;

  return formattedTime;
}

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", function (req, res) {
  res.render("index.html", { timestamp: getTimestamp() });
});

app.listen(3000);

console.log("Listening on port 3000")