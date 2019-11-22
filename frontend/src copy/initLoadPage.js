import initPage from './mainPage.js';
import { loginform, handleErrors } from './login.js';
import signupform from './signupForm.js';
import { postpublicfeed } from './postfeed.js';
import { loginfeed } from './loginfeed.js';
import { profileModal } from './profile.js';


function loadPage () {
    let token = localStorage.getItem("token");
    // if token exist, user already signed in
    console.log(token);
    if (token) {
        loginfeed(token);
        console.log("token is still here");
        console.log(token);
    } else {
        console.log("hey");
        postpublicfeed();
    }
}

function signout (token) {
    if (token) {
        let profBut = document.getElementById("profile");
        if (!profBut) {
            //making profile button
            let prof = document.createElement("li");
            prof.classList.add("nav-item");
            profBut = document.createElement("button");
            profBut.setAttribute("id", "profile");
            profBut.classList.add("button");
            profBut.classList.add("button-primary");
            profBut.classList.add("display");
            profBut.classList.add("warning");
            profBut.classList.add("btn");
            profBut.innerText = "View Profile";
            profBut.style.display = "";

            profBut.addEventListener("click", () => {
                profileModal();
            });
            prof.appendChild(profBut);
            let topRight = document.getElementById("rightCorner");
            topRight.appendChild(prof);
        } else {
            profBut.style.display = "";
        }
        let signOutButton = document.getElementById("signout");
        if (!signOutButton) {
            console.log("signout button not here , making one!");
            let topRight = document.getElementById("rightCorner");
            let signOut = document.createElement("li");
            signOut.classList.add("nav-item");

            signOutButton = document.createElement("button");
            signOutButton.setAttribute("id", "signout");
            signOutButton.classList.add("button");
            signOutButton.classList.add("button-primary");
            signOutButton.classList.add("display");
            signOutButton.innerText = "Log Out";
            signOutButton.style.display = "";
            signOutButton.addEventListener("click", () => {
                localStorage.clear(token);
                postpublicfeed();
                let logBut = document.getElementById("login");
                // block display will make it show in rows
                logBut.style.display = "";
            
                let signBut = document.getElementById("signup");
                signBut.style.display = "";
        
                let signoutBut = document.getElementById("signout");
                signoutBut.style.display = "none";

                let profBut = document.getElementById("profile");
                profBut.style.display = "none";

            })
            
            signOut.appendChild(signOutButton);
            topRight.appendChild(signOut);

        } else {
            console.log("signout button is here?!");
            signOutButton.style.display = "";
        }
        
    }



}

export { loadPage, signout } 