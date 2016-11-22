// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Define routes.
// Login route

// Handles GET  for login route
router.get ('/login', function (request, response) { // sets route to /user/login
    response.render ('login'); // brings up the login.hbs markpup
});


// Handles POST for login route
router.post ('/login', function (request, response) {
    //console.log ('Login working... username: ' + request.body.username);

    db.collection ('users').findOne (
        {
            username: request.body.username,
            password: request.body.password
        },

        // Additional query options
        {
            //maxTimeMS: 1
        },

        // Callback function
        function (error, result) {
            console.log ('This is the result of the query: ', result);
            console.log ('error : ', error);

            if (error) {
                console.error ('*** ERROR: Unable to connect to the database. ***');
                response.send ('Server error');
            }
            else if (result != null) {
                // Logon successful
                response.redirect ('/post');
            }
            else {
                console.warn ('*** Invalid username and password. ***');
            }

        }
    );

});


// Export the router from this module.
module.exports = router;
