const https = require('https');
const path = require('path');
const admin = require('firebase-admin');
const fs = require('fs')
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'gmail-router/token.json';

module.exports = function(app,firebase){
  app.get('/signup', function(req, res) {
    require('./sendMail.js')();
    var user = firebase.auth().currentUser;
    if (user) {
    res.redirect('/home')
    } else {
      // No user is signed in.
      res.sendFile(path.join(__dirname, '/public/login/login.html'));
    }
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
