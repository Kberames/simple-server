// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Define routes.
// Login route

// Handles GET  for login route
router.get ('/login', function (request, response) { // sets route to /user/login

    // Test session data
    //console.log ('This is my session: ', request.session);

    // Check to see if the user session exists and
    // the user is defined.
    if (request.session.user) {
        // Redirect to the dashboard.
        response.redirect ('/user/dashboard');
    }
    else {
        response.render ('login'); // brings up the login.hbs markpup
    }
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
                response.send ('*** database error ***');
            }
            else if (result != null) {
                // Logon successful

                // Save the user to the session
                console.log ('This is the found user: ', result);

                request.session.user = {  // save only the necessary user info
                    username: result.username,
                    email: result.email
                };
                console.log ('This is the session data: ', request.session);

                response.redirect ('/user/dashboard');
            }
            else {
                console.warn ('*** Invalid username and password. ***');
            }

        }
    );

});

// Handles GET for register route
router.get ('/register', function (request, response) {
    //console.log ('Register user');
    response.render ('register'); // brings up the register.hbs markpup
});

// Handles POST for register route
router.post ('/register', function (request, response) {
    //console.log ('Login working... username: ' + request.body.username);

    db.collection ('users').insertOne (
        {
            username: request.body.username,
            password: request.body.password,
            email:    request.body.email
        },

        // Additional query options
        {
            //maxTimeMS: 1
        },

        // Callback function
        function (error, result) {
            console.log ('This is the result of the insert: ', result);
            console.log ('error : ', error);

            if (error) {
                console.error ('*** ERROR: Unable to connect to the database. ***');
                response.send ('*** database error ***');
            }

            else if (result != null) {
                // Logon successful
                response.redirect ('/');
            }
            else {
                console.warn ('*** Error registering user. ***');
            }


        }
    );

});

// Handles GET  for dashboard route
router.get ('/dashboard', function (request, response) { // sets route to /user/dashboard
    //response.send ('You are now on the dashboard page.');

    if (request.session.user) {
        response.render ('dashboard', {
            data: {
                // Pass the session user to the template for
                // rendering the user info.
                user: request.session.user
            }
        });

        //console.log ('session: ', request.session);

    }
    else {
        response.redirect ('/user/login');        
    }

});

// Handles GET  for logout route
router.get ('/logout', function (request, response) { // sets route to /user/dashboard
    request.session.destroy();
    //console.log ('session logout: ', request.session);
    response.redirect ('/user/login');
});

// Export the router from this module.
module.exports = router;
