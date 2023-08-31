const sharp = require('sharp');
const fs = require('fs');

// Read the image file into a buffer
const inputFile = 'input.jpg';
const inputBuffer = fs.readFileSync(inputFile);

// Resize the image using the sharp library
const resizedBuffer = await sharp(inputBuffer)
  .resize(800, 600)
  .toBuffer();

// Write the resized image buffer to a new file
const outputFile = 'output.jpg';
fs.writeFileSync(outputFile, resizedBuffer);

console.log('Image resized and saved successfully.');

// In this example, we first read the image file (input.jpg) and store its contents in an input buffer using fs.readFileSync(). Then, we use the sharp library to resize the image. The resize() function is called with the desired width and height (800 and 600, respectively) to resize the image. The toBuffer() function is then used to obtain the resized image as a buffer.

// Finally, we write the resized image buffer to a new file (output.jpg) using fs.writeFileSync(). You can replace the input and output filenames with your own image files.

// Make sure you have the sharp library installed before running this code by executing npm install sharp in your project directory.