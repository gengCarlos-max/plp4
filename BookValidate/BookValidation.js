const {body, param,validationResult} =require('express-validator');

//chech validation
function BodyValidator(req,res,next) {
    const error = validationResult(req)
    if(!error.isEmpty())
        return res.status(400).json({
    error:error.array()})

    next()
}
//manyBook and oneBook

//oneBook

const oneBook = [
    body('BookName'),
    body('countInStock'),
    body('price'),
    body('image')
];

//many Book
const manyBook=[
    body('*.BookName'),
    body('*.countInStock'),
    body('*.price'),
    body('*.image')
]
function chooseBookValidator(req,res,next){
    const data = req.body

    if(Array.isArray(data)){
        return manyBook[0](req,res,()=>{
            manyBook[1](req,res,()=>{
                manyBook[2](req,res,()=>{
                    manyBook[3](req,res,next);
                })
            })
        })
    }
    return oneBook[0](req,res,()=>{
    oneBook[1](req,res,()=>{
        oneBook[2](req,res,()=>{
            oneBook[3](req,res,next);
        })
    })
})
}
//id Validator

const bookId=[
    param('id')
        .isMongoId()
        .withMessage((value, req) => req.t("invalidBookId"))
        
]

module.exports={
    BodyValidator,
    oneBook,
    manyBook,
    bookId,
    chooseBookValidator
}