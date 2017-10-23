var mongoose = require("mongoose")
var Schema = mongoose.Schema

var WordSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  tfidf: Number
})

module.exports = mongoose.model("WordSchema", WordSchema)
