const https = require('https');
const path = require('path');

module.exports = function(app,firebase){
    app.get('/', function(req, res) {
    res.redirect("/login")
    });


    app.get('/login', function(req, res) {
          res.sendFile(path.join(__dirname, '/public/login/login.html'));
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
