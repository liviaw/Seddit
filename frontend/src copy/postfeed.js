import { loginfeed } from './loginfeed.js';
import { loginform, handleErrors } from './login.js';
import { loadPage } from './initLoadPage.js';
var post = null;
function convertTime (unixTime) {
	var time = new Date (unixTime * 1000);

	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var year = time.getFullYear();
	var month = months[time.getMonth()];
	var date = time.getDate();
	var hour = time.getHours();

	if (hour < 10) {
		hour = "0" + hour;
	}
	var min = time.getMinutes();
	if (min < 10) {
		min = "0" + hour;
	}
	var sec = time.getSeconds();
	if (sec < 10) {
		sec = "0" + sec;
	}

	var formattedTime = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
	return formattedTime;
}


function loadfeed(feedArray) {
	let feed = document.getElementById("feed");
	let feeddiv = document.getElementById("feeddiv");
	console.log("outside is" + feeddiv);
	if (feeddiv) {
		feed.removeChild(feeddiv);
		console.log("here is old feed div " + feeddiv);
	}
	feeddiv = document.createElement("div");
	feeddiv.setAttribute("id", "feeddiv");
	let dataIdFeed = document.createAttribute("data-id-feed");
	feeddiv.setAttributeNode(dataIdFeed);
	feeddiv.classList.add("full-post");

	for (let i = 0; i < feedArray.length; i++) {
		let postbutton = document.getElementById('main_post_button');
		// single content only has two child : 1. the post (mainpost) 2. comments
		let singleContent = document.createElement("ul");
		singleContent.setAttribute("id", feedArray[i]["id"]);
		singleContent.classList.add("full-post-ul");
		let mainpost = document.createElement("li");	
		mainpost.setAttribute("id", "mainpost"+i);	
		mainpost.classList.add("post");
		let dateIdPost = document.createAttribute("data-id-post");
		mainpost.setAttributeNode(dateIdPost);
		
		let date = document.createElement("div");
		let dateContent = document.createElement("p");
		date.classList.add("post-date");
		dateContent.classList.add("post-date");
		dateContent.innerText = convertTime(feedArray[i]["meta"]["published"]);
		date.appendChild(dateContent);
		mainpost.appendChild(date);
		
		let vote = document.createElement("div");
		vote.setAttribute("id", "vote" + feedArray[i]["id"]);
		vote.classList.add("vote");
		let dataUpvote = document.createAttribute("data-id-upvotes");
		vote.setAttributeNode(dataUpvote);
		let voteText = document.createElement("p");
		voteText.classList.add("vote-item");
		voteText.setAttribute("id", "voteText" + feedArray[i]["id"]);
		voteText.innerText = feedArray[i]["meta"]["upvotes"].length + " votes";
		
		let upVoteButton = document.createElement("i");
		upVoteButton.setAttribute("id", "votebutton" + feedArray[i]["id"]);
		//upVoteButton.setAttribute("type", "i");
		//upVoteButton.classList.add("vote-item");
		upVoteButton.classList.add("fa");
		upVoteButton.classList.add("fa-thumbs-up");
		userVoted(feedArray[i]["meta"]["upvotes"], feedArray[i]["id"]);

		upVoteButton.addEventListener("click", (event) => {
			event.stopPropagation();
			upVote(feedArray[i]);
		});
		//upVoteButton.setAttribute("value", "Likes");
		vote.appendChild(upVoteButton);
		vote.appendChild(voteText);			
		vote.appendChild(upVoteButton);

		 
		vote.addEventListener("click", (event) => {
			getVoteInfo (feedArray[i]);
		});
		mainpost.appendChild(vote);

		let content = document.createElement("div");
		content.classList.add("content");		
		
		let innerContentTitle = document.createElement("h4");
		let dataAttr = document.createAttribute("data-id-title");
		innerContentTitle.setAttributeNode(dataAttr);
		innerContentTitle.classList.add("post-title");
		innerContentTitle.classList.add("alt-text");
		innerContentTitle.innerText = feedArray[i]["title"];

		let innerContentText = document.createElement("content");
		innerContentText.classList.add("post-content");
		innerContentText.innerText = feedArray[i]["text"];

		let innerContentAuthor = document.createElement("p");
		innerContentAuthor.classList.add("post-author");
		let authAttr = document.createAttribute("data-id-author");
		innerContentAuthor.setAttributeNode(authAttr);
		innerContentAuthor.innerText = "@" + feedArray[i]["meta"]["author"];

		let innerSubseddit = document.createElement("p");
		innerSubseddit.classList.add("post-seddit");
		innerSubseddit.innerText = feedArray[i]["meta"]["subseddit"];

		
		content.appendChild(innerContentTitle);
		content.appendChild(innerContentText);
		content.appendChild(innerContentAuthor);
		content.appendChild(innerSubseddit);
		 
		mainpost.appendChild(content);
		mainpost.appendChild(date);
		

		
		// image stuff
		
		// if (feedArray[i]["thumbnail"] !== null) {
		// 	let innerThumb = document.createElement("div");
		// 	let thumb = document.createElement("img");
		// 	thumb.setAttribute("class", "post-thumbnail");
		// 	thumb.setAttribute("alt", innerContentAuthor + innerSubseddit + "thumb");
		// 	thumb.setAttribute("src", "data:image/png;base64," + feedArray[i]["thumbnail"]);
		// 	innerThumb.appendChild(thumb);
		// 	mainpost.appendChild(innerThumb);
		// }
		
		if (feedArray[i]["image"] !== null && feedArray[i]["image"] !== "") {
			let innerImage = document.createElement("div");
			let imageContent = document.createElement("img");
			innerImage.classList.add("post-image");
			imageContent.classList.add("post-image");
			imageContent.setAttribute("alt", innerContentAuthor + innerSubseddit + "image");
			imageContent.setAttribute("src", "data:image/png;base64," + feedArray[i]["image"]);
			innerImage.appendChild(imageContent);
			//mainpost.appendChild(imageContent);
			mainpost.appendChild(innerImage);			
		}
		

		singleContent.appendChild(mainpost);
		// comment
		let commentDiv = document.createElement("div");
		commentDiv.classList.add("comment-div");
		let commentBut = document.createElement("button");
		commentBut.classList.add("comment-button");
		let commentAmount = document.createElement("p");
		commentAmount.classList.add("comment");
		commentAmount.innerText = feedArray[i]["comments"].length + " comments";

		commentBut.addEventListener("click", () => {
			let token = localStorage.getItem("token");
			if (token) {
				let allCommentUsers = document.getElementById("voteModalBody");
				event.preventDefault();
				if (allCommentUsers) {
					votemodal.style.display = "block";
				} else {
					voteModal(feedArray[i]["id"]);
					allCommentUsers = document.getElementById("voteModalBody");
					for (let j = 0; j < feedArray[i]["comments"].length; j++){
						showComment(feedArray[i]["comments"][j]);
					}
					if (feedArray[i]["comments"].length == 0) {
						let singleUser = document.createElement("div");
						let singleUserName = document.createElement("p");
						singleUserName.innerText = "No one has commented on this post";
						singleUser.appendChild(singleUserName);
						allCommentUsers.appendChild(singleUser);
					}
					let voteModalFooter = document.getElementById("voteModalFooterText");
					voteModalFooter.innerText = "Total " + feedArray[i]["comments"].length + " comments";
				}
			} else {
				alert("please log in to view post information");
			}

		});
		commentBut.appendChild(commentAmount);
		commentDiv.appendChild(commentBut);

		singleContent.appendChild(commentDiv);
		
		feeddiv.appendChild(singleContent);
	}
	feed.appendChild(feeddiv);	
}

