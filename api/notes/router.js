const express = require('express')
const {Notes} = require('../one-to-many/model') 
const {restrict} = require('../auth/middleware')
const {validateNote} = require('./middleware')

const router = express.Router();

router.get('/',restrict,async (req,res,next)=>{
    try {
        const notes = await Notes.find({user: req.decoded.id}).exec();
        res.status(200).json({notes});
    } catch (error) {
        next(error)
    }
});


router.post('/',validateNote,restrict,async(req,res,next)=>{
    try {
        const{title,content}=req.body;
        const userId = req.decoded.id;
        const addedNote = await new Notes({title,content,user:userId}).save();
        res.status(201).json(addedNote)
    } catch (error) {
        next(error)
    }
})

 
router.get('/:noteId',restrict,async(req,res,next)=>{
    try {
        const foundNote = await Notes.findOne({
            _id: req.params.noteId,
            user:req.decoded.id,
        }).exec();
        if(!foundNote){
            return res.status(404).json({message:'Not found'})
        }
        return res.status(200).json(foundNote);
    } catch (error) {
        next(error)
    }
})

router.put('/:noteId',validateNote,restrict,async(req,res,next)=>{
    const cleanedBody = Object.keys(req.body).reduce((acc, curr) => {
        if (req.body[curr] && curr !== 'user') {
          acc[curr] = req.body[curr];
        }
        return acc;
    },{});

    try {
        await Notes.findOneAndUpdate(
            {
                _id: req.params.noteId,
                user:req.decoded.id,
            },
            cleanedBody
        ).exec();

        res.status(201).json({message:'OK'});
    } catch (error) {
        next(error)
    }
})


router.delete('/:noteId',validateNote,restrict,async(req,res,next)=>{
    try { 
        const deletedNote =await Notes.findOneAndDelete({
            _id: req.params.noteId,
            user: req.decoded.id,
        }).exec();
        res.status(200).json(deletedNote)
    } catch (error) {
        
    }
})

module.exports = router;