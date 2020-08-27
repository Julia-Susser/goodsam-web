const https = require('https');
const path = require('path');
var fs = require('fs');
module.exports = function(app){





var all = ''
app.get('/instagram', function(req, res){
  fs = require('fs');


  var media_url = ''
  var cap = ''
  var html = ''
  https.get('https://graph.instagram.com/17841403749861133/media?fields=media_url,caption&access_token=IGQVJWTnhGR0RsVVJJMDFJWlpTX0p6WDI1XzZAueXNreU1FcU1YdXRPV2pSd1B4eFZAibmxHVHBJQ2hxZAjBITUl1SmU5QjZAZAZAmY0UU8yWTBUSVYyUHFDZA1A0ZAWR4VGptOFVhNlpncHd3', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      data = JSON.parse(data).data
      for (index = 0; index < data.length; index++) {
        media_url = data[index].media_url
        cap = data[index].caption
        html = `<div id="p" style= "background-image: url('${media_url}');">
          <div id="cap">
            <p id="1">${cap}</p>
          </div>
        </div>`
        all = all + html
      }
      fs.writeFile('public/ajax_info.txt', all, function (err) {
        if (err) throw err;
        all = ''
        console.log('Saved!');

      });

    })
    
    res.sendFile(path.join(__dirname, '/public/instagram/instagram.html'));
  })

  });


}
