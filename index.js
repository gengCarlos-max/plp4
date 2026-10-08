const express = require('express');
const app = express();
const i18next=require('i18next');
const backend=require('i18next-fs-backend');
const middleware=require('i18next-http-middleware');
const mongoose = require('mongoose');
require('dotenv').config();
const port = 2026;
const BookRouters= require('./Router/BookRouters');

//middleware
app.use(express.json())


//i18next
i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng:'en',
        backend:{
            loadPath:'./locales/{{lng}}.json'
        }
    })

app.use(middleware.handle(i18next))


//connection rout
app.use(BookRouters);

//port
app.listen(port,()=>{
    console.log(`App listening on ${port}`)
})