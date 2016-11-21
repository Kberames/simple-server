// Load in the express nodejs module (framework).
var express = require ('express');

// Create the express server app (instance of express).
var server = express ();

// Set the port that our server will run on.
var port = 3000;

// Configure the render engine handlebars.
var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars({
    layoutsDir: 'templates',                // The directory of layout files.
    //partialsDir: '/templates/partials',      // The directory for partial files.
    defaultLayout: 'index',                 // The base/main template to always load.
    extname: '.hbs'                         // The file extension to use.
}));

// Set the default directory for express to use for
// the handlebar templates.
server.set ('views', __dirname + '\\templates\\partials');

// Set the render engine for our server.
server.set ('view engine', '.hbs');

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

    //response.send ('<h2>Hello World!</h2>');

    // Have express render out the string/text markup response
    // that will go to the client.
    response.render ('home');

});

// About route
server.get ('/about', function (request, response) {
    response.render ('about');
});
