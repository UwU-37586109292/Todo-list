import { projectList } from "../Model/project"
import { addProjectFromForm } from "../controller/app"
import { setProjectAsCurrent } from "../controller/app"
import { getMainElement } from "./common"
import { deleteProject } from "../controller/app"
import { editProjectFromForm } from "../controller/app"
import * as common from "./common"

export default function showSidebar() {
    const sidebar = document.createElement('aside')
    sidebar.id = 'project-list'
    sidebar.classList.add('flex', 'column')

    const wrapper = document.createElement('div')
    wrapper.classList.add('flex', 'justify-space-between', 'align-center', 'underline')

    const label = document.createElement('label')
    label.classList.add('label')
    label.innerText = 'Projects'

    wrapper.appendChild(label)
    appendAddProjectButton(wrapper)

    sidebar.appendChild(wrapper)

    appendAllProjects(sidebar)

    const mainContent = getMainElement()
    mainContent.appendChild(sidebar)
}

function appendAddProjectButton(element) {
    const addProjectButton = document.createElement('button')
    addProjectButton.classList.add('no-border', 'no-padding', 'addProjectBtn')
    addProjectButton.innerText = "+"
    addProjectButton.addEventListener('click', showAddProjectForm)
    element.appendChild(addProjectButton)
}

function showAddProjectForm() {
    if (!document.getElementById('projectForm')) {
        const form = createProjectForm('addProject')

        const saveButton = document.createElement('button')
        saveButton.setAttribute('type', 'submit')
        saveButton.appendChild(common.createSaveIcon())
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            addProjectFromForm(document.getElementById('projectTitle').value)
        })

        const discardButton = document.createElement('button')
        discardButton.setAttribute('type', 'reset')
        discardButton.appendChild(common.createDeleteIcon())
        form.addEventListener('reset', function () {
            hideAddProjectForm()
        })

        const buttonsWrapper = document.createElement('div')
        buttonsWrapper.classList.add('flex')
        buttonsWrapper.appendChild(saveButton)
        buttonsWrapper.appendChild(discardButton)

        form.appendChild(buttonsWrapper)

        document.getElementById('project-list').appendChild(form)
    }
}

function createProjectForm(formName) {
    const form = document.createElement('form')
    form.name = formName
    form.id = 'projectForm'
    form.classList.add('flex', 'justify-space-between')

    const inputProjectName = document.createElement('input')
    inputProjectName.setAttribute('type', 'text')
    inputProjectName.setAttribute('id', 'projectTitle')
    inputProjectName.setAttribute('name', 'projectTitle')
    inputProjectName.placeholder = 'Project name'
    inputProjectName.required = 'true'
    form.appendChild(inputProjectName)
    return form
}

export function hideAddProjectForm() {
    if(document.getElementById('projectForm'))
        document.getElementById('projectForm').remove()
}

function  appendAllProjects(sidebarElement) {
    const container = document.createElement('div')
    container.id = 'projects-wrapper'
    const projectsToDisplay = projectList.getProjects()
    if (projectsToDisplay.length > 0) {
        const listElement = document.createElement('ul')
        projectsToDisplay.forEach(project => {
            const currProjectWrapper = createProjectListElement(project)
            listElement.appendChild(currProjectWrapper)
        })
        container.appendChild(listElement)
    } else {
        appendProjectEmptyState(container)
    }
    sidebarElement.appendChild(container)
}

function createProjectListElement(project) {
    const currProjectWrapper = document.createElement('li')
    currProjectWrapper.classList.add('flex', 'align-center', 'justify-space-between')
    currProjectWrapper.appendChild(createProjectTagElement(project))

    const controlsWrapper = document.createElement('div')
    controlsWrapper.classList.add('flex')
    controlsWrapper.appendChild(createEditProjectButton(project))
    controlsWrapper.appendChild(createDeleteProjectButton(project))

    currProjectWrapper.appendChild(controlsWrapper)
    return currProjectWrapper
}

function createProjectTagElement(project) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('flex', 'align-center')

    const element = document.createElement('div')
    element.innerText = project.getTitle()
    element.addEventListener('click', function () {
        setProjectAsCurrent(project)
    })
    
    const taskCounter = document.createElement('div')
    taskCounter.innerText = project.getNumberOfTasksToBeDone()
    taskCounter.classList.add('task-counter')

    wrapper.appendChild(element)
    wrapper.appendChild(taskCounter)

    return wrapper
}

function createEditProjectButton(project) {
    const button = document.createElement('button')
    button.classList.add('edit')
    button.appendChild(common.createEditIcon())

    button.addEventListener('click', function(event){
        const projectItemWrapper = event.target.closest('li')
        const form = createProjectForm('editProject')
        
        const saveButton = document.createElement('button')
        saveButton.setAttribute('type', 'submit')
        saveButton.appendChild(common.createSaveIcon())
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            editProjectFromForm(project, new FormData(form).get('projectTitle'))
            form.replaceWith(createProjectListElement(project))
        })

        const discardButton = document.createElement('button')
        discardButton.setAttribute('type', 'reset')
        discardButton.appendChild(common.createDeleteIcon())
        form.addEventListener('reset', function () {
            form.replaceWith(projectItemWrapper)
        })
        const buttonsWrapper = document.createElement('div')
        buttonsWrapper.classList.add('flex')
        buttonsWrapper.appendChild(saveButton)
        buttonsWrapper.appendChild(discardButton)

        form.appendChild(buttonsWrapper)
        form.getElementsByTagName('input')[0].value = project.getTitle()
        projectItemWrapper.replaceWith(form)
    })

    return button
}

function createDeleteProjectButton(project) {
    const button = document.createElement('button')
    button.appendChild(common.createDeleteIcon())
    button.addEventListener('click', function () {
        deleteProject(project)
    })
    return button
}

function appendProjectEmptyState(element) {
    const emptyState = document.createElement('div')
    emptyState.id = 'projects-empty-state'
    emptyState.innerText = 'No projects yet'

    element.appendChild(emptyState)
}

export function refreshSidebar() {
    document.querySelector('#projects-wrapper').remove()
    appendAllProjects(document.getElementById('project-list'))
}