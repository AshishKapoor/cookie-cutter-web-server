const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// Route Handlers
app.get(
  "/hello",
  (req, res, next) => {
    console.log("attempted to log /hello");
    next();
  },
  (req, res) => {
    res.send("hello");
  }
);

function one(req, res, next) {
  console.log("one !");
  next();
}
function two(req, res, next) {
  console.log("two !");
  next();
}
function three(req, res, next) {
  console.log("three !");
  res.send("DONE!");
}

// middleware
app.get("/chain", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
