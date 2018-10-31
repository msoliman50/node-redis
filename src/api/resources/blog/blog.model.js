// 3rd party libraries
const mongoose = require('mongoose');

// get Schema instance
const Schema = mongoose.Schema;

// define blog schema
const blogSchema = new Schema({
    title: String,
    content: String,
    _user: Schema.Types.ObjectId
});

module.exports = mongoose.model('Blog', blogSchema);