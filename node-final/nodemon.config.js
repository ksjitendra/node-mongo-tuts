

module.exports = {
    script: 'app.js', // Entry point of your Node.js application
    ext: 'js yaml',   // Watched file extensions
    ignore: ['node_modules/', 'logs/'], // Ignored directories
    delay: 1000      // Delay before restarting the application (in milliseconds)
  };
  