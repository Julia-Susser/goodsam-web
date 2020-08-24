const https = require('https');
const path = require('path');
const admin = require('firebase-admin');

module.exports = function(app,firebase){
  app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname, '/public/signup/signup.html'));
  });



  app.get('/signup:/home', function(req, res) {
      const fname = req.query.first_name;
      const lname = req.query.last_name;

      const email = req.query.email;
      const password = req.query.password;
      var name = fname+" " + lname
      console.log(name)
  admin.auth().createUser({
    email: email,
    password: password,
    displayName: name,
  })
    .then(function(userRecord) {
      console.log('Successfully created new user:', userRecord.uid);
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
        res.send("success")
      })
    })
    .catch(function(error) {
      res.send(error.message)
      console.log('Error creating new user:', error);
    });

  });



}
