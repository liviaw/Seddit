import { postPublicFeed, post, loadFeed } from './postFeed.js';
import { loginFeed } from './loginFeed.js';
import { showPostModal, postModalFunc , makePostContent} from './makePost.js';
import { URL, handleErrors, postData, myFeedModal } from './fetchFunc.js'
import { loginForm } from './login.js';
import { signupForm } from './signupForm.js';
import { loadPage, signout, showLogIn } from './initLoadPage.js';
import { loadPostModal } from './loadPostModal.js'
import { profileModal } from './profile.js'


function initPage () {
	let header = document.createElement("header");
	header.classList.add("banner");
	// set the id (which is an attribute) of header
	header.setAttribute("id", "nav");
	console.log("ehy");
	// set up logo
	let logo = document.createElement("h1");
	logo.setAttribute("id", "logo");
	logo.classList.add("flex-center");
	let seddit = document.createTextNode("Seddit");
	logo.appendChild(seddit);

	header.appendChild(logo);

	let headerUl = document.createElement("ul");
	headerUl.classList.add("nav");
	headerUl.setAttribute("id", "rightCorner")

	let searchLi = document.createElement("li");
	searchLi.classList.add("nav-item");

	let search = document.createElement("input");
	search.setAttribute("data-id-search", "");
	search.setAttribute("id", "search");
	search.setAttribute("placeholder", "Search Seddit");
	search.setAttribute("type", "search");

	searchLi.appendChild(search);
	headerUl.appendChild(searchLi);

	header.appendChild(headerUl);

	// have profile and log out button too but need to be created
	// after topRight is set on the document
	

	// set up main tag
	let main = document.createElement("main");
	main.setAttribute("role", "main");
	main.setAttribute("id", "main");

	// ul
	let mainul = document.createElement("ul");
	mainul.setAttribute("id", "feed");
	let dataIdFeed = document.createAttribute("data-id-feed");
	mainul.setAttributeNode(dataIdFeed);

	// div: where Popular posts and post button is
	let maindiv = document.createElement("div");
	maindiv.classList.add("feed-header");
	maindiv.setAttribute("id", "postfeedmain");

	// heading popular posts
	let mainDivH3 = document.createElement("h3");
	mainDivH3.classList.add("feed-title");
	mainDivH3.classList.add("alt-text");
	mainDivH3.setAttribute("id", "mainDivH3");
	mainDivH3.innerText = "Popular posts";

	// Create button for posting a new post
	let postbutton = document.createElement("button");
	postbutton.classList.add("button");
	postbutton.classList.add("button-secondary");
	postbutton.setAttribute("id", "mainPostButton");
	postbutton.innerText = "Post";

	maindiv.appendChild(mainDivH3);
	maindiv.appendChild(postbutton);
	console.log("here in main!");
	// material-icon class
	// type i 
	

	let feeddiv = document.createElement("div");
	feeddiv.setAttribute("id", "feeddiv");
	mainul.setAttributeNode(dataIdFeed);
	mainul.appendChild(feeddiv);
	mainul.appendChild(maindiv);
	

	main.appendChild(mainul);

	

	let footer = document.createElement("footer");
	let footerText = document.createElement("p");
	footerText.innerText = "This is the Seddit footer";
	footer.appendChild(footerText);
	

	let root = document.getElementById("root");
	if (!root) {
		root = document.createElement("div");
		root.setAttribute("id", "logo");

	}
	root.appendChild(header);
	root.appendChild(main);
	root.appendChild(footer);
	let body = document.querySelector('body');
	body.insertBefore(root, body.firstChild);

	updatePost ();
	// create loginBut
	loginBut ();
	// create profile button
	createProfileBut();
	signupBut ();
	
	//create log out button
	signOutBut (); 

	//pre made modal for posting
	// postModalFunc();
	// create onclick event listener for loadPostModal button
	// and its behaviour (making modal)
	showPostModal() 


	console.log("just checking??");

}

