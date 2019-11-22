import { postpublicfeed, post } from './postfeed.js';
import { loginfeed } from './loginfeed.js';
import { makePostModal } from './makePost.js';

function initPage () {
	let header = document.createElement("header");
	header.classList.add("banner");
	// set the id (which is an attribute) of header
	header.setAttribute("id", "nav");
	console.log("ehy");

	let h1 = document.createElement("h1");
	h1.setAttribute("id", "logo");
	h1.classList.add("flex-center");
	let seddit = document.createTextNode("Seddit");
	h1.appendChild(seddit);

	header.appendChild(h1);

	let ul1 = document.createElement("ul");
	ul1.classList.add("nav");
	ul1.setAttribute("id", "rightCorner")

	let li1 = document.createElement("li");
	li1.classList.add("nav-item");

	let input1 = document.createElement("input");
	input1.setAttribute("data-id-search", "");
	input1.setAttribute("id", "search");
	input1.setAttribute("placeholder", "Search Seddit");
	input1.setAttribute("type", "search");

	li1.appendChild(input1);
	ul1.appendChild(li1);

	let li2 = document.createElement("li");
	li2.classList.add("nav-item");

	//login button
	let button1 = document.createElement("button");
	button1.setAttribute("data-id-login", "");
	button1.setAttribute("id", "login");
	button1.classList.add("button");
	button1.classList.add("button-primary");
	button1.classList.add("display");
	let logintext = document.createTextNode("Log In");
	button1.appendChild(logintext);

	li2.appendChild(button1);
	ul1.appendChild(li2);

	let li3 = document.createElement("li");
	li3.classList.add("nav-item");

	let button2 = document.createElement("button");
	let dataIdSign = document.createAttribute("data-id-signup");
	button2.setAttributeNode(dataIdSign);
	button2.setAttribute("id", "signup");
	button2.classList.add("button");
	button2.classList.add("button-secondary");
	button2.classList.add("display");
	let signuptext = document.createTextNode("Sign Up");
	button2.appendChild(signuptext);

	li3.appendChild(button2);
	ul1.appendChild(li3);

	header.appendChild(ul1);

	document.body.appendChild(header);

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
	// button
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

	document.body.appendChild(main);

	let footer = document.createElement("footer");
	let footerText = document.createElement("p");
	footerText.innerText = "This is the Seddit footer";
	footer.appendChild(footerText);
	document.body.appendChild(footer);
	
}

export default initPage;




