// Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

// Grab the schema object from mongoose.
var Schema = mongoose.Schema;

// Create a schema for the User.
var userSchema = new Schema ({
    username: String,
    password: String
});

// Take the userSchema object and create a
// user model object for working with the mongodb.
var User = mongoose.model ('User', userSchema);

// Make my User object available to other nodejs modules.
module.exports = User;
