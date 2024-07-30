'use strict'
/*
    EXPRESSJS 
    ! TODO PROJECT
*/

const express = require('express')
const app = express()

require('dotenv').config()
const PORT=process.env?.PORT ||  8000
const HOST=process.env?.HOST || '127.0.0.1'

//catch async-error  
require("express-async-errors")

// json to obj  and obj to json  
//! yeri onemli yukarıda kalsın
app.use(express.json())

// ROUTER
app.use(require('./src/routers/todoRouter'))

// errorHAndler
app.use(require('./src/middlewares/errorHandler') )

app.listen(PORT,()=>console.log(`server runned http://${HOST}:${PORT}`))

