// Bring in express.
var express = require ('express');

// Create an express router.
var router = express.Router ();

// Load the userSchema object.
var User = require ('../model/user.js');

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
                // Problem with login credentials
                console.warn ('*** Invalid username and password. ***');

                request.flash ('error', 'Your username or password is not correct');
                response.redirect ('/user/login');
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

router.get ('/test', function (request, response){
    // Now that we have our model, we will try
    // to create a new user object based on the
    // model.
    var newUser = User ({
        username: 'bob'
    });

    // Save the new user to the database.
    newUser.save (function (error) {
        if (error) {
            console.error ('*** ERROR: Unable to save the user.');
            console.error(error);
        }
        else {
            console.log('User was successfully saved to db: ', newUser);

            // Run a query to find a User object.
            User.find ({ username: 'ronbravo'}, function (error, foundUser){
                if (error) {
                    console.error ('*** ERROR: Unable to find the user.');
                    console.error (error);
                }
                else {
                    console.log('User found: ', foundUser);
                }
            })

            // Run a query where we search by the user object id.
            // Used id for user 'tom' in my sample_database
            User.findById ('5834cf66772dcd1cacd4243d', function (error, foundUser) {
                if (error) {
                    console.error ('*** ERROR: Unable to find the user by id.');
                    console.error (error);
                }
                else {
                    console.log('User found by id: ', foundUser);
                }
            })
        }
    })
    console.log('This is the userSchema object', User);
});

// Export the router from this module.
module.exports = router;
