import { projectFactory, projectList } from "../Model/project"
import { addProjectFromForm } from "../controller/app"

export default function showSidebar(){
    const mainContent = document.getElementById('content')

    const sidebar = document.createElement('aside')
    sidebar.setAttribute('id', 'project-list')
    sidebar.classList.add('flex', 'column')

    const addProjectButton = document.createElement('button')
    addProjectButton.innerText = "Add project"
    addProjectButton.addEventListener('click', showAddProjectForm)
    sidebar.appendChild(addProjectButton)
    
    appendAllProjects(sidebar)
    mainContent.appendChild(sidebar)
}

function showAddProjectForm(){
    const form = document.createElement('form')
    form.setAttribute('name', 'addProject')
    form.setAttribute('id','projectForm')
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

    document.getElementsByTagName('aside')[0].appendChild(form)
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
        listElement.appendChild(listed)
    })
    sidebarElement.appendChild(listElement)
}

export function refreshSidebar(){
    document.querySelector('#project-list ul').remove()
    appendAllProjects(document.getElementById('project-list'))
}