import { taskFactory } from "../Model/task";
import { hideAddTaskSection } from "../GUI/main-canvas";
import { refreshTodosList, removeTodoFromCanvas } from "../GUI/main-canvas";
import { appendProjectToProjectList, refreshTaskCounter, removeProjectFromList } from "../GUI/sidebar";
import { projectFactory, projectList } from "../Model/project";
import showHeader from '../GUI/header.js'
import showSidebar from '../GUI/sidebar.js'
import showFooter from '../GUI/footer.js'
import showMainCanvas from '../GUI/main-canvas'
import {showCurrentProjectsTasks, displayNewTaskOnList, showAddtodoButtonUnderProjectName} from '../GUI/main-canvas'

export function initialize() {
    // Default project and task setup for startup
    const defaultProject = projectFactory('Inbox')
    defaultProject.addTask(taskFactory("Do the laundry", 'whites', 'low', '01.01.2023', 'to do'))
    const anotherProject = projectFactory('Long term')
    projectList.addProjectToList(defaultProject)
    projectList.setProjectAsCurrent(defaultProject)
    projectList.addProjectToList(anotherProject)

    // Set up main element
    const content = document.createElement('div')
    content.id = 'content'
    document.body.appendChild(content)

    // Show GUI
    showHeader()
    showSidebar()
    showMainCanvas()
    showFooter()
}

export function addTodoToCurrentProject(newTask) {
    addTodoToProject(newTask, projectList.getCurrentProject())
}

export function addTodoToProject(todo, projectId){
    const project = projectList.getProjectById(projectId)
    console.log(projectId)
    console.log(project)
    project.addTask(todo)
    hideAddTaskSection()
    showAddtodoButtonUnderProjectName(project)
    displayNewTaskOnList(todo, project)
    refreshTaskCounter()
}

export function addProjectFromForm(projectTitle) {
    const newProject = projectFactory(projectTitle);
    projectList.addProjectToList(newProject)
    setProjectAsCurrent(newProject)
    appendProjectToProjectList(newProject)
}

export function setProjectAsCurrent(project) {
    projectList.setProjectAsCurrent(project)
    showCurrentProjectsTasks();
}

export function deleteProject(project) {
    projectList.deleteProject(project)
    removeProjectFromList(project.getId())
    refreshTodosList()
}

export function deleteTodo(task) {
    const allProjects = projectList.getProjects()
    allProjects.forEach(project => {
        const taskToDelete = project.getAllTasks().filter(taskToDelete => task.getId() === taskToDelete.getId())
        if(taskToDelete.length>0){
            project.removeTask(taskToDelete[0])
        }
    })
    removeTodoFromCanvas(task.getId())
    refreshTaskCounter()
}

export function toggleTaskStatus(task) {
    const allProjects = projectList.getProjects()
    allProjects.forEach(project => {
        const taskToUpdate = project.getAllTasks().filter(taskToUpdate => task.getId() === taskToUpdate.getId())
        if (taskToUpdate.length > 0) {
            taskToUpdate[0].toggleStatus()
        }
    })
    refreshTaskCounter()
}
export function editProjectFromForm(project, newTitle) {
    project.setTitle(newTitle)
}