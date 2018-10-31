// 3rd party libraries
const express = require('express');

// own files
const blogController    = require('./blog.controller'),
      clearCache        = require('../../../../middlewares/clearCache');    


// create blog router
const blogRouter = express.Router();

// define routes
blogRouter.route('/')
    .get(blogController.getAll)
    .post(clearCache, blogController.create);


module.exports = blogRouter;