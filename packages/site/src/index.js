const express = require('express');
const path = require('path');

const app = express();
// eslint-disable-next-line n/no-process-env
const port = process.env.PORT || 8000;
app.use(express.json());
// Your static pre-build assets folder
app.use(express.static(path.join(__dirname, '..', 'public')));
// Root Redirects to the pre-build assets
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public'));
});
// Any Page Redirects to the pre-build assets folder index.html that // will load the react app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});
app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
