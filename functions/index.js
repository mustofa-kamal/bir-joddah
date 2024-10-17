// functions/index.js

const functions = require('firebase-functions');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  conf: { distDir: '.next' }, // Using default '.next' directory
  // root: path.join(__dirname, '../'), // Optional: specify root if needed
});
const handle = app.getRequestHandler();

exports.nextjsFunction = functions.https.onRequest(async (req, res) => {
  try {
    await app.prepare();
    handle(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});
