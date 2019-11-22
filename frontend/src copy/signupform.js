import { loadPage, signout } from './initLoadPage.js';
function signupform () {
  let signupbutton = document.getElementById("signup");
  signupbutton.addEventListener("click", () => {
      let main = document.getElementById("main");
      let outterdiv = document.createElement("div");
      outterdiv.setAttribute("id", "signuppage");
      outterdiv.setAttribute("class", "modal");

      let innerdiv1 = document.createElement("div");
      innerdiv1.setAttribute("class", "modal-content");

      let innerdiv2 = document.createElement("div");
      innerdiv2.setAttribute("class", "modal-header");
      //innerdiv2.innerText = "ds \n";
      innerdiv2.innerText = "Sign Up";

      let xbutton = document.createElement("span");
      xbutton.setAttribute("class", "close");

      let bodyDiv = document.createElement("div");
      bodyDiv.setAttribute("class", "modal-body");

      let signup = document.createElement("form");
      signup.setAttribute("name", "signupform");
      signup.setAttribute("method", "post");         

      let uname = document.createElement("input");
      uname.setAttribute("name", "username");
      uname.setAttribute("type", "createTextNode");
      uname.setAttribute("id", "signup_username");
      uname.setAttribute("placeholder", "Enter Username");
      uname.setAttribute("required", "");
      //uname.setAttribute("minlength", "5");
      uname.setAttribute("maxlength", "9");

      let password = document.createElement("input");
      password.setAttribute("id", "signup_password_input");
      password.setAttribute("name", "password");
      password.setAttribute("type", "password");
      password.setAttribute("placeholder", "Enter password");
      password.setAttribute("required", "");
      //password.setAttribute("minlength", "5");
      uname.setAttribute("maxlength", "9");
      
      let email = document.createElement("input");
      email.setAttribute("id", "signup_email");
      email.setAttribute("name", "email");
      email.setAttribute("type", "email");
      email.setAttribute("placeholder", "Enter Email");
      email.setAttribute("required", "");

      let name = document.createElement("input");
      name.setAttribute("id", "signup_name");
      name.setAttribute("name", "name");
      name.setAttribute("type", "createTextNode");
      name.setAttribute("placeholder", "Enter name");
      name.setAttribute("required", "");

      let signupbutton = document.createElement("input");
      signupbutton.setAttribute("id", "signup_button");
      signupbutton.setAttribute("type", "submit");
      signupbutton.setAttribute("value", "Sign Up");

      //outterdiv.appendChild(signup);
      signup.appendChild(uname);      
      signup.appendChild(password);     
      signup.appendChild(email);
      signup.appendChild(name);
      signup.appendChild(signupbutton); 
          
      innerdiv2.appendChild(xbutton);
      bodyDiv.appendChild(signup);
      innerdiv1.appendChild(innerdiv2);
      innerdiv1.appendChild(bodyDiv);
      outterdiv.appendChild(innerdiv1);

      main.appendChild(outterdiv);
      //logflag = true;

      removeModal ();

      let signupform = document.forms.signupform;
      console.log(signupform);
      signupform.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(":)");

      let username = signupform.username;
      let password = signupform.password;
      let email = signupform.email;
      let name = signupform.name;


      if (username.value === "" || password.value === "" || email.value === "" || name.value === "") {
        alert("Please fill in all fields");
      } 

      let user = {
        "username": username.value,
        "password": password.value,
        "email": email.value,
        "name": name.value
      }


      return postData('http://127.0.0.1:5000/auth/signup', user)
      .catch(error => alert("something is wrong, contact the engineer!"))
      .then(data => {
        localStorage.setItem("token", data["token"]);
        loadPage();
        hideModal();
        return data;
      })
      .catch(error => alert("something is wrong, contact the engineer again!"));
    });

  });
}

function hideModal () {
  var modal = document.getElementById("signuppage");
  modal.style.display = "none";
  if (modal) {
    main.removeChild(modal);
  }
}

function removeModal () {
  var modal = document.getElementById("signuppage");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // Get the <span> element that closes the modal
  modal.style.display = "block";
  
  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", function() {
    modal.style.display = "none";
    main.removeChild(modal);
  })

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        main.removeChild(modal);
      }
  })

}

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}


function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => alert("You already have an account!"));

}


export default signupform;