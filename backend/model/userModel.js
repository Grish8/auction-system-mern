const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema =  mongoose.Schema(
    {
    name: {
        type:String,
        require:[true, "Please add a name"]
    },
    email:{
        type:String,
        require:[true, "please add an email"],
        unique:true,
        trim:true,
            match:[/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/, "Please enter a valid email"]
    },
    password:{
        type:String,
        require:[true,"please provide your password"],
        minLength:[6,"Password must be up to 6 characters"],
    },
    photo:{
        type:String,
        require:[true,"please upload your profile picture"],
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User= mongoose.model("User",userSchema);
module.exports = User;