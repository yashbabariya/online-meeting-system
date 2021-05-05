const express = require("express");
const route = express.Router();
const { authorize } = require("../functions/authFunc");
const { v4: uuidV4 } = require("uuid");
// User will be login then we can genarate new meeting..
route.get("/", authorize, (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

module.exports = route;
