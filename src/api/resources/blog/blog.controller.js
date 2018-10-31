// 3rd party libraries

// own files
const Blog          = require('./blog.model');

module.exports = {

    // get all blogs
    async getAll(req, res) {

        // get user_id
        const {user_id} = req.query;

        const blogs = await Blog
            .find({_user: user_id})
            .cache({key: user_id});
        return res.json({blogs});
    },

    // create blog
    async create(req, res) {

        const {title, content} = req.body;
        const {user_id} = req.query;

        await Blog.create({title, content, _user: user_id});

        res.json({message: 'created successfully'});
    }
}