const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["workout"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

app.post("/submit", (req, res) => {
    console.log(req.body);

    db.workout.insert(req.body, (error, data) => {
    if (error) {
        res.send(error);
    } else {
        res.send(data);
    }
    });
});

app.post("/submit", (req, res) => {
    console.log(req.body);
  
    db.workout.insert(req.body, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    });
  });

app.get("/all", (req, res) => {
db.workout.find({}, (error, data) => {
    if (error) {
    res.send(error);
    } else {
    res.json(data);
    }
});
});

app.listen(3000, () => {
console.log("App running on port 3000");
});