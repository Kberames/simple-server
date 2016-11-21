// Load in the express nodejs module (framework).
var express = require ('express');

// Create the express server app (instance of express).
var server = express ();

// Set the port that our server will run on.
var port = 3000;

//Launch the server app.
server.listen (port, function (error){
    // Check to see if the server was unable to startup
    if (error !== undefined) {
        console.error('*** ERROR: Unable to start the server.');
        console.log (error);
        }
    else {
        console.log (' - The server has successfully started on port: ' + port)
    }
});

//---------------------------------------
// Set the url routes the server can use.

// Home or root route.
server.get ('/', function (request, response){

    // The response object is used to send responses back to the user
    // who made the request.
    response.send (<h2>'Hello World!'</h2>);
});
;
