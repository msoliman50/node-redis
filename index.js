// 3rd party libraries
const express       = require('express'),
      bodyParser    = require('body-parser');

// own files
const env               = require('./config/config'), 
      redisClient       = require('./server/caching/redis'),
      {mongoose}          = require('./server/database/mongoose'),
      restRouter        = require('./src/api/api-routes');
    

// create express server
const app = express();

// configure the app
app.use(bodyParser.json());
// configure express app
const PORT = process.env.PORT;

// rest app routes
app.use('/api', restRouter);

// bind app to port
app.listen(PORT, () => console.log(`Application is up and running in ${env} mode on port ${PORT}`));