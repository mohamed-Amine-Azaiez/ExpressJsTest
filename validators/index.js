const validateTask = (task) => {
    // check if the task's title or description is missing or empty
    if (!task.title || !task.description) {
        throw new Error('Title and description are required');
    }
};

module.exports = { validateTask };