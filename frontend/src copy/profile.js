import { loginform, handleErrors } from './login.js';
function profileModal () {
    console.log(event);
    event.stopPropagation();
    let profButton = document.getElementById("profile");
	let token = localStorage.getItem("token");
	if (token) {
        let profModalBody = document.getElementById("profModalBody");
        let profModal = document.getElementById("profModal");
		
		if (profModal) {
            // show the modal if already exist
			profModal.style.display = "block";
		} else {
            profModalFunc();
            
		}
	} else {
		alert("please log in to see your profile :)");
	}
}
function makePostModal(event) {

}



function profModalFunc() {
    let main = document.getElementById("main");
	let profModal = document.createElement("div");
	profModal.setAttribute("id", "profModal");
	profModal.classList.add("modal");

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
	let profModalFooterText = document.createElement("h4");
	profModalFooterText.setAttribute("id", "profModalFooterText");
	//voteModalHeaderText.innerText = "sometext";
	profModalFooter.appendChild(profModalFooterText);
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
            let profModalBody = document.getElementById("profModalBody");
            let profBodyUl = document.createElement("ul");
            profBodyUl.classList.add("modal-content");
            //profBodyUl.classList.add("animate");
            let idLi = document.createElement("li");
            let idText = document.createElement("h7");
            // username, number of posts, 
            // number of upvotes across all posts.
            idText.innerText = "User ID: " + r["id"];
            idLi.appendChild(idText);
            profBodyUl.appendChild(idLi);

            let usernameLi = document.createElement("li");
            let usernameText = document.createElement("h7");
            usernameText.innerText = "Username: " + r["username"];
            usernameLi.appendChild(usernameText);
            profBodyUl.appendChild(usernameLi);

            let emailLi = document.createElement("li");
            let emailText = document.createElement("h7");
            emailText.innerText = "Email: " + r["email"];
            emailLi.appendChild(emailText);
            profBodyUl.appendChild(emailLi);

            let nameLi = document.createElement("li");
            let nameText = document.createElement("h7");
            nameText.innerText = "Name: " + r["name"];
            nameLi.appendChild(nameText);
            profBodyUl.appendChild(nameLi);

            let postLi = document.createElement("li");
            let postText = document.createElement("h7");
            postText.innerText = "Total Post: " + r["posts"].length;
            postLi.appendChild(postText);
            profBodyUl.appendChild(postLi);

            let folLi = document.createElement("li");
            let folText = document.createElement("h7");
            folText.innerText = "Following: " + r["following"].length;
            folLi.appendChild(folText);
            profBodyUl.appendChild(folLi);

            let followedLi = document.createElement("li");
            let followedText = document.createElement("h7");
            followedText.innerText = "Followers : " + r["followed_num"];
            followedLi.appendChild(followedText);
            profBodyUl.appendChild(followedLi);

            profModalBody.appendChild(profBodyUl);

		});
	}

}
/*
function updateProf() {
    let profButtonP = document.createElement("h4");
    let profButton = document.createElement("input");
    profButtonP.classList.add("center");
    profButton.setAttribute("type", "submit");
    profButton.setAttribute("value", "Update Profile!");
    //loginbutton.setAttribute("required", "");
    profButton.style.width = "25%";
    profButton.style.height = "35px";
    profButtonP.appendChild(profButton);
    profButtonP.addEventListener("click", () => {
        let token = localStorage.getItem("token");
	    if (token) {
            
            let data = {
                "title": titleInput.value,
                "text": textHolder.value,
                "subseddit": subseditInput.value,
                "image": imgHolder.value
            }
            console.log(data);
            // to get image from proffeed you did:
            // imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
        
            if (titleInput.value == "") {
                alert("pleaser enter title!");
            } else if (textHolder.value == "") {
                alert("pleaser enter text!");
            } else {
                postData("http://127.0.0.1:5000/post/", data)
                .catch(error => console.log("prof fail"))
                .then (data => {
                    let postModal = document.getElementById("profmodal");
                    let main = document.getElementById("main");
                    main.removeChild(profModal);
                    alert("prof successfully made!");
                    return data;
                })
                .catch(error => console.log("fail to remove modal"));
                
            }
        }
    })
    profBodyForm.appendChild(profButtonP);

    profModalBody.appendChild(profBodyForm);
}
*/
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
export { profileModal }


/*

function makeprofContent () {


    let profModalBody = document.getElementById("profModalBody");
    let profBodyForm = document.createElement("form");
    profBodyForm.classList.add("modal-content");
    profBodyForm.classList.add("animate");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("prof-make");
    
    let titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    let b = document.createElement("b");
    b.innerText = "Title";
    titleLabel.appendChild(b);
    titleDiv.appendChild(titleLabel);

    let titleLabelBr = document.createElement("br");
    titleDiv.appendChild(titleLabelBr);

    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.style.width = "75%";
    titleInput.style.height = "45px";
    titleInput.setAttribute("placeholder", "Enter your prof title here");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");
    titleInput.style.font = "400 25px system-ui";
    titleDiv.appendChild(titleInput);

    profBodyForm.appendChild(titleDiv);
    let titleBr = document.createElement("br");
    profBodyForm.appendChild(titleBr);

    let textDiv = document.createElement("div");
    let textLabel = document.createElement("label");
    textLabel.setAttribute("for", "text");
    let bold = document.createElement("b");
    bold.innerText = "Text";
    textLabel.appendChild(bold);
    textDiv.appendChild(textLabel);
    textDiv.classList.add("prof-make");

    let textLabelBr = document.createElement("br");
    textDiv.appendChild(textLabelBr);

    let textHolder = document.createElement("textarea");
    //textHolder.classList.add("prof-make");
    textHolder.setAttribute("rows", "30");
    textHolder.setAttribute("cols", "90");
    //textDiv.classList.add("center");
    //textInput.appendChild(textHolder);
    textHolder.setAttribute("name", "text");
    textHolder.setAttribute("required", "");
    
    textDiv.appendChild(textHolder);
    

    profBodyForm.appendChild(textDiv);
    let textBr = document.createElement("br");
    profBodyForm.appendChild(textBr);

    let subseditDiv = document.createElement("div");
    let subseditLabel = document.createElement("label");
    //subseditLabel.classList.add("prof-make");
    subseditLabel.setAttribute("for", "subseddit");
    let subb = document.createElement("b");
    subb.innerText = "Subseddit";
    subseditLabel.appendChild(subb);
    subseditDiv.appendChild(subseditLabel);
    subseditDiv.classList.add("prof-make");

    let subLabelBr = document.createElement("br");
    subseditDiv.appendChild(subLabelBr);

    let subseditInput = document.createElement("input");
    subseditInput.setAttribute("type", "text");
    subseditInput.setAttribute("placeholder", "Enter your prof subseddit here");
    subseditInput.setAttribute("name", "subseddit");
    subseditInput.style.width = "75%";
    subseditInput.style.height = "45px";
    subseditInput.setAttribute("value", "");
    subseditDiv.appendChild(subseditInput);

    profBodyForm.appendChild(subseditDiv);
    let subBr = document.createElement("br");
    profBodyForm.appendChild(subBr);
    
    let imgDiv = document.createElement("div");
    let imgLabel = document.createElement("label");
    imgLabel.setAttribute("for", "profImage");
    let imgbold = document.createElement("b");
    imgbold.innerText = "Image";
    imgLabel.appendChild(imgbold);
    imgDiv.appendChild(imgLabel);
    imgDiv.classList.add("prof-make");

    let imgLabelBr = document.createElement("br");
    imgDiv.appendChild(imgLabelBr);

    let imgHolder = document.createElement("textarea");
    imgHolder.setAttribute("rows", "30");
    imgHolder.setAttribute("cols", "90");
    imgHolder.setAttribute("name", "profImage");
    //textDiv.classList.add("center");
    //textInput.appendChild(textHolder);
    imgDiv.appendChild(imgHolder);
    

    profBodyForm.appendChild(imgDiv);
    let imgBr = document.createElement("br");
    profBodyForm.appendChild(imgBr);

    let profButtonP = document.createElement("h4");
    let profButton = document.createElement("input");
    profButtonP.classList.add("center");
    profButton.setAttribute("type", "submit");
    profButton.setAttribute("value", "Update Profile!");
    //loginbutton.setAttribute("required", "");
    profButton.style.width = "25%";
    profButton.style.height = "35px";
    profButtonP.appendChild(profButton);
    profButtonP.addEventListener("click", () => {
        let token = localStorage.getItem("token");
	    if (token) {
            
            let data = {
                "title": titleInput.value,
                "text": textHolder.value,
                "subseddit": subseditInput.value,
                "image": imgHolder.value
            }
            console.log(data);
            // to get image from proffeed you did:
            // imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
        
            if (titleInput.value == "") {
                alert("pleaser enter title!");
            } else if (textHolder.value == "") {
                alert("pleaser enter text!");
            } else {
                postData("http://127.0.0.1:5000/post/", data)
                .catch(error => console.log("prof fail"))
                .then (data => {
                    let postModal = document.getElementById("profmodal");
                    let main = document.getElementById("main");
                    main.removeChild(profModal);
                    alert("prof successfully made!");
                    return data;
                })
                .catch(error => console.log("fail to remove modal"));
                
            }
        }
    })
    profBodyForm.appendChild(profButtonP);

    profModalBody.appendChild(profBodyForm);

}
*/