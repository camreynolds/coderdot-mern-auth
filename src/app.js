require("dotenv").config()
const express = require("express")
const signupRouter = require("./routes/signup")
const bodyParser = require("body-parser")

const app = express()
// const PORT = process.env.Port || 5000

// parse to json
app.use(bodyParser.json())

// middleware
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/user",signupRouter)

// server connection
app.listen(process.env.PORT, ()=>{
  // console.log(`Server is runnig on: http://localhost:${PORT}`);
  console.log(`Server is runnig on: http://localhost:${process.env.PORT}`);
})