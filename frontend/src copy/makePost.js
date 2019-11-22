function makePostModal(event) {
    console.log(event);
    //event.stopPropagation();
	let token = localStorage.getItem("token");
	if (token) {
        let postModalBody = document.getElementById("postModalBody");
        let postModal = document.getElementById("postModal");
		
		if (postModal) {
            // show the modal if already exist
            console.log("modal aldy exist");
			postModal.style.display = "";
		} else {
            postModalFunc();
            
		}
	} else {
		alert("please log in to make a new post :)");
	}
}



function postModalFunc() {
    let main = document.getElementById("main");
	let postModal = document.createElement("div");
	postModal.setAttribute("id", "postmodal");
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
    console.log("make body");
	postModalContent.appendChild(postModalBody);

	let postModalFooter = document.createElement("div");
	postModalFooter.classList.add("modal-footer");
	let postModalFooterText = document.createElement("h4");
	postModalFooterText.setAttribute("id", "postModalFooterText");
	//voteModalHeaderText.innerText = "sometext";
	postModalFooter.appendChild(postModalFooterText);
	postModalContent.appendChild(postModalFooter);

	postModal.appendChild(postModalContent);

	main.appendChild(postModal);
	//document.body.postModal(votemodal);
	//document.body.insertBefore(votemodal, document.body.firstChild);

	// Get the <span> element that closes the modal
	let span = document.getElementById("postModalClose");

	// When the user clicks the button, open the modal 
	postModal.style.display = "block";
    makePostContent();
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		main.removeChild(postModal);
		//votemodal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == postModal) {
			main.removeChild(postModal);
			//votemodal.style.display = "none";
		}
    }
    

}

function makePostContent () {
    let postModalBody = document.getElementById("postModalBody");
    let postBodyForm = document.createElement("form");
    postBodyForm.setAttribute("id", "postBodyForm");
    postBodyForm.classList.add("modal-content");
    //postBodyForm.classList.add("animate");

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
    /*
    let textInput = document.createElement("input");
    textInput.setAttribute("type", "text");
    textInput.setAttribute("placeholder", "Enter your text here");
    textInput.setAttribute("name", "text");
    textInput.setAttribute("required", "");
    textDiv.appendChild(textInput);
    */
    //let ;
    let textHolder = document.createElement("textarea");
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



    // response.status
    // let imgcontain = null;
    // reader.onloaded = function () {
    //     let img = imgInp.files[0];     
        
    //     if (img !== undefined) {
    //         reader.readAsDataURL(img);
    //         imgcontain = img;
    //     } 
    //     console.log(imgcontain);
    //         console.log(img);
    // }
    postButtonInp.addEventListener("click", (event) => {
        console.log("clicked!");
        console.log(document.forms["postBodyForm"]["postImage"].files[0]);
        if (document.forms["postBodyForm"]["postImage"].files[0]) {
            var reader  = new FileReader();

            reader.onloadend = function () {
                event.stopPropagation();
                let token = localStorage.getItem("token");
                if (token) {         
                    console.log("in event"+token);
                    let data = {
                        "title": titleInput.value,
                        "text": textHolder.value,
                        "subseddit": subseditInput.value,
                        "image": reader.result.replace('data:image/png;base64,', "")
                    }
                    console.log(data);
                    // to get image from postfeed you did:
                    // imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
                
                    if (titleInput.value == "") {
                        alert("please enter title!");
                    } else if (textHolder.value == "") {
                        alert("please enter text!");
                    } else {
                        postData("http://127.0.0.1:5000/post/", data)
                        .then (response => {
                            console.log("status isss!" + response.status);
                            if (response.status == 200) {
                                console.log("yay!" + response.status);
                            } else {
                                alert(response["message"]);
                            }
                            return response;
                        })
                        .catch(error => console.log("post fail"))
                        .then (data => {
                            if (data.status == 200) {
                                let postModal = document.getElementById("postmodal");
                                let main = document.getElementById("main");
                                //main.removeChild(postModal);
                                alert("post successfully made!");
                            }
                            return data;
                        })
                        .catch(error => console.log("fail to remove modal"));
                        
                    }
                
                }
            }

            reader.readAsDataURL(document.forms["postBodyForm"]["postImage"].files[0]);

            console.log(reader.result + " image");
        } else {
            let token = localStorage.getItem("token");
            if (token) {         
                let data = {
                    "title": titleInput.value,
                    "text": textHolder.value,
                    "subseddit": subseditInput.value,
                    "image": null
                }
                console.log(data);
                // to get image from postfeed you did:
                // imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
            
                if (titleInput.value == "") {
                    alert("pleaser enter title!");
                } else if (textHolder.value == "") {
                    alert("pleaser enter text!");
                } else {
                    postData("http://127.0.0.1:5000/post/", data)
                    .catch(error => console.log("post fail"))
                    .then (data => {
                        let postModal = document.getElementById("postmodal");
                        let main = document.getElementById("main");
                        //main.removeChild(postModal);
                        alert("post successfully made!");
                        return data;
                    })
                    .catch(error => console.log("fail to remove modal"));
                    
                }    
            }
        }
     
    });
    postButtonDiv.appendChild(postButtonInp);
    postBodyForm.appendChild(postButtonDiv);

    let postEndBr = document.createElement("br");
    postBodyForm.appendChild(postEndBr);

    postModalBody.appendChild(postBodyForm);
}

function postData(url = '', data = {}) {
    let token = localStorage.getItem("token");
    let success = 0;
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
              'Content-Type': 'application/json',
              'Authorization':  "Token " + token
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })

      .then (response => {
          console.log(" in post data");
          if (response.status == 200) {
          } else {
              alert(response["message"]);
          }
          return response;
      })
      .then(response => response.json()) // parses JSON response into native JavaScript objects
}

export { makePostModal }
