/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */


// import your own scripts here.

import initPage from './mainPage.js';
import { loginform, handleErrors } from './login.js';
import signupform from './signupForm.js';
import { postpublicfeed } from './postfeed.js';
import { loadPage, signout } from './initLoadPage.js';
import { loadPostModal } from './loadPostModal.js'

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with
// different datasets.
function initApp(apiUrl) {
	// your app initialisation goes here
	initPage();	
	loginform();
	signupform();
	loadPage();
	console.log("done posting modal");	
}

export default initApp;
