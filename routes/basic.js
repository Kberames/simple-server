// Pull in express to make use of the framework.
var express = require ('express');

// Grab the url router from express.
// Use this object to attact additional routes
// for our express service app.
var router = express.Router ();

// Home or root route.
router.get ('/', function (request, response){

    // The response object is used to send responses back to the user
    // who made the request.

    //response.send ('<h2>Hello World!</h2>');

    // Have express render out the string/text markup response
    // that will go to the client.
    response.render ('home');

});

// About route
router.get ('/about', function (request, response) {
    response.render ('about');
});

// Contacts route
router.get ('/contact', function (request, response) {
    response.render ('contact');
});

// FAQ route
router.get ('/faq', function (request, response) {
    response.render ('faq');
});

// Export the router from this file that is seen
// by NodeJs as it's own module.
module.exports = router;
