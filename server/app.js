const express = require('express');



const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })
);

app.use(bodyParser.json());

app.use(morgan('dev'));



let todoAr = [{

        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {

        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {

        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

let counter = 0;

        app.get('/', function   (req, res) {

    res.status(200).json();
});

app.get('/api/TodoItems',   (req, res) => {
    res.status(200).send(todoAr);
});

app.get('/api/TodoItems/:id',    (req, res) => {
    let num = req.params.id;

    for (var i = 0; i < todoAr.length; i++) {
        if (todoAr[i].todoItemId == num) {
            res.status(200).send(todoAr[i]);
        }
    };
});

app.delete('/api/TodoItems/:id', function(req, res) {

    let deleteObj = [];

    const deleteNum = req.params.id;

    for (i = 0; i < todoAr.length; i++) {

        if (deleteNum == todoAr[i].todoItemId) {

            deleteObj = todoAr.splice(i, 1);
      
        }

    };

    
    res.status(200).send(deleteObj[0]);

});

app.post('/api/TodoItems/', (req, res) => {

    const newTodo = {

        todoItemId: counter,


        name: req.body.name,

        priority: req.body.priority,

        completed: req.body.completed
    };

    todoAr.push(newTodo);

    counter++;

    res.status(201).send(newTodo);
});

module.exports = app;
