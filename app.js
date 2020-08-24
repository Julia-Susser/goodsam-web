const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const admin = require('firebase-admin');
var firebase = require('firebase');
const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');
const https = require('https');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const url = require('url');

const {google} = require('googleapis');

















admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var firebaseConfig = {
  apiKey: "AIzaSyAlvFdS-rDVRZmo6GU9me7ez8-GPgqG4qY",
  authDomain: "goodsam-web.firebaseapp.com",
  databaseURL: "https://goodsam-web.firebaseio.com",
  projectId: "goodsam-web",
  storageBucket: "goodsam-web.appspot.com",
  messagingSenderId: "779659380354",
  appId: "1:779659380354:web:fd5488d7ec00196c40d69b",
  measurementId: "G-XELR89ZT1C"
};

firebase.initializeApp(firebaseConfig);

app.use(express.static(path.join(__dirname, '/public')));
app.listen(port, () => console.log(`listening on port ${port}!`));



require('./home-router.js')(app,firebase);
require('./contactus-router.js')(app,firebase);
require('./insta-router.js')(app,firebase);
require('./signup-router.js')(app,firebase);
require('./login-router.js')(app,firebase);
