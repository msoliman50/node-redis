// get current enviornment mode
const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'testing') {
    
    // get env configurations
    const envConf = require('./env.json');

    // get current mode configurations
    const config = envConf[env];

    // set environment values
    for (const key of Object.keys(config)) {
        process.env[key] = config[key];
    }
}

module.exports = env;