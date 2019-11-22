import { initPage } from './mainPage.js';
import { loginForm } from './login.js';
import { signupForm } from './signupForm.js';
import { postPublicFeed } from './postFeed.js';
import { loginFeed } from './loginFeed.js';
import { profileModal } from './profile.js';
import { URL, handleErrors, postData } from './fetchFunc.js'



function loadPage () {
    let token = localStorage.getItem("token");
    // if token exist, user already signed in
    if (token) {
        // will also call showLogIn -> but this is for logged out state to log in
        loginFeed(token);
        showLogIn();
        console.log("token is still here");
        console.log(token);
    } else {
        console.log("hey");
        signout();
    }
}

function signout () {

    let token = localStorage.getItem("token");
   
    postPublicFeed();
    // hide profile button after signed out
    let profBut = document.getElementById("profile");
    profBut.style.display = "none";

    // clear token
    if (token) {
        localStorage.clear(token);
    }
    
    let logBut = document.getElementById("login");
    // block display will make it show in rows
    logBut.style.display = "";

    let signBut = document.getElementById("signup");
    signBut.style.display = "";

    let signoutBut = document.getElementById("signout");
    signoutBut.style.display = "none";


}

function showLogIn () {
    // hide logBut (log in button)
    let logBut = document.getElementById("login");
    logBut.style.display = "none";

    let signBut = document.getElementById("signup");
    signBut.style.display = "none";

    let signoutBut = document.getElementById("signout");
    signoutBut.style.display = "";

    let profBut = document.getElementById("profile");
    profBut.style.display = "";
}

export { loadPage, signout, showLogIn } 