const https = require('https');
const path = require('path');
const fs = require('fs')
module.exports = function(app,firebase){
app.get('/name', function(req, res) {
  var user = firebase.auth().currentUser;

  if (user != null) {
    var namey = user.displayName;
    res.send(namey)
    // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}


});

app.get('/home', function(req, res) {


var user = firebase.auth().currentUser;

if (user) {
  res.sendfile('./public/home/indexx.html');
} else {
  // No user is signed in.
  res.redirect("/login")
}
});
}
