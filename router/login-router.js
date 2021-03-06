const https = require('https');
const path = require('path');
const fs = require('fs')



module.exports = function(app,firebase){

    app.get('/', function(req, res) {
      var user = firebase.auth().currentUser;

      if (user) {
      res.redirect('/home')
      } else {
        // No user is signed in.
        res.redirect('/login')
      }

    });
    app.get('/login', function(req, res) {
      var user = firebase.auth().currentUser;
      if (user) {
      res.redirect('/home')
      } else {
        // No user is signed in.
        var router = __dirname
        router = router.split("/router")
        router = router[0]
        res.sendFile(path.join(router, '/public/login/login.html'));
      }

    });

    app.get('/login:/home', function(req, res) {
      const email = req.query.email;
      const password = req.query.password;

      firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      res.send("success")
      }).catch(function(error) {
      // Handle Errors here.
      res.send(error.message)
      var errorCode = error.code;
      var errorMessage = error.message;
      error = true
      console.log(errorCode)
      console.log(errorMessage)
      // ...
      });

    });

}
