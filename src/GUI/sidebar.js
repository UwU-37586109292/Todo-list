import { projectList } from "../Model/project"

export default function showSidebar(){
    const mainContent = document.getElementById('content')

    const sidebar = document.createElement('aside')
    sidebar.setAttribute('id', 'project-list')
    sidebar.classList.add('flex', 'column')
    appendAllProjects(sidebar)
    mainContent.appendChild(sidebar)
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
    document.getElementById('project-list').remove()
    showSidebar()
    console.log('hi')
}