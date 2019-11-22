import { loginForm, allLetter } from './login.js';
import { URL, handleErrors, postData } from './fetchFunc.js';
// Called by createProfileBut in mainPage 
function profileModal () {

    let profButton = document.getElementById("profile");
	let token = localStorage.getItem("token");
	if (token) {
        let profModalBody = document.getElementById("profModalBody");
        let profModal = document.getElementById("profModal");
		
		if (profModal) {
            // show the modal if already exist
            // shdnt be here tho bcs i delete the whole modal once its closed
			profModal.style.display = "block";
		} else {
            profModalFunc();
            
		}
	} else {
		alert("please log in to see your profile :)");
	}
}



function profModalFunc() {
    let main = document.getElementById("main");
    let profModal = document.createElement("div");
	profModal.setAttribute("id", "profModal");
    profModal.classList.add("modal");
    
    let profFirstBr = document.createElement("br");
    profModal.appendChild(profFirstBr);

	let profModalContent = document.createElement("div");
	profModalContent.classList.add("modal-content");

	let profModalHeader = document.createElement("div");
	profModalHeader.classList.add("modal-header");

	let profModalClose = document.createElement("span");
	profModalClose.classList.add("close");
	profModalClose.setAttribute("id", "profModalClose");
	profModalClose.innerText = "x";
	profModalHeader.appendChild(profModalClose);

	let profModalHeaderText = document.createElement("h3");
	profModalHeaderText.innerText = "User Profile: "
	profModalHeader.appendChild(profModalHeaderText);
	profModalContent.appendChild(profModalHeader);

	let profModalBody = document.createElement("div");
	profModalBody.classList.add("modal-body");
    profModalBody.setAttribute("id", "profModalBody");
    
	profModalContent.appendChild(profModalBody);

	let profModalFooter = document.createElement("div");
    profModalFooter.classList.add("modal-footer");
    
	let profModalFooterBut = document.createElement("button");
    profModalFooterBut.setAttribute("id", "updateProfButton");
    profModalFooterBut.setAttribute("type", "submit");
	let editProfText = document.createTextNode("Update Profile");
    profModalFooterBut.appendChild(editProfText);
    profModalFooterBut.addEventListener("click", updateProf);
    profModalFooter.appendChild(profModalFooterBut);

    /*
    let login = document.createElement("form");
        login.setAttribute("name", "loginform");
        login.setAttribute("method", "post");
    */
    let doneUpdateBut = document.createElement("button");
    doneUpdateBut.setAttribute("id", "doneUpdateButton");
    doneUpdateBut.setAttribute("type", "submit");
	let doneEditProfText = document.createTextNode("Finish Updating Profile");
    doneUpdateBut.appendChild(doneEditProfText);
    // this will trigger fetch
    doneUpdateBut.addEventListener("click", sendNewProf);
    doneUpdateBut.appendChild(doneEditProfText);
    doneUpdateBut.style.display = "none";
    profModalFooter.appendChild(doneUpdateBut);

    profModalContent.appendChild(profModalFooter);
    

	profModal.appendChild(profModalContent);

	main.appendChild(profModal);
	//document.body.profModal(votemodal);
	//document.body.insertBefore(votemodal, document.body.firstChild);

	// Get the <span> element that closes the modal
	let span = document.getElementById("profModalClose");

	// When the user clicks the button, open the modal 
	profModal.style.display = "block";
	profModal.addEventListener("click", (event) => {
		event.preventDefault();
	});

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		main.removeChild(profModal);
		//votemodal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == profModal) {
			main.removeChild(profModal);
			//votemodal.style.display = "none";
		}
    }
    makeProfContent();

}

