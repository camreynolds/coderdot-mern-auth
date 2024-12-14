require("dotenv").config()
const express = require("express")
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const authenticateRoute = require("./routes/authenticated")
const bodyParser = require("body-parser")
const cors = require("cors")

// admin script
const {createAdminAccount} = require("./scripts/admin")
const { authenticateToken } = require("./utils/authMiddleware")

const app = express()
// const PORT = process.env.Port || 5000

// parse to json
app.use(bodyParser.json())

// middlewares
app.use(cors())

app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})

// create admin account
createAdminAccount()

// routes
app.use("/user",signupRoute)
app.use("/auth",loginRoute)
app.use("/api", authenticateRoute)

// server connection
app.listen(process.env.PORT, ()=>{
  // console.log(`Server is runnig on: http://localhost:${PORT}`);
  console.log(`Server is runnig on: http://localhost:${process.env.PORT}`);
})