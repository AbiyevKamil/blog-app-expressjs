const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    }
  }, { timestamps: true }
)

module.exports = mongoose.model("Token", tokenSchema)