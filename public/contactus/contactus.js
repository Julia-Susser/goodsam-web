var n_email = document.getElementById("n-email")


function load(){
	console.log("hey")
	n_email.style.display = "block"
}
document.getElementById("subjecty").onkeypress = function(){

	if(this.value.length > 40){
        return false;
    }
		k = 40-this.value.length

		document.getElementById("remainingC").innerHTML =  k + " characters left"


}

document.getElementById("commenty").onkeypress = function(){

	if(this.value.length > 700){
        return false;
    }
		k = 700-this.value.length

		document.getElementById("remainingD").innerHTML =  k + " characters left"


}
