import { URL, handleErrors, postData } from './fetchFunc.js';

// called by loadPostModal

function showPostModal() {
    let postbut = document.getElementById("mainPostButton");
     
    postbut.addEventListener("click", () => {
        let token = localStorage.getItem("token");  
        if (token) {
            
            postModalFunc();
            let postForm = document.forms.postBodyForm;
            postForm.addEventListener("submit", sendingPost);
        } else {
            alert("please log in to post :)");
        }
    })
} 


    // event.preventDefault();
	// let token = localStorage.getItem("token");
	// if (token) {
    //     let postModalBody = document.getElementById("postModalBody");
    //     let postModal = document.getElementById("postModal");
		
	// 	if (postModal) {
    //         // show the modal if already exist
    //         console.log("modal aldy exist");
	// 		postModal.style.display = "block";
    //     }
	// } else {
	// 	alert("please log in to make a new post :)");
	// }




function postModalFunc() {
    let main = document.getElementById("main");
	let postModal = document.createElement("div");
	postModal.setAttribute("id", "postModal");
	postModal.classList.add("modal");

	let postModalContent = document.createElement("div");
	postModalContent.classList.add("modal-content");

	let postModalHeader = document.createElement("div");
	postModalHeader.classList.add("modal-header");

	let postModalClose = document.createElement("span");
	postModalClose.classList.add("close");
	postModalClose.setAttribute("id", "postModalClose");
	postModalClose.innerText = "x";
	postModalHeader.appendChild(postModalClose);

	let postModalHeaderText = document.createElement("h3");
	postModalHeaderText.innerText = "Posts:"
	postModalHeader.appendChild(postModalHeaderText);
	postModalContent.appendChild(postModalHeader);

	let postModalBody = document.createElement("div");
	postModalBody.classList.add("modal-body");
    postModalBody.setAttribute("id", "postModalBody");

	postModalContent.appendChild(postModalBody);
    console.log("C");
	let postModalFooter = document.createElement("div");
	postModalFooter.classList.add("modal-footer");
	let postModalFooterText = document.createElement("h4");
	postModalFooterText.setAttribute("id", "postModalFooterText");
	postModalFooter.appendChild(postModalFooterText);
	postModalContent.appendChild(postModalFooter);

	postModal.appendChild(postModalContent);

    main.insertBefore(postModal, main.firstChild);
	// Get the <span> element that closes the modal
	let span = document.getElementById("postModalClose");

	// When the user clicks the button, open the modal 
    postModal.style.display = "block";

    makePostContent();
    
    
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		main.removeChild(postModal);
		//postModal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == postModal) {
			main.removeChild(postModal);
			//postModal.style.display = "none";
		}
    }
    

}

