const express = require("express");
const route = express.Router();
const { authorize } = require("../functions/authFunc");

// User will be login then we can go this page... 
route.get("/", authorize, (req, res) => {
  res.render("index.ejs", { tabName: "Online Meeting System", user: req.user });
});

module.exports = route;
