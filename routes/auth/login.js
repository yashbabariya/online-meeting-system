const express = require("express");
const route = express.Router();
const { notAuthorize } = require("../../functions/authFunc");
const passport = require("passport");


route.get("/", notAuthorize, (req, res) => {
  res.render("auth/login.ejs", { tabName: "Login" });
});
route.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",           //User Login Success then Go to Home Page. 
    failureRedirect: "/login",      //User Login Faild then Go to Login Page.
    failureFlash: true,             //This is message of Failure attenticate.
  })
);
module.exports = route;
