// importing the express module and creating an Express application instance.
const express = require('express');
const app = express();

// importing the routes for tasks
const tasksRoute = require('./routes/tasks-route');

// parsing incoming request bodies as JSON
app.use(express.json());

//directing requests with path '/tasks' to the tasksRoute
app.use("/tasks", tasksRoute);

// Error handling middleware: If an error occurs in the application, it will be caught here
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// defining the port number where the server will listen for incoming requests
const PORT = 3005;

// start the server and listen on the specified PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
