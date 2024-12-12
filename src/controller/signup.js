const User = require("../models/User")
const bcrypt = require("bcrypt")

async function createUser(req,res) {
  try{
    const{name,mail,password} = req.body
    
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
      name,
      mail,
      password: hashedPassword,
      role: "customer"
    })

    const savedUser = await newUser.save()
    res.status(201).json({message: "User created succesfully", user: savedUser})

  }catch(error){
    res.status(400).json({error:error.message})
  }
}

module.exports = {createUser}