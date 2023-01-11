require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logEvents, logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const db = require("./config/connectDB");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

console.log(process.env.NODE_ENV);

app.use(logger);

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/api/v1/students", require("./routes/studentsRoutes"));
app.use("/api/v1/courses", require("./routes/coursesRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    // FIXME:css/style.css is not hosted in non-root routes
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server app listening on http://localhost:${PORT} ...`));
