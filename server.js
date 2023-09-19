const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { corsOptions } = require("./utils/corsConfig");

const PORT = process.env.PORT || 8000;

// built-in middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// custom middleware logger
app.use(logger);

// 3rd party middlewares
app.use(cors(corsOptions)); // Cross Origin Resource Sharing

// home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// redirect
app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page");
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
