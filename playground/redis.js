/*          test redis instance            */

// strings
redisClient.set('test', 'it is working fine');
redisClient.get('test', console.log);

// hash
redisClient.hset('germen', 'red', 'rot');
redisClient.hget('germen', 'red', console.log);

// storing objects
redisClient.set('myObj', JSON.stringify({name: 'Mahmoud', age: 25}));
redisClient.get('myObj', (err, val) => console.log(JSON.parse(val)));

// set expiration time
redisClient.set('myKey', 'myValue', 'EX', 5); // expires after  5 seconds
redisClient.get('myKey');