function updatePost () {
	let headerUl = document.getElementById("rightCorner");
	
	let myFeed = document.createElement("button");
	myFeed.setAttribute("type", "submit");
	myFeed.innerText = "myFeed";
	myFeed.style.width = "14%";
	myFeed.style.height = "35px";
	myFeed.addEventListener("click", () => {
		//myFeedModal();
		let posts = [];
		let token = localStorage.getItem("token");
		if (token) {
			let option = {
				method: 'GET', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json',
					'Authorization':  "Token " + token
				},
			}   
			postData(URL + "user/", option)
			.then (data => {
				
				for (let i = 0; i < data["posts"].length; i++) {
					postData(URL + "post/?id=" + data["posts"][i], option)
					.then ((r) => {
						posts.push(r);
					})
				}
				console.log(posts);
				loadFeed(posts);
			})
		}
		
	})
	headerUl.appendChild(myFeed);

	// let token = localStorage.getItem("token");
	// let option = {
	// 	method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Authorization':  "Token " + token
	// 	},
	// }   
	// postData(URL + "post/?id=" + postId, option)
}

function signupBut () {
	let headerUl = document.getElementById("rightCorner");
	// li for signup button
	let signupLi = document.createElement("li");
	signupLi.classList.add("nav-item");
	// sign up button
	let signupBut = document.createElement("button");
	let dataIdSign = document.createAttribute("data-id-signup");
	signupBut.setAttributeNode(dataIdSign);
	signupBut.setAttribute("id", "signup");
	signupBut.classList.add("button");
	signupBut.classList.add("button-secondary");
	signupBut.classList.add("display");
	let signuptext = document.createTextNode("Sign Up");
	signupBut.appendChild(signuptext);
	signupLi.appendChild(signupBut);
	headerUl.appendChild(signupLi);
	//create sign up (register) MODAL
	signupForm();
	
}
function loginBut () {
	let headerUl = document.getElementById("rightCorner");
	let loginLi = document.createElement("li");
	loginLi.classList.add("nav-item");

	//login button
	let loginbutton = document.createElement("button");
	loginbutton.setAttribute("data-id-login", "");
	loginbutton.setAttribute("id", "login");
	loginbutton.classList.add("button");
	loginbutton.classList.add("button-primary");
	loginbutton.classList.add("display");
	let logintext = document.createTextNode("Log In");
	loginbutton.appendChild(logintext);
	
	loginLi.appendChild(loginbutton);
	headerUl.appendChild(loginLi);
	// need to do it after its appended in the document
	// add event listener for login button
	loginForm();
}

function createProfileBut () {
	let prof = document.createElement("li");
	prof.classList.add("nav-item");
	let profBut = document.createElement("button");
	profBut.setAttribute("id", "profile");
	profBut.classList.add("button");
	profBut.classList.add("button-primary");
	profBut.classList.add("display");
	profBut.classList.add("warning");
	profBut.classList.add("btn");
	profBut.innerText = "View Profile";
	profBut.style.display = "";
	prof.appendChild(profBut);
	let topRight = document.getElementById("rightCorner");
	topRight.appendChild(prof);
	profBut.addEventListener("click", () => {
		// show modal
		profileModal();
	});
}

function signOutBut () {
	let topRight = document.getElementById("rightCorner");
	let signOut = document.createElement("li");
	signOut.classList.add("nav-item");

	let signOutButton = document.createElement("button");
	signOutButton.setAttribute("id", "signout");
	signOutButton.classList.add("button");
	signOutButton.classList.add("button-primary");
	signOutButton.classList.add("display");
	signOutButton.innerText = "Log Out";
	signOutButton.style.display = "none";
	
	signOut.appendChild(signOutButton);
	topRight.appendChild(signOut);
	signOutButton.addEventListener("click", () => {
		signout();
	})	
}

function comment (feedArray) {
	let token = localStorage.getItem("token");
	//let makeCommentDiv = document.getElementById("makeCommentDiv" + idd);
	let commentBoxes = document.getElementsByClassName("comment-section");
	//let commentForms = document.getElementsByClassName("comment-form");
	if (token) {		
		for (let i = 0; i < commentBoxes.length; i++) {			
			makeCommentDiv.style.display = "block";
		}
		
	} else {
		for (let i = 0; i < commentBoxes.length; i++) {
			commentBoxes[i].style.display = "none";
		}
		
	}	
}


export { initPage, comment };




