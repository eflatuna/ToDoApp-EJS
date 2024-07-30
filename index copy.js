'use strict'

// npm i express dotenv
// npm i express-async-error // async func. error control
// npm install sequelize sqlite3

const express = require('express')
// const { Sequelize } = require('sequelize')
const app = express()

require("express-async-error")

require('dotenv').config()
const PORT=process.env?.PORT ||  8000
const HOST=process.env?.HOST || '127.0.0.1'

// app.all('/',(req, res)=>{
//     res.send('TODO APP')
// })

/*
app.use('/todo',(req, res)=>{ // TODO + ALL url
    res.send('TODO APP')
})
*/
// json to obj  and obj to json 
app.use(express.json())

//? express to DB connection
//https://sequelize.org/docs/v6/getting-started/

const {Sequelize, DataTypes}=require('sequelize')
//const sequelize=new Sequelize('RDB_name:adress')
const sequelize=new Sequelize('sqlite:./db.sqlite3')

//? create MODEL
// const Todo=sequelize.define('table / model name',{'model details'})
const Todo=sequelize.define('todos',{

    
    // fieldName:{
    //     type:DataTypes.BIGINT,
    //     primaryKey:true,    // deafult false
    //     unique:true,        // default false
    //     autoIncrement:true, // default false
    //     allowNull:false,    // default true 
    //     comment:'my comment',
    //     field:'custom name',
    //     defaultValue:'default value'
    // }
    
    //id:{}   // id field auto generated
    title:{
        type:DataTypes.STRING,
        allowNull:false

    },
    description: DataTypes.TEXT,  // just type 
    // description:{
    //     type:DataTypes.TEXT,  
    //     },
    priority:{ 
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:0 // -1: low, 0: Normal, 1 High
    },

    isDone:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        // allowNull:false
    }
    // createdDate & updatedDate auto generated
    // createdDate:{ type:DataTypes.DATE }
    // updateddDate:{ type:DataTypes.DATE }
})

// sequelize.sync() //! run once 
// sequelize.sync({force:true}) // DROP tables then CREATE tables
// sequelize.sync({alter:true}) // BACKUP DB then DROP tables then CREATE tables then RECOVER

sequelize.authenticate() // connect to db
    .then(()=>console.log('Todo DB connected'))
    .catch(()=>console.log('Todo DB NOT connected'))

//? CRUD operations

const router=express.Router()

// LIST todos (all)
router.get('/todos', async (req,res)=>{

    // const data=  await Todo.findAll()
    const data=  await Todo.findAndCountAll()
    //res.sendStatus(200)
    res.status(200).send({
        error:false,
        data:data    
    })
})
// CREATE todo
router.post('/todos', async (req,res)=>{

    // console.log(req.body);
    // const data=  await Todo.create({
    //     title: "task 1",
    //     description: "description for task 1",
    //     priority: -1,
    //     isDone:true
        
    // })
    const data=  await Todo.create(req.body)

    res.status(201).send({
        error:false,
        data:data    
    })
})

// READ todo  (with id)
router.get('/todos/:id', async (req,res)=>{

    // const data=  await Todo.findOne({where:{id:req.params.id}})    
    const data=  await Todo.findByPk(req.params.id)
        res.status(200).send({
            error:false,
            data:data    
        })
    
})
// UPDATE todo
router.put('/todos/:id', async (req,res)=>{
    let updatedDataBefore=await Todo.findByPk(req.params.id)
    const data=  await Todo.update(req.body ,{where:{id:req.params.id}})
   
    let updatedDataNext

    if (data==1){
         updatedDataNext=  await Todo.findByPk(req.params.id)
    }
    res.status(201).send({
        error:false,
        data:data,// data:data key value eşit ise
       
        updatedDataBefore,
        updatedDataNext
    })
})
// DELETE todo
router.delete('/todos/:id', async (req,res)=>{

    const data=  await Todo.destroy({where:{id:req.params.id}})
    console.log('****');

    console.log(data);
    res.status(204).send({
        error:false,
        data
    })
})

app.use(router)
// error control
const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res?.errorStatusCode || 500
    res.status(errorStatusCode).send({
        error: true,
        status: false,
        message: err.message,
        // cause: err.cause,
        // stack: err.stack
    })
}
app.use(errorHandler)

app.listen(PORT,()=>console.log(`server runned http://${HOST}:${PORT}`))

