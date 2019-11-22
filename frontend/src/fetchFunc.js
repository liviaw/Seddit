var URL = "http://127.0.0.1:5000/";

function postData(url = '', option = {}) {
    let token = localStorage.getItem("token");
    // Default options are marked with *
    return fetch(url, option)
    .then(handleErrors)	   
    .then (response => {
        console.log(response);
        console.log(response.status);
        if (response.status === 200) {
        } else {
            alert(response["message"]);
        }
        return response;
    })   
    .then(response => response.json())
    .catch(error => console.log("error"));
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(" in handleeorrr data");
        throw Error(response.statusText);
    }
    return response;
}


function myFeedModal() {
    let main = document.getElementById("main");
	let postModal = document.createElement("div");
	postModal.setAttribute("id", "myFeed");
	postModal.classList.add("modal");

	let postModalContent = document.createElement("div");
	postModalContent.classList.add("modal-content");

	let postModalHeader = document.createElement("div");
	postModalHeader.classList.add("modal-header");

	let postModalClose = document.createElement("span");
	postModalClose.classList.add("close");
	postModalClose.setAttribute("id", "feedModalClose");
	postModalClose.innerText = "x";
	postModalHeader.appendChild(postModalClose);

	let postModalHeaderText = document.createElement("h3");
	postModalHeaderText.innerText = "Posts:"
	postModalHeader.appendChild(postModalHeaderText);
	postModalContent.appendChild(postModalHeader);

	let postModalBody = document.createElement("div");
	postModalBody.classList.add("modal-body");
    postModalBody.setAttribute("id", "feedModalBody");

	postModalContent.appendChild(postModalBody);
    console.log("C");
	let postModalFooter = document.createElement("div");
	postModalFooter.classList.add("modal-footer");
	let postModalFooterText = document.createElement("h4");
	postModalFooterText.setAttribute("id", "feedModalFooterText");
	postModalFooter.appendChild(postModalFooterText);
	postModalContent.appendChild(postModalFooter);

	postModal.appendChild(postModalContent);

    main.insertBefore(postModal, main.firstChild);
	// Get the <span> element that closes the modal
	let span = document.getElementById("feedModalClose");

	// When the user clicks the button, open the modal 
    postModal.style.display = "block";
    
    
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

export { URL, handleErrors, postData, myFeedModal };