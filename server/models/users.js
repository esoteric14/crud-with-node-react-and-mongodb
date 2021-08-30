const mongoose = require("mongoose");

const  UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;