const server = require("./api/server");

server.listen(process.env.PORT || 4000, () => {
  console.log("Server is running....");
  
});
