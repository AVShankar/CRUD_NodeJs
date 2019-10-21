const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const { contact } = require("./schema");
const port = 3000;
const app = express();
const cors = require("cors");
app.use(cors());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.get("/contacts", (req, res) => {
  contact
    .find()
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.status(500).json({
        message: "error"
      });
    });
});

app.post("/newcontact", (req, res) => {
  var newContact = req.body;
  var newContent = new contact(newContact);
  newContent
    .save()
    .then(function(data) {
      res.json({
        message: "Success"
      });
    })
    .catch(function(err) {
      res.json({
        message: err
      });
    });
});

app.delete("/erase", (req, res) => {
  console.log(req.body);
  contact
    .findByIdAndDelete(req.body.id)
    .then(function(data) {
      res.json("deleted");
    })
    .catch(function(err) {
      res.send(err);
    });
});

app.put("/update", (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  // var updatedInfo = req.body;
  contact
    .findById(req.body.id)
    .then(function(data) {
      data.name = req.body.name;
      data.phone = req.body.phone;
      data.email = req.body.email;
      data.address = req.body.address;
      data.save().then(function(data) {
        res.send("updated");
      });
    })
    .catch(function(err) {
      res.send("error");
    });
});

mongoose.connect("mongodb://localhost/Phonebook", () => {
  console.log("Mongodb is now connected");
});

app.listen(port, () => {
  console.log("Application is running at", port);
});
