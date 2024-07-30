'use strict'
/*
    EXPRESSJS 
    ! TODO CONTROLLER
*/

const Todo=require('../models/todoModel')
//? CRUD operations

module.exports={
    list: async (req,res)=>{

        // const data=  await Todo.findAll()
        const data=  await Todo.findAndCountAll()
        //res.sendStatus(200)
        res.status(200).send({
            error:false,
            data:data    
        })
    },
    create:  async (req,res)=>{

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
    },
    get: async (req,res)=>{

        // const data=  await Todo.findOne({where:{id:req.params.id}})    
        const data=  await Todo.findByPk(req.params.id)
            res.status(200).send({
                error:false,
                data:data    
            })
        
    },
    update:async (req,res)=>{
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
    },
    delete:async (req,res)=>{

        const data=  await Todo.destroy({where:{id:req.params.id}})
        
        //console.log(data);
        if(data==1){
            // res.sendStatus(204)

            res.status(204).send({
                error:false,
                data
            })
        }else{
            // res.errorStatusCode=404
            throw new Error('not found tofo for delete')
        }      
    }
    // bekleyen tasklar
    //getUnclosedTask:

}

