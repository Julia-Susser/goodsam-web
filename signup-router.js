const https = require('https');
const path = require('path');
const admin = require('firebase-admin');
const fs = require('fs')

module.exports = function(app,firebase){
  app.get('/signup', function(req, res) {
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
