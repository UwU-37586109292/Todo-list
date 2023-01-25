import { projectFactory, projectList } from "../Model/project"
import { addTodoToCurrentProject, toggleTaskStatus } from "../controller/app"
import { getMainElement } from "./common"
import * as common from "./common"
import {deleteTodo} from "../controller/app"


export default function showMainCanvas() {
    const mainContent = getMainElement()

    const canvas = document.createElement('main')
    canvas.id = 'main'
    canvas.classList.add('flex', 'column')

    appendAddTodoButton(canvas)
    appendExistingTodos(canvas)
    mainContent.appendChild(canvas)
}

function appendAddTodoButton(element) {
    if (projectList.getCurrentProject()) {
        const button = document.createElement('button')
        button.id = 'add-todo'
        button.innerText = "Add a task to be done"
        button.addEventListener("click", showAddTaskSection)
        element.appendChild(button)
    }
}

export function showAllProjectsOnCanvas(){
    const canvas = document.getElementById('main')
    while(canvas.firstChild){
        canvas.removeChild(canvas.lastChild)
    }
    projectList.getProjects().forEach(project => {
        canvas.appendChild(createProjectCard(project))
    })
}

/**
 * 
 * @param {projectFactory} project 
 * @returns {element} projectCard
 */
function createProjectCard(project){
    const projectCard = document.createElement('div')
    projectCard.classList.add('project-card', 'flex', 'column')
    
    const projectTitle = document.createElement('h1')
    projectTitle.innerText = project.getTitle()
    projectCard.appendChild(projectTitle)

    projectCard.appendChild(createTodoListFromProject(project))

    return projectCard
}

function hideAddTodoButton() {
    document.getElementById('add-todo').style.display='none';
}
function showAddTodoButton(){
    document.getElementById('add-todo').style.display='block';
}

function showAddTaskSection() {
    const canvas = document.getElementById('main')

    if (!document.getElementById('todoForm')) {
        const form = document.createElement('form')
        form.name= 'addTodo'
        form.id = 'todoForm'

        const inputTodoTitle = document.createElement('input')
        inputTodoTitle.type = 'text'
        inputTodoTitle.id = 'todoTitle'
        inputTodoTitle.name = 'todoTitle'
        inputTodoTitle.placeholder = 'Task name*'
        inputTodoTitle.required = 'true'

        const inputTodoDescription = document.createElement('input')
        inputTodoDescription.type = 'text'
        inputTodoDescription.id='todoDesc'
        inputTodoDescription.name =' todoDesc'
        inputTodoDescription.placeholder = 'Additional task description'

        form.appendChild(inputTodoTitle)
        form.appendChild(inputTodoDescription)
        addPriorityDropdown(form)

        const datePicker = document.createElement('input')
        datePicker.type = 'date'
        datePicker.id = 'todoDueDate'
        datePicker.name = 'todoDueDate'
        datePicker.min = new Date().toLocaleDateString('en-gb')

        form.appendChild(datePicker)
        addControlButtonsToTaskForm(form)

        canvas.appendChild(form)
    }
}

function addPriorityDropdown(form) {
    const priority = document.createElement('select')
    priority.name = 'priority'
    priority.id =  'priority'

    const optionLow = document.createElement('option')
    optionLow.value = 'low'
    optionLow.innerText = 'Low'
    const optionMedium = document.createElement('option')
    optionMedium.value = 'medium'
    optionMedium.innerText = 'Medium'
    const optionHigh = document.createElement('option')
    optionHigh.value = 'high'
    optionHigh.innerText = 'High'

    priority.appendChild(optionLow)
    priority.appendChild(optionMedium)
    priority.appendChild(optionHigh)
    form.appendChild(priority)
}

function addControlButtonsToTaskForm(form) {
    const saveButton = document.createElement('button')
    saveButton.type = 'submit'
    saveButton.appendChild(common.createSaveIcon())
    form.addEventListener('submit', function (event) {
        const formData = new FormData(document.getElementById('todoForm'));
        event.preventDefault()
        addTodoToCurrentProject(formData)
    })

    const discardButton = document.createElement('button')
    discardButton.type = 'reset'
    discardButton.appendChild(common.createDeleteIcon())
    form.addEventListener('reset', function () {
        hideAddTaskSection()
    })
    form.appendChild(saveButton)
    form.appendChild(discardButton)
}

export function hideAddTaskSection() {
    const form = document.getElementById('todoForm')
    if(form) form.remove()
}

export function refreshTodosList() {
    const canvas = document.getElementById('main')  
    showAddTodoButton()      
    if(projectList.getProjects().length === 0){
        hideAddTodoButton()
    }
    document.querySelector('#todos-wrapper').remove()
    appendExistingTodos(canvas)
}

function appendExistingTodos(canvas) {
    const container = document.createElement('div')
    container.id = 'todos-wrapper'

    if (!projectList.isProjectListEmpty() && !projectList.isCurrentProjectTaskListEmpty()) {
        const todoList = createTodoListFromProject(projectList.getCurrentProject())
        container.appendChild(todoList)
    }
    else {
        appendEmptyStateTodos(container)
    }
    canvas.appendChild(container)
}

function createTodoListFromProject(project) {
    const todoList = document.createElement('ul')
    project.getAllTasks().forEach(task => {
        const todoEntry = document.createElement('li')
        todoEntry.classList.add('todo-item-wrapper', 'flex', 'align-center')

        const dot = document.createElement('div')
        dot.classList.add('dot')
        dot.addEventListener('click', function () {
            toggleTaskStatus(task)
            todoEntry.classList.toggle('done')
            dot.classList.toggle('done')
        })

        if (task.getStatus() === 'done') {
            todoEntry.classList.add('done')
            dot.classList.add('done')
        }

        const todoTitle = document.createElement('div')
        todoTitle.innerText = task.getTitle()

        todoEntry.appendChild(dot)
        todoEntry.appendChild(todoTitle)
        todoEntry.appendChild(createEditTodoButton(task))
        todoEntry.appendChild(createDeleteTodoButton(task))
        todoList.appendChild(todoEntry)
    })
    return todoList
}

function appendEmptyStateTodos(element) {
    const emptyState = document.createElement('div')
    emptyState.id = 'no-todo'
    emptyState.innerText = 'Seems like there is noting to be done yet...'

    element.appendChild(emptyState)
}

function createEditTodoButton(todo) {
    const button = document.createElement('button')
    button.classList.add('edit')
    button.appendChild(common.createEditIcon())

    //TODO: Add function that edits todo

    return button
}

function createDeleteTodoButton(todo) {
    const button = document.createElement('button')
    button.appendChild(common.createDeleteIcon())
    button.addEventListener('click', function () {
        deleteTodo(todo)
    })
    return button
}