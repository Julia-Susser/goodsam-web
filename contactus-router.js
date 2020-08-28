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
      comment = nemail + comment
      require('./sendMail.js')(subject, comment);
      res.send("Thank You For Sending Us A Message! We will get back to you as soon as possible via email.")
});
}
