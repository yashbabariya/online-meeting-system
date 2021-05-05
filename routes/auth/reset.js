const express = require("express");
const nodemailer = require('nodemailer');
const route = express.Router();
const { notAuthorize } = require("../../functions/authFunc");
const user = require("../../schema/user");


route.get("/reset/:token", notAuthorize, function (req, res) {
    res.render("auth/reset.ejs", { tabName: "Reset-Password" });
    user.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/reset');
        }
        res.render('reset', {
            user: req.user
        });
    });
});


route.post('/reset/:token', notAuthorize, function (req, res) {
    async.waterfall([
        function (done) {
            user.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err) {
                    req.logIn(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
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
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/reset');
    });
});


module.exports = route;