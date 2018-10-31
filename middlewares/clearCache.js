const {clearCache} = require('../server/database/mongoose');

module.exports = async (req, res, next) => {
    
    // trick to make it run after the request
    // to ensure that the data created successfully first
    // then wipe out the cache

    await next();

    const {user_id} = req.query; 
    clearCache({key: user_id});

}