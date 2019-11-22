import { loginfeed } from './loginfeed.js';
function loginform () {
	let loginbutton = document.getElementById("login");
	loginbutton.addEventListener("click", () => {

        let main = document.getElementById("main");
        let outterdiv = document.createElement("div");
        outterdiv.setAttribute("id", "loginpage");
		outterdiv.classList.add("modal");
		//outterdiv.classList.add("animate");
		//outterdiv.classList.add("modal-content");		

        let innerdiv1 = document.createElement("div");
        innerdiv1.classList.add("modal-content");

		let innerdiv2 = document.createElement("div");
        innerdiv2.classList.add("modal-header");
		//innerdiv2.innerText = "ds \n";
		
		// log in heading
		let logintext = document.createElement("h4");
		logintext.classList.add("center");
		logintext.innerText = "Log in";

        let xbutton = document.createElement("span");
		xbutton.classList.add("close");
		xbutton.setAttribute("id", "closebuttonsignin");
		//xbutton.style.display = "none";
		xbutton.innerText = "x";

		// <span onclick="document.getElementById('id01').style.display='none'" 
		// class="close" title="Close Modal">&times;</span>

        let bodyDiv = document.createElement("div");
        bodyDiv.classList.add("modal-body");


        let login = document.createElement("form");
        login.setAttribute("name", "loginform");
        login.setAttribute("method", "post");	        

		let unameP = document.createElement("p");		
        let uname = document.createElement("input");
		uname.setAttribute("name", "username");
		unameP.classList.add("center");
		uname.setAttribute("type", "createTextNode");
		uname.setAttribute("id", "username");
		uname.setAttribute("placeholder", "Enter Username");
		uname.setAttribute("required", "");
		uname.setAttribute("minlength", "2");
		uname.setAttribute("maxlength", "9");
		unameP.appendChild(uname);

		let passwordP = document.createElement("p");		
		let password = document.createElement("input");
		password.setAttribute("id", "password-input");
		passwordP.classList.add("center");
		password.setAttribute("name", "password");
		password.setAttribute("type", "password");
		password.setAttribute("placeholder", "Enter password");
		password.setAttribute("required", "");
		passwordP.appendChild(password);

		let loginbuttonP = document.createElement("p");
		let loginbutton = document.createElement("input");
		loginbuttonP.classList.add("center");
		loginbutton.setAttribute("id", "loginbutton");
		loginbutton.setAttribute("type", "submit");
		loginbutton.setAttribute("value", "Log in");
		//loginbutton.setAttribute("required", "");
		loginbuttonP.appendChild(loginbutton);

		innerdiv2.appendChild(xbutton);
		innerdiv2.appendChild(logintext);
		
		//outterdiv.appendChild(login);
		login.appendChild(unameP);
		
		login.appendChild(passwordP);
		login.appendChild(loginbuttonP);

        bodyDiv.appendChild(login);
        innerdiv1.appendChild(innerdiv2);
        innerdiv1.appendChild(bodyDiv);
        outterdiv.appendChild(innerdiv1);

        main.insertBefore(outterdiv, main.firstChild);
		//main.appendChild(outterdiv);

		let modal = document.getElementById("loginpage");
		modal.style.display = "block";
		// When the user clicks on <span> (x), close the modal
		xbutton.addEventListener("click", function() {
			modal.style.display = "none";
			main.removeChild(outterdiv);
		})	
		

		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener("click", removeChild);

		let loginform = document.forms.loginform;
		loginform.addEventListener('submit', auth);

	});

}
function auth () {
	let loginform = document.forms.loginform;
	event.preventDefault();

	let username = loginform.username.value;
	let password = loginform.password.value;
	if (username === "" || password === "") {
		alert("Please put in  you username and your password");
	} 
	allLetter(username);
	//allLetter(password)

	let user = {
		"username": username,
		"password": password
	}
	let tokens = postData('http://127.0.0.1:5000/auth/login', user)
				.then(data => {
					JSON.stringify(data.token); // JSON-string from `response.json()` call
					localStorage.setItem("token", data["token"]);
					//localStorage.getItem("token")
					loginfeed(data.token);
				})
				.catch(error => alert("user authentication failed"));	

}
function removeChild () {
	let modal = document.getElementById("loginpage");	
	let main = document.getElementById("main");
	//let outterdiv = document.getElementById("";)
	if (event.target == modal) {
			modal.style.display = "none";
			main.removeChild(modal);
	}	
}
function allLetter(inputtxt) {
	var letters = /^[A-Za-z0-9]+$/;
	if(inputtxt.match(letters)){
		return true;
	} else {
		alert("invalid input \nPlease lettes only!");
		return false;
	}
} 

function handleErrors(response) {
    if (!response.ok) {
		alert(response["message"]);
        throw Error(response.statusText);
    }
    return response;
}

function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(handleErrors)
    .then(response => response.json()); // parses JSON response into native JavaScript objects
}

export { loginform, handleErrors };