function getVoteInfo (feedObj) {
	let token = localStorage.getItem("token");
	let votemodal = document.getElementById("votemodal");
	if (token) {
		let allVotedUsers = document.getElementById("voteModalBody");
		event.preventDefault();
		if (allVotedUsers) {
			// show it
			console.log(" shouldnt print this! check if you have deleted your modal properly!")
			votemodal.style.display = "block";
		} else {
			voteModal(feedObj["id"]);
			
			allVotedUsers = document.getElementById("voteModalBody");
			for (let j = 0; j < feedObj["meta"]["upvotes"].length; j++){
				showVote(feedObj["meta"]["upvotes"][j]);
			}
			if (feedObj["meta"]["upvotes"].length == 0) {
				let singleUser = document.createElement("div");
				let singleUserName = document.createElement("p");
				singleUserName.innerText = "No one has up voted this post";
				singleUser.appendChild(singleUserName);
				allVotedUsers.appendChild(singleUser);
			}
			let voteModalFooter = document.getElementById("voteModalFooterText");
			voteModalFooter.innerText = "Total " + feedObj["meta"]["upvotes"].length + " votes";
		}
	} else {
		alert("please log in to view post information");
	}

}

function voteModal (id) {
	let votediv = document.getElementById("vote");
	let votemodal = document.createElement("div");
	votemodal.setAttribute("id", "votemodal");
	votemodal.classList.add("modal");

	let voteModalContent = document.createElement("div");
	voteModalContent.classList.add("modal-content");

	let voteModalHeader = document.createElement("div");
	voteModalHeader.classList.add("modal-header");

	let voteModalClose = document.createElement("span");
	voteModalClose.classList.add("close");
	voteModalClose.setAttribute("id", "voteModalClose");
	voteModalClose.innerText = "x";
	voteModalHeader.appendChild(voteModalClose);

	let voteModalHeaderText = document.createElement("h3");
	voteModalHeaderText.innerText = "Up Votes:"
	voteModalHeader.appendChild(voteModalHeaderText);
	voteModalContent.appendChild(voteModalHeader);

	let voteModalBody = document.createElement("div");
	voteModalBody.classList.add("modal-body");
	voteModalBody.setAttribute("id", "voteModalBody");
	voteModalContent.appendChild(voteModalBody);

	let voteModalFooter = document.createElement("div");
	voteModalFooter.classList.add("modal-footer");
	let voteModalFooterText = document.createElement("h4");
	voteModalFooterText.setAttribute("id", "voteModalFooterText");
	//voteModalHeaderText.innerText = "sometext";
	voteModalFooter.appendChild(voteModalFooterText);
	voteModalContent.appendChild(voteModalFooter);

	votemodal.appendChild(voteModalContent);

	//let feed = document.getElementById("feed");
	let singleContent = document.getElementById(id);
	singleContent.appendChild(votemodal);
	//document.body.appendChild(votemodal);
	//document.body.insertBefore(votemodal, document.body.firstChild);

	// Get the <span> element that closes the modal
	let span = document.getElementById("voteModalClose");

	// When the user clicks the button, open the modal 
	votemodal.style.display = "block";
	votemodal.addEventListener("click", (event) => {
		event.preventDefault();
	});

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		singleContent.removeChild(votemodal);
		//votemodal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == votemodal) {
			singleContent.removeChild(votemodal);
			//votemodal.style.display = "none";
		}
	}

}

