require("dotenv").config()
const express = require("express")
const signupRouter = require("./routes/signup")
const bodyParser = require("body-parser")

const app = express()
// const PORT = process.env.Port || 5000

app.use(bodyParser.json())

app.use("/user",signupRouter)

app.listen(process.env.PORT, ()=>{
  // console.log(`Server is runnig on: http://localhost:${PORT}`);
  console.log(`Server is runnig on: http://localhost:${process.env.PORT}`);
})