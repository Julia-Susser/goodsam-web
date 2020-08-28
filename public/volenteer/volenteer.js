table = document.getElementById("table")
var xhttp = new XMLHttpRequest();
function geet() {

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("table").innerHTML =
    this.responseText;
  }
};
xhttp.open("GET", "../sheets.txt", true);
xhttp.send()
}
geet()
setTimeout(function (){geet()}, 1000)
