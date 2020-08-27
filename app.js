const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 2000;
const admin = require('firebase-admin');
var firebase = require('firebase');
const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');
const https = require('https');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const url = require('url');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'gmail-router/token.json';

// Load client secrets from a local file.
fs.readFile('gmail-router/credentials.json', (err, content) => {
    if(err){
        return console.log('Error loading client secret file:', err);
    }

    // Authorize the client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), getAuth);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if(err){
            return getNewToken(oAuth2Client, callback);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
}

function getAuth(auth){
  var Mail = require('./createMail.js');
    var obj = new Mail(auth, "juliasusser@gmail.com", 'Subject', 'Body', 'mail');

    //'mail' is the task, if not passed it will save the message as draft.
    //attachmentSrc array is optional.
    obj.makeBody();
    //This will send the mail to the recipent.
}







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
