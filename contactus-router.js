const https = require('https');
const path = require('path');
var fs = require('fs');
module.exports = function(app, firebase){





var all = ''
app.get('/contactus', function(req, res){

    res.sendFile(path.join(__dirname, '/public/contactus/contactus.html'));

  });
var nemail = ''
var comment =''
app.post('/contactus-sub', function(req, res) {
      nemail = req.body.new_email;
      comment = req.body.comments;
      subject = req.body.subject;
      if (nemail === ''){
        var user = firebase.auth().currentUser;
        nemail = user.email;
      }
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'juliasusser@gmail.com',
          pass: 'nathansucks3'
        }
      });

      var mailOptions = {
        from: 'juliasusser@gmail.com',
        to: 'juliasusser@gmail.com',
        subject: subject,
        text: nemail + "\n" + comment
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send("Thank You For Sending Us A Message! We will get back to you as soon as possible via email.")
});
}
