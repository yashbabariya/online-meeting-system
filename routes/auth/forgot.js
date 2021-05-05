const express = require("express");
const nodemailer = require('nodemailer');
const route = express.Router();
const { notAuthorize } = require("../../functions/authFunc");
const user = require("../../schema/user");

route.get("/forgot", notAuthorize, (req, res) => {
    res.render("auth/forgot.ejs", { tabName: "Forgot-Password" });
});

// /POST method 
route.post('/forgot', notAuthorize, (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            user.findOne({ email: req.body.email }, (err, user) => {
                if (!user) {
                    req.flash('error', 'No account with that email address exits.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;  //1 hour

                user.save((err) => {
                    done(err, token, user);
                });
            });
        },

        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'Gmail',
                auth: {
                    user: 'yash.babariya01@gmail.com',
                    pass: 'yash117100'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'yash.babariya01@gmail.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.\n')
                done(err, 'done');
            });
        }
    ]), funtion(err)
    if (err) { return next(err); }
    res.redirect('/forgot');

});

module.exports = route;