function makeProfContent () {
	let token = localStorage.getItem("token");
	if (token){
		let url = "http://127.0.0.1:5000/user/";
		let option = {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				'Authorization':  "Token " + token
			},
		}
		getUserInfo(url, option)
		.then(r => {
            let profModalForm = document.createElement("form");
            let profModalBody = document.getElementById("profModalBody");
            let profBodyUl = document.createElement("ul");
            profBodyUl.classList.add("modal-content");
            

            let profUlFirstBr = document.createElement("br");
            profBodyUl.appendChild(profUlFirstBr);
            //profBodyUl.classList.add("animate");
            let idLi = document.createElement("li");
            idLi.classList.add("modal-li-prof");
            let idText = document.createElement("h7");
            // username, number of posts, 
            // number of upvotes across all posts.
            idText.innerText = "User ID:    " + r["id"];
            idLi.appendChild(idText);
            profBodyUl.appendChild(idLi);

            // email name password can be updated

            let usernameLi = document.createElement("li");
            usernameLi.classList.add("modal-li-prof");
            let usernameText = document.createElement("h7");
            usernameText.innerText = "Username: " + r["username"];
            usernameLi.appendChild(usernameText);
            profBodyUl.appendChild(usernameLi);


            let emailLi = document.createElement("li");
            emailLi.classList.add("modal-li-prof");
            let emailTextLab = document.createElement("h7");
            emailTextLab.innerText = "Email:    " ;
            let emailText = document.createElement("h7");
            emailText.setAttribute("id", "emailText");
            emailText.innerText = r["email"];
            emailLi.appendChild(emailTextLab);            
            emailLi.appendChild(emailText);

            let email = document.createElement("input");
            let emailP = document.createElement("p");
            email.setAttribute("id", "changeEmailInput");
            emailP.classList.add("center");
            email.setAttribute("name", "email");
            email.setAttribute("required", "");
            email.setAttribute("type", "email");
            email.setAttribute("value", emailText.innerText);
            email.appendChild(emailP);
            emailLi.appendChild(email);
            email.style.display = "none";
            profBodyUl.appendChild(emailLi);

            let nameLi = document.createElement("li");
            nameLi.classList.add("modal-li-prof");
            let nameTextLab = document.createElement("h7");
            nameTextLab.innerText = "Name:    ";
            let nameText = document.createElement("h7");
            nameText.setAttribute("id", "nameText");
            nameText.innerText = r["name"];
            nameLi.appendChild(nameTextLab);
            nameLi.appendChild(nameText);
            		
            let name = document.createElement("input");
            let nameP = document.createElement("p");
            name.setAttribute("id", "changeNameInput");
            nameP.classList.add("center");
            name.setAttribute("name", "name");
            name.setAttribute("type", "createTextNode");
            name.setAttribute("value", nameText.innerText);
            name.appendChild(nameP);
            nameLi.appendChild(name);
            name.style.display = "none";
            profBodyUl.appendChild(nameLi);

            let passLi = document.createElement("li");
            passLi.classList.add("modal-li-prof");
            passLi.setAttribute("id", "passLi");
            let passTextLab = document.createElement("h7");
            passTextLab.innerText = "New Password: ";
            passLi.appendChild(passTextLab);
            		
            let pass = document.createElement("input");
            let passP = document.createElement("p");
            pass.setAttribute("minlength", "2");
            pass.setAttribute("id", "changePassInput");
            passP.classList.add("center");
            pass.setAttribute("name", "password");
            pass.setAttribute("type", "password");
            pass.appendChild(passP);
            passLi.appendChild(pass);
            profBodyUl.appendChild(passLi);
            passLi.style.display = "none";

            let showPassLi = document.createElement("li");
            showPassLi.setAttribute("id", "showPassLi");
            showPassLi.classList.add("modal-li-prof");
            showPassLi.appendChild(document.createElement("br"));
            let showNewPass = document.createElement("input");
            showNewPass.setAttribute("type", "checkbox");
            showNewPass.addEventListener("click", showPass);
            showPassLi.appendChild(showNewPass);

            let showPassText = document.createElement("p");
            showPassText.setAttribute("id", "showPassText");
            showPassText.innerText = "Show Password";
            showPassLi.appendChild(showPassText);
            profBodyUl.appendChild(showPassLi);
            
            showPassLi.style.display = "none";
            

            let postLi = document.createElement("li");
            postLi.classList.add("modal-li-prof");
            let postText = document.createElement("h7");
            postText.innerText = "Total Post: " + r["posts"].length;
            postLi.appendChild(postText);
            profBodyUl.appendChild(postLi);

            let folLi = document.createElement("li");
            folLi.classList.add("modal-li-prof");
            let folText = document.createElement("h7");
            folText.innerText = "Following:    " + r["following"].length;
            folLi.appendChild(folText);
            profBodyUl.appendChild(folLi);

            let followedLi = document.createElement("li");
            followedLi.classList.add("modal-li-prof");
            let followedText = document.createElement("h7");
            followedText.innerText = "Followers:     " + r["followed_num"];
            followedLi.appendChild(followedText);           
            profBodyUl.appendChild(followedLi);
            profBodyUl.appendChild(document.createElement("br"));
            profModalForm.appendChild(profBodyUl);

            profModalBody.appendChild(profModalForm);

		});
	}

}

function getUserInfo (url = '', option = {}) {
	return fetch(url, option)
	.then(handleErrors)
	.then(response => response.json())
	.then(r => {
		console.log("getting user info");
		return r;
	})	
	.catch(error => console.log("cannot fetch info about the post"));
}

function showPass () {
    event.stopPropagation();
    var x = document.getElementById("changePassInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }    
}

function updateProf () {
    event.stopPropagation();
	// show
	let email = document.getElementById("changeEmailInput");
	email.style.display = "";
	let name = document.getElementById("changeNameInput");
	name.style.display = "";
	let passLi = document.getElementById("passLi");
	passLi.style.display = "";
	let showPassLi = document.getElementById("showPassLi");
	showPassLi.style.display = "";
	let doneUpdateBut = document.getElementById("doneUpdateButton");
	doneUpdateBut.style.display = "";

	// unshow
	let emailText = document.getElementById("emailText");
	emailText.style.display = "none";
	let nameText = document.getElementById("nameText");
	nameText.style.display = "none";
	let profModalFooterBut = document.getElementById("updateProfButton");
	profModalFooterBut.style.display = "none";
	
}

function sendNewProf () {
    event.stopPropagation();
	let email = document.getElementById("changeEmailInput").value;
	let name = document.getElementById("changeNameInput").value;
	let pass = document.getElementById("changePassInput").value;
	let token = localStorage.getItem("token");
	let payload = {
		"email": email,
		"name": name,
		"password": pass
	}
	let option = {
		method: 'PUT', // *GET, POST, PUT, DELETE, etc.
		headers: {
			'Content-Type': 'application/json',
			'Authorization':  "Token " + token
		},
		body: JSON.stringify(payload), // body data type must match "Content-Type" header
	}
    if (!email.match(/[a-zA-Z]+@[a-zA-Z]+\..*[^.]$/)) {
        alert("please enter email format properly");
    } else if (pass === "") {
        alert("Enter a password");
    
    } else if (allLetter(name)) {
        fetch(URL + "user/", option)
        .then(r => {
            let main = document.getElementById("main");
            main.removeChild(profModal);
            profileModal();
            return r;
        })
    } 
}
export { profileModal }

