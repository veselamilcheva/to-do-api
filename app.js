import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/todos', async (req, res) => {
    try {
        const results = await db.getTodos()
        
        res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos: results
        })
    } catch (error) {
        return res.status(404).send({
            success: 'false',
            message: 'todo does not exist',
            error
        });
    }
});

//get single todo
app.get('/api/v1/todos/:id', async (req, res) => {
    try {
        const results = await db.getTodo(req.params.id)
        
        if (results.length) {
            res.status(200).send({
                success: !!results.length,
                todos: results
            })
        } else {
            return res.status(404).send({
                success: false,
                message: 'Not found'
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'DB error'
        });
    }
});

//post todos
app.post('/api/v1/todos', async (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const todo = {
        title: req.body.title,
        description: req.body.description
    }
    try {
        const results = await db.postTodo(todo)
        
        res.status(200).send({
            success: !!results.insertId,
            id: results.insertId
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'DB error'
        });
    }
  });

  //delete single post
  app.delete('/api/v1/todos/:id', async (req, res) => {
    try {
        const results = await db.deleteTodo(req.params.id)
        
        res.status(!!results.affectedRows ? 200 : 404).send({
            success: !!results.affectedRows
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'DB error'
        });
    }    
  });

  //update todo
  app.put('/api/v1/todos/:id', async (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const todo = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description
    }  
    try {
        const results = await db.putTodo(todo)
        
        res.status(!!results.affectedRows ? 200 : 404).send({
            success: !!results.affectedRows
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'DB error'
        });
    }
  });

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
