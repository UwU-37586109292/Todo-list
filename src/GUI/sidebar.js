import { projectList } from "../Model/project"
import { addProjectFromForm } from "../controller/app"
import { setProjectAsCurrent } from "../controller/app"
import { getMainElement } from "./common"
import { deleteProject } from "../controller/app"
import * as common from "./common"

export default function showSidebar() {
    const sidebar = document.createElement('aside')
    sidebar.id = 'project-list'
    sidebar.classList.add('flex', 'column')

    appendAddProjectButton(sidebar)

    appendAllProjects(sidebar)

    const mainContent = getMainElement()
    mainContent.appendChild(sidebar)
}

function appendAddProjectButton(element) {
    const addProjectButton = document.createElement('button')
    addProjectButton.innerText = "Add project"
    addProjectButton.addEventListener('click', showAddProjectForm)
    element.appendChild(addProjectButton)
}

function showAddProjectForm() {
    if (!document.getElementById('projectForm')) {
        const form = document.createElement('form')
        form.setAttribute('name', 'addProject')
        form.id = 'projectForm'

        const inputProjectName = document.createElement('input')
        inputProjectName.setAttribute('type', 'text')
        inputProjectName.setAttribute('id', 'projectTitle')
        inputProjectName.setAttribute('name', 'projectTitle')
        inputProjectName.placeholder = 'Project name'
        inputProjectName.required = 'true'

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

        form.appendChild(inputProjectName)
        form.appendChild(saveButton)
        form.appendChild(discardButton)

        document.getElementById('project-list').appendChild(form)
    }
}

export function hideAddProjectForm() {
    document.getElementById('projectForm').remove()
}

function appendAllProjects(sidebarElement) {
    const container = document.createElement('div')
    container.id = 'projects-wrapper'
    const projectsToDisplay = projectList.getProjects()
    if (projectsToDisplay.length > 0) {
        const listElement = document.createElement('ul')
        projectsToDisplay.forEach(project => {
            const currProjectWrapper = document.createElement('li')
            currProjectWrapper.classList.add('flex', 'align-center')
            currProjectWrapper.appendChild(createProjectTagElement(project))
            currProjectWrapper.appendChild(createEditProjectButton(project))
            currProjectWrapper.appendChild(createDeleteProjectButton(project))
            listElement.appendChild(currProjectWrapper)
        })
        container.appendChild(listElement)
    } else {
        appendProjectEmptyState(container)
    }
    sidebarElement.appendChild(container)
}

function createProjectTagElement(project) {
    const element = document.createElement('div')
    element.innerText = project.getTitle()
    element.addEventListener('click', function () {
        setProjectAsCurrent(project)
    })
    return element
}

function createEditProjectButton(project) {
    const button = document.createElement('button')
    button.classList.add('edit')
    button.appendChild(common.createEditIcon())

    //TODO: Add function that edits project

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