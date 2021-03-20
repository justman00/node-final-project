const server = require("./api/server");
//deploy 
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n*** Server is running on http://localhost:${port} ***\n`);
});