function showVote (postId) {
	let token = localStorage.getItem("token");
	// only log in users can view comments
	let url = "http://127.0.0.1:5000/user/?id=" + postId;
	let option = {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		headers: {
			'Content-Type': 'application/json',
			'Authorization':  "Token " + token
		},
	}
	getPostInfo(url, option)	
	.then(data => data["username"])
	.then (user => {
		let allVotedUsers = document.getElementById("voteModalBody");
		let singleUser = document.createElement("div");
		let singleUserName = document.createElement("p");
		singleUserName.setAttribute("id", "singleUserName");
		singleUserName.innerText = user;
		singleUser.appendChild(singleUserName);
		allVotedUsers.appendChild(singleUser);
	})
	.catch(error => console.log("cannot show vote"));
		

}

function showComment (commentObj) {
	let allCommentUsers = document.getElementById("voteModalBody");
	let token = localStorage.getItem("token");
	// only log in users can view comments
	if (token){
		let singleUser = document.createElement("div");
		let singleUserName = document.createElement("p");
		singleUserName.setAttribute("id", "commentUserName");
		singleUserName.innerText = commentObj["author"]+ " : " + commentObj["comment"];
		singleUser.appendChild(singleUserName);
		allCommentUsers.appendChild(singleUser);
		

	} else {
		alert("please log in to view post information");
	}
	console.log("shdnt be here");
}

