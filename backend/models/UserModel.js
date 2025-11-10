const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require:[true, "Please add a name"]
    },
    email:{
        type:String,
        require:[true, "please add an email"]
    },
    password:{
        type:String,
        require:[true,"please provide your password"]
    },
    photo:{
        type:String,
        require:[true,"please upload your profile picture"],
        default:"",
    },
    role:{
        type:String,
        enum:["admin","seller","buyer"],
        default:"buyer"
    },
    commissionBalance:{
        type:String,
        default:0.0
    },
    balance:{
        type:Number,
        default:0.0
    },
 },
 {timeStamp: true}

);

const User= mongoose.model("User",userSchema);
module.exports =User;