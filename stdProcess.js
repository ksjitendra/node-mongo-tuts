const http = require('http');
const port = 3001;

const server = http.createServer((req, res) => {
  // Request handling logic goes here
});


// Node.js program to demonstrate the 
// process.stdin Property 
  
// Enter any texts ( User input)
process.stdin.on('data', data => {
    console.log(`You typed ${data.toString()}`);
    process.exit();
  });

server.listen(port, (err) => {
  if (err) {
    console.log('Error occurred while starting the server:', err);
  } else {
    console.log('Server is listening on port', port);
  }
});
