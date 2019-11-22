var URL = "http://127.0.0.1:5000/";

function getPostInfo (url = URL, option = {}) {
	return fetch(url, option)
	.then(handleErrors)
	.then(response => response.json())
	.then(r => {
		console.log("gettinf info");
		return r;
	})	
	.catch(error => console.log("cannot fetch info about the post"));
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

export 