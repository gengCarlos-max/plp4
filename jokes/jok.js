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
//Many BooK

const BookValidator=[
    body('*.BookName')
        .notEmpty()
        .withMessage('Book Name is reqiured')
        .isString()
        .withMessage('Book Name must be String')
        .isLength({min:5, max:20})
        .withMessage('Book name must be between 5 and 20 charecters'),

    body('*.countInStock')
        .notEmpty()
        .withMessage('countInStock Should not be Empty')
        .withMessage('countInStock must be interger')
        .isInt({min:1, max:20})
        .withMessage('Length must be between 1 and 20'),

    body('*.price')
        .notEmpty()
        .withMessage('price is required')
        .withMessage('Price amount is needed')
        .isFloat({min:100, max:1000})
        .withMessage('Price must be between 100 and 1000 dallors'),

    body('*.image')
        .notEmpty()
        .withMessage('image is needed')
        .isURL()
        .withMessage('URL must be Valide')
]
