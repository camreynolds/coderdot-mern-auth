const mongoose = require("../configuration/dbConfig")

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {type: String, enum: ["admin","customer"], default:"customer"}
})

module.exports = mongoose.model("user",UserSchema)