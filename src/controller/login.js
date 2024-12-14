const bcrypt = require("bcrypt")
const User = require("../models/User")
const {generateToken, verifyToken, generateRefreshToken} = require("../utils/jwtUtil")

async function login(req,res) {
  try{
    const {email,password} = req.body
    const existingUser = await User.findOne({email})
    
    if(!existingUser){
      throw Error("User not found.")
    }

    const isPasswordValid = await bcrypt.compare(password,existingUser.password)

    if(!isPasswordValid){
      throw Error("Incorrect password.")
    }

    const token = generateToken(existingUser)

    res.status(200).json({message: "Login successfully.", token:token, user:existingUser})

  }catch(error){
    console.log(error.message);    
    res.status(401).json({message: "Invalid credentials."})
  }
}

async function refreshToken(req,res) {
  try{
    const {oldToken} = req.body
    const decodeToken = verifyToken(oldToken)
    const existingUser = await User.findById(decodeToken.id)
    
    if(!existingUser){
      throw Error("User not found.")
    }

    const newToken = generateRefreshToken(existingUser)
    res.status(200).json({message: "Refresh token created successfully.", token:newToken, user:existingUser})

  }catch(error){
    console.log(error.message);    
    res.status(401).json({message: "Invalid token."})
  }
}

module.exports = {login, refreshToken}