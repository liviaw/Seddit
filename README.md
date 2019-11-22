## Seddit - Introduction

JavaScript is used increasingly to provide a native-like application experience in the web. One
major avenue of this has been in the use of Single Page Applications or SPAs. SPAs
are generated, rendered, and updated using JavaScript. Because SPAs don't require a user
to navigate away from a page to do anything, they retain a degree of user and application state.


Some of the skills/concepts implemented:
* Simple event handling (buttons)
* Advanced Mouse Events (Swipe)
* Fetching data from an API
* Infinite scroll
* CSS Animations
* Web Workers / Service Workers
* Push Notifications (Polling)
* Offline Support
* Routing (URL fragment based routing)


## API

The backend server will be where you'll be getting your data. 

For the full docs on the API, start the backend server and navigate to the root (very likely to be `localhost:5000`, the exact url will be printed when you run the backend, see backend/README.md for more info). You'll see all the endpoints, descriptions and expected responses.

## Compatibility
This application should be compatible with 'modern' Chrome, Safari, and Mozilla browsers, assuming your browser has JavaScript enabled, and supports ES6 syntax.


## Getting Started
Clone the repository provided. It has a whole bunch of code, documentation, and a whole working server you'll need for
developing your frontend applicaiton.

Please read the relevant docs for setup in the folders `/backend` and `/frontend` of the provided repository.
Each folder outlines basic steps to get started. There are also some comments provided in the frontend source code.

**Feed Interface** 

The application will present a "feed" of user content on the home page derived from the sample feed.json provided.
The posts will be displayed in reverse chronological order (most recent posts first). 


Each post includes:
1. who the post was made by (must include `data-id-author`)
2. when it was posted
3. The image itself, if there is one present
4. How many upvotes it has (or none) (must include `data-id-upvotes`)
5. The post title (must include `data-id-title`)
6. The post description text
7. How many comments the post has
8. What suseddit this was posted to i,e `/s/meme`


