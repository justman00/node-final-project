const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
const {User} = require('../one-to-many/model')
const {validateUser,restrict} = require('./middleware')

const router = express.Router();
  
//6055d4f74d9697037856210d 
router.post('/register' ,validateUser,async (req,res,next)=>{
    const {email,password} = req.body;
    try{
        const newUser = await new User({
            email,
            password:await bcrypt.hash(password,14),
        }).save();

        res.status(201).json({message:'OK', userId: newUser._id});
    }catch(error){ 
        next(error);
    }
});

router.post('/login',validateUser,async(req,res,next)=>{
    const {email,password} = req.body;

    const foundUser = await User.findOne({email}).exec()

    if(!foundUser){
        return res.status(401).json({message:'Invalid credentials'});

    }
    const passwordValid = await bcrypt.compare(password,foundUser.password);

    if(!passwordValid){
        return res.status(401).json({message:'Invalid credentials'});
    }


    const token = jwt.sign({
        email:foundUser.email,
        id:foundUser._id,

    },
        process.env.JWT_SECRET,
        {
            expiresIn: 1000 *60 * 60 * 24 * 7,//o saptamina 
        }
    );
    
    res.status(200).json({token});
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');

    res.status(200).json({message:'OK'});
})

router.get('/check-auth',restrict ,(req,res)=>{
    res.status(200).json({message:'OK'})
})

module.exports=router