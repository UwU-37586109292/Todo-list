// import { taskFactory } from "./Model/task";
// import { projectFactory } from "./Model/project";

// const todo1 = taskFactory("title", 'desc', 'high', '01.01.2023', 'done')
// const project = projectFactory('projekcik')
// project.addTask(todo1)
// project.getAllTasks()
// project.removeTask(todo1)
// project.getAllTasks()


import './style.css'
import showHeader from './GUI/header.js'
import showSidebar from './GUI/sidebar.js'
import showFooter from './GUI/footer.js'

const contents = document.createElement('div')
contents.id = 'content'
contents.classList.add('flex', 'column')
document.body.appendChild(contents)
showHeader()

showSidebar()

showFooter()