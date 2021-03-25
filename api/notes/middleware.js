const validateNote = (req,res,next)=>{
    const {title,content}=req.body;

    if(!title || !content){
        return res.status(400).json({message:'Title or Content invalid'});

    }
    next();
} 

module.exports={validateNote}