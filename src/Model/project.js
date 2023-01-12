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
        tasks = tasks.filter(task => task.getId() !== taskToRemove.getId())
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
    const setFirstProjectAsCurrent = () => {
        currentProjectId = projects[0] ? projects[0].getId() : null
    }
    const getProjects = () => {
        return projects;
    }
    const addProjectToList = (project) => {
        projects.push(project)
    }
    const deleteProject = (projectToRemove) => {
        projects = projects.filter(project => project.getId() !== projectToRemove.getId())
        setFirstProjectAsCurrent()
    }
    const setProjectAsCurrent = (project) => {
        currentProjectId=project.getId()
    }
    const getCurrentProject = () => {
        return projects.filter(project => project.getId() === currentProjectId)[0]
    }
    return {deleteProject,setProjectAsCurrent,getProjects, addProjectToList, getCurrentProject}
})()