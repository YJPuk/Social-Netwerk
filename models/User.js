const { Schema, model } = require('mongoose');
const thoughtSchema = require("./Thought");

//User Schema
const userSchema = new Schema({
username: { 
    type: String, 
    unique: [true, "This username is already registered!"], 
    required: [true,"Please provide a valid username!"], 
    trim: true 
},
email: {
    type: String,
    unique: [true, "This email is already registered!"], 
    required:[true,"Please provide an email address!"], 
    //email validation, can use multiple ways but I went with this one
    match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address!",
    ],
    },
thoughts: [{
    type: Schema.Types.ObjectId,
    ref: "Thought",
},],
friends: [{
    type: Schema.Types.ObjectId,
    ref: "User",
},],
},
{
    toJSON: {
    virtuals: true
    },
    id:false,
}
);

//Virtual property to count user's friends
userSchema.virtual("friendCount").get(function(){
return this.friends.length;
});

//Initializing User model 
const User = model("User", userSchema);

//Export User model
module.exports = User;