
var div = document.createElement("div")
div.id = "slides"
document.body.appendChild(div)




var img1 = document.createElement("img")
img1.id="img1"
img1.src = "./photos/p3.png"
document.getElementById("slides").appendChild(img1)

var img2 = document.createElement("img")
img2.id="img2"
img2.src = "./photos/p2.png"
img2.style.display='none'
document.getElementById("slides").appendChild(img2)

var img3 = document.createElement("img")
img3.id="img3"
img3.src = "./photos/p1.png"
img3.style.display='none'
document.getElementById("slides").appendChild(img3)


var pp = document.createElement("span")
pp.className = "dot"
pp.id="dot1"
pp.style.backgroundColor="DimGray"
document.getElementById("slides").appendChild(pp)

var pp = document.createElement("span")
pp.className = "dot"
pp.id="dot2"
document.getElementById("slides").appendChild(pp)

var pp = document.createElement("span")
pp.className = "dot"
pp.id="dot3"
document.getElementById("slides").appendChild(pp)

var num = 1

function Switch() {
  document.getElementById("img"+num).style.display="none"
  document.getElementById("dot"+num).style.backgroundColor = "#bbb"
  if (num===3){
    num=0
  }
  num +=1
  document.getElementById("img"+num).style.display="block"
  document.getElementById("dot"+num).style.backgroundColor = "DimGray"
  time()
}
function time(){
  setTimeout(Switch,4000)
}
time()
