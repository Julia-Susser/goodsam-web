function load() {

var email = document.getElementById("email").value
var password = document.getElementById("password").value


var xhttp = new XMLHttpRequest();
console.log("hey")
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(url)
    document.getElementById("error").innerHTML = "hety"
    if (this.responseText === "success"){
      window.location = "/home"
    }else if (this.responseText.includes("password")){
      document.getElementById("error").innerHTML = this.responseText
      document.getElementById("password").style.border = "3px solid #FF0000"
      document.getElementById("email").style.border = "1px solid black"
    }else{
      document.getElementById("error").innerHTML = this.responseText
      document.getElementById("email").style.border = "3px solid #FF0000"
      document.getElementById("password").style.border = "1px solid black"

    }


  }
};
const url = "/login:/home?email="+email+"&password="+password

xhttp.open("GET", url, true);
xhttp.send();
 }
