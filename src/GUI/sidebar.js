import { projectList } from "../Model/project"
import { addProjectFromForm } from "../controller/app"
import { setProjectAsCurrent } from "../controller/app"
import { getMainElement } from "./common"

export default function showSidebar(){
    const sidebar = document.createElement('aside')
    sidebar.id = 'project-list'
    sidebar.classList.add('flex', 'column')

    appendAddProjectButton(sidebar)
    
    appendAllProjects(sidebar)

    const mainContent = getMainElement()
    mainContent.appendChild(sidebar)
}

function appendAddProjectButton(element){
    const addProjectButton = document.createElement('button')
    addProjectButton.innerText = "Add project"
    addProjectButton.addEventListener('click', showAddProjectForm)
    element.appendChild(addProjectButton)
}

function showAddProjectForm(){
    const form = document.createElement('form')
    form.setAttribute('name', 'addProject')
    form.id = 'projectForm'

    const inputProjectName = document.createElement('input')
    inputProjectName.setAttribute('type', 'text')
    inputProjectName.setAttribute('id','projectTitle')
    inputProjectName.setAttribute('name', 'projectTitle')

    const saveButton = document.createElement('button')
    saveButton.setAttribute('type', 'submit')
    saveButton.innerText = 'Save project'
    form.addEventListener('submit', function(event){
        event.preventDefault()
        addProjectFromForm(document.getElementById('projectTitle').value)
    })

    const discardButton = document.createElement('button')
    discardButton.setAttribute('type', 'reset')
    discardButton.innerText = 'Discard'
    form.addEventListener('reset', function(){
        hideAddProjectForm()
    })

    form.appendChild(inputProjectName)
    form.appendChild(saveButton)
    form.appendChild(discardButton)

    document.getElementById('project-list').appendChild(form)
}

export function hideAddProjectForm(){
    document.getElementById('projectForm').remove()
}

function appendAllProjects(sidebarElement){
    const listElement = document.createElement('ul')
    
    projectList.getProjects().forEach(project => {
        const listed = document.createElement('li')
        listed.innerText = project.getTitle()
        listed.setAttribute('data-id', project.getId())
        listed.addEventListener('click', function(){
            setProjectAsCurrent(project)
        })
        listElement.appendChild(listed)
    })
    sidebarElement.appendChild(listElement)
}

export function refreshSidebar(){
    document.querySelector('#project-list ul').remove()
    appendAllProjects(document.getElementById('project-list'))
}