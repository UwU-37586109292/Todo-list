export const projectFactory = (title) => {
    let tasks = [];
    const getTitle = () => {
        return title;
    }
    const setTitle = (newTitle) => {
        if (newTitle) {
            title = newTitle;
        }
    }
    const addTask = (task) => {
        tasks.push(task)
    }
    const removeTask = (taskToRemove) => {
        tasks.filter(task => task !== taskToRemove)
    }
    const getAllTasks = () => {
        tasks.forEach(task => { console.log(task.getTitle()) })
    }


    return { getTitle, setTitle, addTask, removeTask, getAllTasks }
}