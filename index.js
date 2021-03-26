const dotenv = require('dotenv') 
dotenv.config();
const express = require('express');
const mongoose = require('mongoose'); 
const cookieParser = require('cookie-parser');
const cors = require('cors')

mongoose.connect(`mongodb+srv://${process.env.USER_USERNAME}:${process.env.USER_PASSWORD}@cluster0.rc96j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

const OneToManyRouter = require('./api/one-to-many/router.js')
const authRouter = require('./api/auth/router') 
const notesRouter = require('./api/notes/router')

const server = express();
 
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use('/api/auth' , authRouter  )
server.use('/api/notes', notesRouter);
//server.use('/api/notes' , OneToManyRouter  )

  
server.get('/', (req, res) => { 
  res.send(`<h1>Welcome to notes app</h1>`);
});

server.use((err,req,res,next)=>{
  console.log(err)
  res.status(500).json({message:'Something went wrong !'})
  
})

server.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});  


module.exports = server 