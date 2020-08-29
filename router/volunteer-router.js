const https = require('https');
const path = require('path');
const fs = require('fs')
const readline = require('readline');
const {google} = require('googleapis');
function hey(){



}
all = ''


module.exports = function(app,firebase){

    app.get('/volunteer', function(req, res) {
      // If modifying these scopes, delete token.json.
      const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      const TOKEN_PATH = './gsheets-creds/token.json';

      // Load client secrets from a local file.
      fs.readFile('./gsheets-creds/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.

        authorize(JSON.parse(content), listMajors);
        var user = firebase.auth().currentUser;

        if (user) {
          var router = __dirname
          router = router.split("/router")
          router = router[0]
          res.sendFile(path.join(router, '/public/volunteer/volenteer.html'));
          console.log("sent");
        } else {
          // No user is signed in.
          res.redirect("/login")
        }


      });

      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
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
            if (err) return console.error('Error while trying to retrieve access token', err);
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

      /**
       * Prints the names and majors of students in a sample spreadsheet:
       * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
       */
      function listMajors(auth) {
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
          spreadsheetId: '1qb3nY8_7PmjFfU1a6aJfYKS9AEV9Q1VXVc8WL0Mc6EE',
          range: 'A:E',
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          var rows = res.data.values;
          if (rows.length) {
            all = `
            <tr>
              <th>
                Oppurtunity
              </th>
              <th>
                Date
              </th>
              <th>
                Type
              </th>
              <th>
                Sign Up
              </th>

              </tr>
            `
            rows = rows.slice(1,rows.length)

            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
              if (row[2] == "Long Term"){
                var type = "participating"
              } else{
                var type = "attending"
              }
              html = `<tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>Not ${type}: <button>Sign Up</button></td>
              </tr>`
              all = all + html
            });
          } else {
            console.log('No data found.');
          }
          fs.writeFile('public/sheets.txt', all, function (err) {
            if (err) throw err;
            all = ''

          });
        });

      }

    });




}
