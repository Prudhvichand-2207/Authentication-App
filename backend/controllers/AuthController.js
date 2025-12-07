const Usermodel = require("../models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const signup=async (req,res)=>{
    try{
    const {name,email,password}=req.body;
    const user=await Usermodel.findOne({email});
    if(user){
        return res.status(409)
        .json({message:'user is already exists,you can login',success:false})
    }
   const userModel=new Usermodel({name,email,password});
   userModel.password=await bcrypt.hash(password,10);
   await userModel.save();
   res.status(201)
   .json({
    message:"signup successfully",
    success:true
   })
    }
    catch(err){
res.status(500)
.json({
    message:"internal server error",
    success:false
})
    }
}

const login=async (req,res)=>{
    try{
    const {email,password}=req.body;
    const user=await Usermodel.findOne({email});
    const errMsg="auth failed email or password is wrong";
    if(!user){
        return res.status(403)
        .json({message:errMsg,success:false})
    }
   
    const isPassequal=await bcrypt.compare(password,user.password);
      
    if(!isPassequal){
        return res.status(403)
        .json({message:errMsg,success:false})
    }

    const jwtToken=jwt.sign({
        email:user.email,
        _id:user._id
    },
    process.env.JWT_SECRET,
    {expiresIn:'24h'}

)
    

   res.status(200)
   .json({
    message:"login successfully",
    success:true,
    jwtToken,
    email,
    name:user.name
   })
    }
    catch(err){
res.status(500)
.json({
    message:"internal server error",
    success:false
})
    }
}
module.exports={
    signup,login
}