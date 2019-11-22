import { loginform, handleErrors } from './login.js';
import  { postpublicfeed, loadfeed, compare } from './postfeed.js';
import { loadPage, signout } from './initLoadPage.js';

function loginfeed (token) {
    console.log("Token "+ token);
    let option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  "Token " + token
        },
    }

    feed("http://127.0.0.1:5000/user/feed", option)
    .then ( data => {
        loadPostModal();
        return DataCue;
    })
    .catch(error => console.log("login fail"));
    
    signout(token);
}

function feed(url = '', option = {}) {
    //let urlWithQuery = url + "?p=0&n=10";
    //console.log(urlWithQuery);
    // Default options are marked with *
      return fetch(url, option)
      .then(handleErrors)
      .then(response => response.json()) // parses JSON response into native JavaScript objects      
      .then(myJson => {
            let sortedArray = myJson["posts"].sort(compare);
            removeModal();
            loadfeed(sortedArray);
            return myJson;
      })
      .then (response => {  
        let logBut = document.getElementById("login");
        logBut.style.display = "none";

        let signBut = document.getElementById("signup");
        signBut.style.display = "none";
        return response;
      })
      .catch(error => console.log("error"));
}
function removeModal () {
    let xbutton = document.getElementById("closebuttonsignin");
	let modal = document.getElementById("loginpage");	
    let feeddiv = document.getElementById("feeddiv");
    let feed = document.getElementById("feed");
	let main = document.getElementById("main");
    if(modal) {
        modal.style.display = "none";
        main.removeChild(modal);
        
    }
}

export { loginfeed };