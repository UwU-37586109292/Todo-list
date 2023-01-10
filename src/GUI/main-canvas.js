import { projectList } from "../Model/project"
import { addTodoToCurrentProject } from "../controller/app"
import { getMainElement } from "./common"

export default function showMainCanvas() {
    const mainContent = getMainElement()

    const canvas = document.createElement('main')
    canvas.id = 'main'
    canvas.classList.add('flex', 'column')

    // Add new todos
    appendAddTodoButton(canvas)

    // pull existing todos
    appendExistingTodos(canvas)

    mainContent.appendChild(canvas)
}

function appendAddTodoButton(element) {
    const button = document.createElement('button')
    button.innerText = "Add a task to be done"
    button.addEventListener("click", showAddTaskSection)
    element.appendChild(button)
}

function showAddTaskSection() {
    const canvas = document.getElementById('main')

    if (!document.getElementById('todoForm')) {
        const form = document.createElement('form')
        form.setAttribute('name', 'addTodo')
        form.id = 'todoForm'

        const inputTodoTitle = document.createElement('input')
        inputTodoTitle.setAttribute('type', 'text')
        inputTodoTitle.setAttribute('id', 'todoTitle')
        inputTodoTitle.setAttribute('name', 'todoTitle')

        const saveButton = document.createElement('button')
        saveButton.setAttribute('type', 'submit')
        saveButton.innerText = 'Save task'
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            addTodoToCurrentProject(document.getElementById('todoTitle').value)
        })

        const discardButton = document.createElement('button')
        discardButton.setAttribute('type', 'reset')
        discardButton.innerText = 'Discard'
        form.addEventListener('reset', function () {
            hideAddTaskSection()
        })

        form.appendChild(inputTodoTitle)
        form.appendChild(saveButton)
        form.appendChild(discardButton)
        canvas.appendChild(form)
    }
}

export function hideAddTaskSection() {
    const form = document.getElementById('todoForm')
    form.remove()
}

export function refreshTodosList() {
    const canvas = document.getElementById('main')
    document.querySelector('#todos-wrapper').remove()
    appendExistingTodos(canvas)
}

function appendExistingTodos(canvas) {
    const tasksToShow = projectList.getCurrentProject().getAllTasks()

    const container = document.createElement('div')
    container.id = 'todos-wrapper'

    if (tasksToShow.length > 0) {
        const todoList = document.createElement('ul')
        tasksToShow.forEach(task => {
            const todo = document.createElement('li')
            todo.innerText = task.getTitle()
            todoList.appendChild(todo)
        });
        container.appendChild(todoList)
    }
    else {
        appendEmptyStateTodos(container)
    }
    canvas.appendChild(container)
}

function appendEmptyStateTodos(element) {
    const emptyState = document.createElement('div')
    emptyState.id = 'no-todo'
    emptyState.innerText = 'Seems like there is noting to be done yet...'

    element.appendChild(emptyState)
}