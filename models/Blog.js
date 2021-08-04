const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        body: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: Array,
            required: true,
        },
        image: {
            type: String,
        },
        likes: {
            type: Number
        }
    }, { timestamps: true }
)

module.exports = mongoose.model("Blog", blogSchema)