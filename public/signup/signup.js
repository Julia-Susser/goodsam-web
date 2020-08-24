function load() {

var email = document.getElementById("email").value
var first_name = document.getElementById("first-name").value
var last_name = document.getElementById("last-name").value
var password = document.getElementById("password").value


var xhttp = new XMLHttpRequest();
console.log("hey")
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(url)
    document.getElementById("error").innerHTML = "hety"
    if (this.responseText === "success"){
      window.location = "/home"
    }else if (this.responseText.includes("email")){
      document.getElementById("error").innerHTML = this.responseText
      document.getElementById("email").style.border = "3px solid #FF0000"
      document.getElementById("password").style.border = "1px solid black"
    }else{
      document.getElementById("error").innerHTML = this.responseText
      document.getElementById("password").style.border = "3px solid #FF0000"
      document.getElementById("email").style.border = "1px solid black"
    }


  }
};
const url = "/signup:/home?email="+email+"&first_name="+first_name+"&last_name="+last_name+"&password="+password

xhttp.open("GET", url, true);
xhttp.send();
 }
