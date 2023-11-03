const { validateTask } = require("../validators");

// initialize an array to store tasks and an ID counter
let tasks = [];
let taskId = 1;

// retrieve all tasks
const getAllTasks = (req, res) => {
    res.json(tasks);
}

// retrieve a task by its ID
const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

// create a new task
const createTask = (req, res) => {
    try {
        // create a new task object with the provided details
        const newTask = {
            id: taskId++,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed || false,
        };
        // validate the new task input
        validateTask(newTask);
        // add the new task to the tasks array
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        // if validation fails, handle the error
        res.status(400).json({ message: error.message });
    }
}

// update an existing task by its ID
const updateTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            // create an updated task object with the provided details
            const updatedTask = {
                id,
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed || false,
            };
            // validate the updated task
            validateTask(updatedTask);
            // update the task in the tasks array
            tasks[taskIndex] = updatedTask;
            res.json(updatedTask);
        } else {
            // if the task is not found, return a Not Found status
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        // if an error occurs during update, handle the error
        res.status(400).json({ message: error.message });
    }
}

// delete a task by its ID
const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;
    // remove the task with the provided ID from the tasks array
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length < initialLength) {
        // if the task was deleted, return a success message
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

// export all the functions
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
