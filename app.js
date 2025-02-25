var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dbukuRouter = require("./routes/dbuku");
var faseRouter = require("./routes/fase");
var kurikulumRouter = require("./routes/kurikulum");
var profilPelajar = require("./routes/profilpelajar");
var evaluasiRouter = require("./routes/evaluasi");
var dokkurRouter = require("./routes/dokkur");
const authMiddleware = require("./middleware/authMiddleware");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(err.status).end();
    }
  });
});

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:5173",
    ],
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dbuku", authMiddleware, dbukuRouter);
app.use("/fase", authMiddleware, faseRouter);
app.use("/kurikulum", authMiddleware, kurikulumRouter);
app.use("/profilpelajar", authMiddleware, profilPelajar);
app.use("/evaluasi", authMiddleware, evaluasiRouter);
app.use("/dokkur", authMiddleware, dokkurRouter);

module.exports = app;
