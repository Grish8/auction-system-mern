const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const {name,email,password} = req.body;


  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }

  if(!name || !email || !password){
      res.status(401);
      throw new Error('Please enter all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email address already exists");
  }

  const user = await User.create({
    name,
    email,
    password
  });
  const token = generateToken(user._id);
  res.cookie("token", token,{
    path:"/",
    httpOnly:true,
    expires:new Date(Date.now()+3*24*60*60*100),
    sameSite:'none',
    secure: true,
  }
  );

  if(user){
    const {_id,name,email,isAdmin} = user;
    res.status(201).json({_id, name , email , photo , role , token});
  }else{
    res.status(400);
    throw new Error("Invalid user data")
  }

});

module.exports = {
    registerUser
};