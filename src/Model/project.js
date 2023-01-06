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
        return tasks
    }

    return { getTitle, setTitle, addTask, removeTask, getAllTasks }
}

export const projectList = (() => {
    let projects = []
    const getProjects = () => {
        return projects[0];
    }
    const addProjectToList = (project) => {
        projects.push(project)
    }
    const getFirstTodo = () => {
        return projects[0].getAllTasks()[0].getTitle()
    }
    return {getProjects, addProjectToList, getFirstTodo}
})()