const dbModel = require("../models/todoModel");


const getAllTodos = async(req, res)=>{
    try {
        const todos = await dbModel.find();
        res.status(200).json({
        success : true,
        todos
    })
    } catch (error) {
        res.status(501).json({
            success : false,
            err
        })
    }
}

const updateTodo = async(req, res)=>{
        try{
            const todo = await dbModel.create({
                "taskName" : req.body.taskName,
            });
        
            res.status(201).json({
                success : true,
                todo
            })
        }
        catch(err){
            res.status(501).json({
                success : false,
                err
            })
        }
    }

const getOne = async(req, res)=>{
    try {
        const todo = await dbModel.findById(req.params.id);
        res.status(200).json({
        success : true,
        todo
    })
    } catch (error) {
        res.status(501).json({
            success : false,
            err
        })
    }
}

const updateCompleted = async(req, res)=>{
    try {
        const id = req.params.id;
        const {isChecked} = req.body;

        const todo = await dbModel.updateOne({_id : id}, {completed : isChecked});
        return res.status(500).json({
            success : true,
            todo
        })
    } catch (error) {
        res.status(501).json({
            success : false,
            error
        })
    }
}

const uptodo = async(req, res)=>{
    try {
        const {id} = req.params;
        const {taskName} = req.body;

        const todo = await dbModel.updateOne({_id : id}, {taskName : taskName});
        res.status(200).json({
            success : true,
            todo
        })
    } catch (error) {
        res.status(502).json({
            success : false,
            error
        })
    }
}

const deleteTodo = async(req, res) =>{
    try {
        const {id} = req.params;

        const todo = await dbModel.deleteOne({_id : id});
        if(todo.deletedCount){
            return res.status(300).json({
                success : true,
                todo
            })
        }
        
        res.status(404).json({
            success : false,
            err : "todo not found"
        })
    
        
    } catch (error) {
        res.status(501).json({
            success : false,
            err:error.message
        });
    }
}

module.exports = {
    getAllTodos,
    updateTodo,
    getOne,
    updateCompleted,
    uptodo,
    deleteTodo
}