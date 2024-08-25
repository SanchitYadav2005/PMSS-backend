const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthoritySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
    uniqure: true,
  },
});

module.exports = mongoose.model("Authority", AuthoritySchema);
