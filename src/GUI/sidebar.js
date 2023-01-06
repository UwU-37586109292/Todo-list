import { projectList } from "../Model/project"

export default function showSidebar(){
    const mainContent = document.getElementById('content')

    const sidebar = document.createElement('aside')
    sidebar.classList.add('flex', 'column')
    appendAllProjects(sidebar)
    mainContent.appendChild(sidebar)
}

function appendAllProjects(sidebarElement){
    sidebarElement.textContent = projectList.getProjects().getTitle()
}