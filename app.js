var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dbukuRouter = require("./routes/dbuku");
var faseRouter = require("./routes/fase");
var kurikulumRouter = require("./routes/kurikulum");
var profilPelajar = require("./routes/profilpelajar");
var evaluasiRouter = require("./routes/evaluasi");
var dokkurRouter = require("./routes/dokkur");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
app.use("/dbuku", dbukuRouter);
app.use("/fase", faseRouter);
app.use("/kurikulum", kurikulumRouter);
app.use("/profilpelajar", profilPelajar);
app.use("/evaluasi", evaluasiRouter);
app.use("/dokkur", dokkurRouter);

module.exports = app;
