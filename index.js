const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to notes app</h1>`);
});

server.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
