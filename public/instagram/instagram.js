

insta = document.getElementById("insta")
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("insta").innerHTML =
    this.responseText;
  }
};
xhttp.open("GET", "/instagram.txt", true);
xhttp.send()
