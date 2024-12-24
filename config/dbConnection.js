const mongoose = require("mongoose")

module.exports = async (URL = process.env.MONGO_URL) => {
 await mongoose.connect(URL).then((value) => {
  console.log("connected");
 }).catch((err) => {
  console.log({ err })
 })
}