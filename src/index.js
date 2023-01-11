import { taskFactory } from "./Model/task";
import { projectFactory, projectList } from "./Model/project";
import './style.css'
import showHeader from './GUI/header.js'
import showSidebar from './GUI/sidebar.js'
import showFooter from './GUI/footer.js'
import showMainCanvas from './GUI/main-canvas'

// Default project and task setup for startup
const defaultProject = projectFactory('Inbox')
defaultProject.addTask(taskFactory("todo1", 'desc', 'high', '01.01.2023', 'done'))
const anotherProject = projectFactory('Long term')
projectList.addProjectToList(defaultProject)
projectList.setProjectAsCurrent(defaultProject)
projectList.addProjectToList(anotherProject)

// Set up main element
const content = document.createElement('div')
content.id = 'content'
content.classList.add('flex', 'column')
document.body.appendChild(content)

// Show GUI
showHeader()
showSidebar()
showMainCanvas()
showFooter()


//<a href="https://www.flaticon.com/free-icons/pencil" title="pencil icons">Pencil icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a>