function makePostContent () {
    console.log("F");
    let postModalBody = document.getElementById("postModalBody");
    let postBodyForm = document.createElement("form");
    postBodyForm.setAttribute("id", "postBodyForm");
    postBodyForm.classList.add("modal-content");
    //postBodyForm.classList.add("animate");
    postBodyForm.setAttribute("name", "postBodyForm");
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("post-make");
    
    let titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    let b = document.createElement("b");
    b.innerText = "Title";
    titleLabel.appendChild(b);
    titleDiv.appendChild(titleLabel);

    let titleLabelBr = document.createElement("br");
    titleDiv.appendChild(titleLabelBr);

    let titleInput = document.createElement("input");
    titleInput.setAttribute("id", "titleInput");
    titleInput.setAttribute("type", "text");
    titleInput.style.width = "75%";
    titleInput.style.height = "45px";
    titleInput.setAttribute("placeholder", "Enter your post title here");
    titleInput.setAttribute("name", "title");
    //titleInput.setAttribute("required", "");
    titleInput.style.font = "400 25px system-ui";
    titleDiv.appendChild(titleInput);

    postBodyForm.appendChild(titleDiv);
    let titleBr = document.createElement("br");
    postBodyForm.appendChild(titleBr);

    let textDiv = document.createElement("div");
    let textLabel = document.createElement("label");
    textLabel.setAttribute("for", "text");
    let bold = document.createElement("b");
    bold.innerText = "Text";
    textLabel.appendChild(bold);
    textDiv.appendChild(textLabel);
    textDiv.classList.add("post-make");

    let textLabelBr = document.createElement("br");
    textDiv.appendChild(textLabelBr);

    let textHolder = document.createElement("textarea");
    textHolder.setAttribute("id", "postText");
    //textHolder.classList.add("post-make");
    textHolder.setAttribute("rows", "30");
    textHolder.setAttribute("cols", "90");
    //textDiv.classList.add("center");
    //textInput.appendChild(textHolder);
    textHolder.setAttribute("name", "text");
    //textHolder.setAttribute("required", "");
    
    textDiv.appendChild(textHolder);
    

    postBodyForm.appendChild(textDiv);
    let textBr = document.createElement("br");
    postBodyForm.appendChild(textBr);

    let subseditDiv = document.createElement("div");
    let subseditLabel = document.createElement("label");
    //subseditLabel.classList.add("post-make");
    subseditLabel.setAttribute("for", "subseddit");
    let subb = document.createElement("b");
    subb.innerText = "Subseddit";
    subseditLabel.appendChild(subb);
    subseditDiv.appendChild(subseditLabel);
    
    subseditDiv.classList.add("post-make");

    let subLabelBr = document.createElement("br");
    subseditDiv.appendChild(subLabelBr);

    let subseditInput = document.createElement("input");
    subseditInput.setAttribute("type", "text");
    subseditInput.setAttribute("placeholder", "Enter your post subseddit here");
    subseditInput.setAttribute("name", "subseddit");
    subseditInput.style.width = "75%";
    subseditInput.style.height = "45px";
    subseditInput.setAttribute("id", "postSubseditInput");
    subseditInput.setAttribute("value", "");
    subseditDiv.appendChild(subseditInput);

    postBodyForm.appendChild(subseditDiv);
    let subBr = document.createElement("br");
    postBodyForm.appendChild(subBr);
    
    let imgDiv = document.createElement("div");
    
    let imgLabel = document.createElement("label");
    imgLabel.setAttribute("for", "postImage");
    let imgbold = document.createElement("b");
    imgbold.innerText = "Image";
    imgLabel.appendChild(imgbold);
    imgDiv.appendChild(imgLabel);
    imgDiv.classList.add("post-make");

    let imgFirstDivBr = document.createElement("br");
    imgDiv.appendChild(imgFirstDivBr);
    
    var imgInp = document.createElement("input");

    imgInp.setAttribute("type", "file");
    imgInp.setAttribute("name","postImage")
    imgDiv.appendChild(imgInp);

    let imgBr = document.createElement("br");
    imgDiv.appendChild(imgBr);


    let imgSrc = document.createElement("img");
    imgSrc.setAttribute("src", "");
    imgSrc.setAttribute("height", "200px");
    imgSrc.setAttribute("alt", "Image preview...");
    imgDiv.appendChild(imgSrc);

    let imgLabelBr = document.createElement("br");
    imgDiv.appendChild(imgLabelBr);
    postBodyForm.appendChild(imgDiv);
    //let imgcontain = previewFile();
    //imgInp.setAttribute("onchange", imgcontain);

    let imgDivBr = document.createElement("br");
    postBodyForm.appendChild(imgDivBr);
    let postButtonDiv = document.createElement("div");
    let postButtonInp = document.createElement("input");
    let postButtonP = document.createElement("h4");
    postButtonInp.classList.add("center");
    postButtonDiv.classList.add("post-make");
    postButtonInp.setAttribute("type", "submit");
    postButtonInp.setAttribute("value", "Post!");
    postButtonInp.style.width = "25%";
    postButtonInp.style.height = "35px";
    postButtonInp.appendChild(postButtonP);

    postButtonDiv.appendChild(postButtonInp);
    postBodyForm.appendChild(postButtonDiv);

    let postEndBr = document.createElement("br");
    postBodyForm.appendChild(postEndBr);
    postModalBody.appendChild(postBodyForm);
}

function sendingPost () {
    event.preventDefault();
    let token = localStorage.getItem("token");
    if (!token) {

        return null;
    }
    let titleInput = document.getElementById("titleInput");
    let textHolder = document.getElementById("postText");
    let subseditInput = document.getElementById("postSubseditInput");
    if (titleInput.value === "") {
        alert("fill in title");
    } else if (textHolder.value === "") {
        alert("fill in text");
    } else {
        if (document.forms["postBodyForm"]["postImage"].files[0]) {
            var reader  = new FileReader();
            reader.readAsDataURL(document.forms["postBodyForm"]["postImage"].files[0]);
            reader.onloadend = function () {    
                event.stopPropagation();                                 
                console.log("in event"+token);
                let data = {
                    "title": titleInput.value,
                    "text": textHolder.value,
                    "subseddit": subseditInput.value,
                    "image": reader.result.replace('data:image/png;base64,', "")
                }
                console.log(data);
                let option = {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':  "Token " + token
                    },
                    body: JSON.stringify(data),
                }
                // to get image from postfeed you did:
                // imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
                let suc = 0;
                let error = "error";
                fetch(URL + "post/", option)
                .then(handleErrors)	         
                .then(response => response.json())
                .then (data => {
                    let postModal = document.getElementById("postModal");
                    let main = document.getElementById("main");
                    main.removeChild(postModal);
                    console.log("O");
                    alert("post successfully made!");

                    return data;
                })
                .catch(err => alert("Image is not supported"));  
                               
            }
            
        } else {
            let data = {
                "title": titleInput.value,
                "text": textHolder.value,
                "subseddit": subseditInput.value,
                "image": null
            }
            console.log(data);
            let option = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  "Token " + token
                },
                body: JSON.stringify(data),
            }
            // to get image from postfeed you did:
            // imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
            let suc = 1;
            let error = "error";
            fetch(URL + "post/", option)            
            .then(handleErrors)	           
            .then(response => response.json())
            .then (data => {
                let postModal = document.getElementById("postModal");
                let main = document.getElementById("main");
                main.removeChild(postModal);
                console.log("O");
                alert("post successfully made!");

                return data;
            })
            .catch(err => alert(error)); 

        }
    }
     
}
export { showPostModal, postModalFunc , makePostContent}
