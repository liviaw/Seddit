/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */


// import your own scripts here.

import { initPage } from './mainPage.js';
import { loginForm } from './login.js';
import { signupForm } from './signupForm.js';
import { postPublicFeed } from './postFeed.js';
import { loadPage, signout } from './initLoadPage.js';
import { loadPostModal } from './loadPostModal.js'
import { URL, handleErrors, postData } from './fetchFunc.js'

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with
// different datasets.
function initApp(apiUrl) {
	let token = localStorage.getItem("token");
    console.log("start of program... token is: " + token);
	// your app initialisation goes here
	// set up the main page
	console.log("test 1");
	initPage();	
	// either load public page or logged in page
	console.log("test 2");
	loadPage();
	console.log("test 3");
}

export default initApp;
