import { loginFeed } from './loginFeed.js';
//import { makePostModal } from './makePost.js';
import { URL, handleErrors, postData } from './fetchFunc.js'

function loadPostModal () {
    let postbutton = document.getElementById("mainPostButton");
    postbutton.addEventListener("click", (event) => {
		makePostModal(event);
		console.log("posting modal??");
	});
}

export { loadPostModal }