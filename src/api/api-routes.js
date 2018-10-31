// 3rd party libraries
const express = require('express');

// own files
const blogRouter = require('./resources/blog/blog.router');

// create rest router
const restRouter = express.Router();

// register rest routes
restRouter.use('/blogs', blogRouter);


module.exports = restRouter;