const Redis = require('ioredis');
const redis = new Redis();

// Subscribe to the "__keyevent@0__:expired" channel
redis.subscribe('__keyevent@0__:expired', (err) => {
  if (err) {
    console.error('Failed to subscribe to Redis expired channel:', err);
    return;
  }
  console.log('Subscribed to Redis expired channel');
});

// Handle incoming messages
redis.on('message', (channel, message) => {
  if (channel === '__keyevent@0__:expired') {
    console.log('Key expired:', message);
    // Add your notification logic here
  }
});

// Set a key with expiration
redis.set('mykey', 'myvalue', 'EX', 60, (err) => {
  if (err) {
    console.error('Failed to set key in Redis:', err);
    return;
  }
  console.log('Key set with expiration');
});

// Wait for messages indefinitely
process.on('SIGINT', () => {
  redis.quit();
  process.exit();
});

// In this example, we create a Redis client using ioredis. We subscribe to the "__keyevent@0__:expired" channel, which is the Redis channel for expired key notifications.

// We handle incoming messages using the message event and check if the channel is the expired key channel. If so, we log the expired key and perform any desired notification logic at that point.

// To set a key with expiration, we use the set command with the 'EX' option to specify the expiration time in seconds. In this case, we set the key 'mykey' with a value of 'myvalue' and an expiration of 60 seconds.

// Finally, we listen for the SIGINT signal to gracefully exit the program, ensuring the Redis client is properly closed.

// Please note that Redis key expiration notifications require a properly configured Redis instance with the notify-keyspace-events configuration option set to include the "Ex" event type. For example, you can set it in the Redis configuration file (redis.conf) or via command line when starting the Redis server: