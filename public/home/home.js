
var txt = document.createElement("h2")
txt.id = "name"
document.body.appendChild(txt)
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("name").innerHTML =
    `Bienvenido a Nuestro Communidad, ${this.responseText}`;
  }
};
xhttp.open("GET", "/name", true);
xhttp.send();