function getPostInfo (url = '', option = {}) {
	return fetch(url, option)
	.then(handleErrors)
	.then(response => response.json())
	.then(r => {
		console.log("gettinf info");
		return r;
	})	
	.catch(error => console.log("cannot fetch info about the post"));
}

// check if the logged in user has voted on this post before
function userVoted (voteArray, vid) {
	let token = localStorage.getItem("token");
	if (token){
		let url = "http://127.0.0.1:5000/user/";
		let option = {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/json',
				'Authorization':  "Token " + token
			},
		}
		getPostInfo(url, option)
		.then(r => {
			let userid = r["id"];
			for (let j = 0; j < voteArray.length; j++){
				if (voteArray[j] == userid) {
					let upVoteButton = document.getElementById("votebutton" + vid);
					console.log("i voted b4!");
					upVoteButton.classList.add("fa-thumbs-down");
					break;
				}
			}
		});
	}

}

function attainVotingInfo (url = '', option = {}) {
	return fetch(url, option)
	.then(handleErrors)
	.then(r => {
		console.log("getting voting info");
		return r;
	})	
	.catch(error => console.log("cannot fetch info about the post"));
}
function upVote (feed) {
	let token = localStorage.getItem("token");
	let upVoteButton = document.getElementById("votebutton"+ feed["id"]);
	let url = "http://127.0.0.1:5000/post/vote?id=" + feed["id"];
	if (token) {
		// when you click, does the button initially go up or down? if its down then you have unliked
		
		if (upVoteButton.classList.contains("fa-thumbs-down")) {
			// you have liked, so the button turns to thumbs down for in case you want to unlike
			upVoteButton.classList.toggle("fa-thumbs-down");
			let option = {
				method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json',
					'Authorization':  "Token " + token
				},
			}
			attainVotingInfo(url, option)
			.then (data => {
				// show decremented vote
				// let voteText = document.getElementById("voteText" + feed["id"]);
				// voteText.innerText = feed["meta"]["upvotes"].length - 0 + " votes";
				// let vote = document.getElementById("vote"+feed["id"]);
				// console.log("----" + (feed["meta"]["upvotes"].length));
				// vote.addEventListener("click", (event) => {
				// 	getVoteInfo (feed);
				// });
				loadPage ();
				return data;
			})
			.catch(error => console.log("error deleting vote"+ error));

		} else {
			upVoteButton.classList.toggle("fa-thumbs-down");
			let option = {
				method: 'PUT', // *GET, POST, PUT, DELETE, etc.
				headers: {
					'Content-Type': 'application/json',
					'Authorization':  "Token " + token
				},
			}
			//add vote to the backend
			attainVotingInfo(url, option)
			// .then (data => {
			// 	// show incremented vote
			// 	console.log("increment "+(feed["meta"]["upvotes"].length + 1));
			// 	let voteText = document.getElementById("voteText" + feed["id"]);
			// 	voteText.innerText = feed["meta"]["upvotes"].length + " votes";
			// 	let vote = document.getElementById("vote"+ feed["id"]);
			// 	return data;
			// })
			.then (data => {
				loadPage ();				
				// console.log("outside");
				// let vote = document.getElementById("vote");
				// vote.addEventListener("click", (event) => {
				// 	console.log("updating");
				// 	getVoteInfo (feed);
				// 	console.log("afterrr");
				// });
				return data;				
			})
			.catch(error => console.log("error adding vote"+ error));
			// increment vote 

		}
	} else {
		alert("Please Log in to up vote!");
	}
}

function compare( a, b ) {
	if ( a.meta.published > b.meta.published ){
	  return -1;
	}
	if ( a.meta.published < b.meta.published ){
	  return 1;
	}
	return 0;
}


function postpublicfeed () {	
	let feeddiv = document.getElementById("feeddiv");
	let postbutton = document.getElementById('main_post_button');
	let main = document.getElementById("main");

	fetch ("http://127.0.0.1:5000/post/public")
	.then(response => response.json())
	.then(myJson => {
		console.log(myJson["posts"]);
		let sortedArray = myJson["posts"].sort(compare);
		post = sortedArray;		
		return loadfeed(sortedArray);
		
	})
	

}

function getId () {

}



export { postpublicfeed, loadfeed, compare, post };

