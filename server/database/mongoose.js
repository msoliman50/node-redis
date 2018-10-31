// 3rd party libraries
const mongoose      = require('mongoose'),
      redisClient   = require('../caching/redis');
      
// copy the original exec function
const exec = mongoose.Query.prototype.exec;

// add our own function for caching capability
mongoose.Query.prototype.cache = function(options = {}) {
    this.applyCache = true;
    this.hashKey = JSON.stringify(options.key || 'default');
    return this;
}

// override exec function
mongoose.Query.prototype.exec = async function() {

    // check if we need to cache or not
    if (!this.applyCache) {
        return exec.apply(this, arguments);
    }

    // get caching unique and consistent key
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {collection: this.mongooseCollection.name})
    );

    // check if we have cached value for that key
    const cahcedValue = await redisClient.hgetAsync(this.hashKey, key);

    if (cahcedValue) {
        console.log('from cache');

        // this value is a plain javaScript object(s), So we need to parse it/them to
        // mongoose model instance(s)

        const result = JSON.parse(cahcedValue);

        // check if the result is an array of object or single object
        return Array.isArray(result)
                ? result.map(r => new this.model(r)) // if array objects parse them to array of model instances
                : new this.model(result); // if single object parse it to model instance
    }

    // else get data from database
    const result = await exec.apply(this, arguments);
    console.log('from DB');


    // store it in the cache
    redisClient.hset(this.hashKey, key, JSON.stringify(result));

    return result;
}

// configure mongoose
mongoose.Promise = global.Promise;

// connect to the database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

module.exports = {
    mongoose,
    clearCache(options = {}) { // to clear cached data for specific key
        const key = JSON.stringify(options.key || 'default');
        redisClient.del(key);
    }
}