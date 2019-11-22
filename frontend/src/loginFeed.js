import { loginForm } from './login.js';
import  { postPublicFeed, loadFeed, compare } from './postFeed.js';
import { loadPage, signout, showLogIn } from './initLoadPage.js';
import { URL, handleErrors, postData } from './fetchFunc.js';

// called by login.js, loadPage in initLoadPage
function loginFeed (token) {
    console.log("Token "+ token);
    let option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  "Token " + token
        },
    }   
    postData(URL + "user/feed", option)
    .then(myJson => {
        let sortedArray = myJson["posts"].sort(compare);
        console.log(sortedArray);
        removeModal();
        showLogIn();
        loadFeed(sortedArray);
        
          return myJson;
    })
    .catch(error => console.log("log in fail"));
    
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



export { loginFeed };
