const fs = require('fs');
const express = require('express');
const app = express();

// Route to handle uploading an image
app.post('/upload', (req, res) => {
  const imageBuffer = req.body.image; // Assuming the image data is received in the request body
  const imageName = req.body.name; // Assuming the image name is received in the request body

  // Creating a buffer from the received image data
  const buffer = Buffer.from(imageBuffer, 'base64');

  // Saving the image buffer to a file
  fs.writeFile(`images/${imageName}.jpg`, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred while saving the image.');
    } else {
      res.status(200).send('Image uploaded successfully.');
    }
  });
});

// Route to handle fetching and sending an image
app.get('/image/:name', (req, res) => {
  const imageName = req.params.name;

  // Reading the image file as a buffer
  fs.readFile(`images/${imageName}.jpg`, (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send('Image not found.');
    } else {
      const imageBuffer = Buffer.from(data);
      const base64Image = imageBuffer.toString('base64');
      res.send(base64Image);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// In this example, we have two routes: /upload for uploading an image and /image/:name for fetching and sending an image. The image data is received as a base64-encoded string in the request body. Here's how the Buffer class is used:

// When receiving an image in the /upload route, we create a Buffer from the base64-encoded image data using Buffer.from().
// The image buffer is then saved to a file using fs.writeFile(). Here, the Buffer class allows us to handle and write the binary image data to the file system.
// When fetching an image in the /image/:name route, we read the image file as a buffer using fs.readFile().
// The image buffer is converted to a base64-encoded string using Buffer.toString(), allowing us to send the image data as a response to the client.
// The Buffer class facilitates the efficient handling and manipulation of binary image data in this scenario, allowing for the uploading, saving, reading, and sending of images in a cab booking and food ordering app backend.