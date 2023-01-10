import uniqid from 'uniqid';

export const projectFactory = (title) => {
    let tasks = [];
    const id = uniqid('project-');
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
    const getId = () => {
        return id;
    }

    return { getTitle, setTitle, addTask, removeTask, getAllTasks, getId }
}

export const projectList = (() => {
    let projects = []
    let currentProjectId;
    const getProjects = () => {
        return projects;
    }
    const addProjectToList = (project) => {
        projects.push(project)
    }
    const setProjectAsCurrent = (project) => {
        currentProjectId=project.getId()
    }
    const getFirstTodo = () => {
        return projects[0].getAllTasks()[0].getTitle()
    }
    const getCurrentProject = () => {
        return projects.filter(project => project.getId() === currentProjectId)[0]
    }
    return {setProjectAsCurrent,getProjects, addProjectToList, getFirstTodo, getCurrentProject}
})()