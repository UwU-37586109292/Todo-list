import { projectList } from "../Model/project"
import { addTodoToCurrentProject } from "../controller/app"

export default function showMainCanvas(){
    const mainContent = document.getElementById('content')

    const canvas = document.createElement('main')
    canvas.setAttribute('id', 'main')
    canvas.classList.add('flex', 'column')
    // Add new todos
    const button = document.createElement('button')
    button.innerText = "Add a task to be done"
    button.addEventListener("click", showAddTaskSection)
    canvas.appendChild(button)
 
    // pull existing todos
    appendExistingTodos(canvas)

    mainContent.appendChild(canvas)
}

function showAddTaskSection(){
    const canvas = document.getElementById('main')
    const form = document.createElement('form')
    form.setAttribute('name', 'addTodo')
    const inputTodoTitle = document.createElement('input')
    inputTodoTitle.setAttribute('type', 'text')
    inputTodoTitle.setAttribute('id','todoTitle')
    inputTodoTitle.setAttribute('name', 'todoTitle')

    const saveButton = document.createElement('button')
    saveButton.setAttribute('type', 'submit')
    saveButton.innerText = 'Save task'
    form.addEventListener('submit', function(event){
        event.preventDefault()
        addTodoToCurrentProject(document.getElementById('todoTitle').value)
    })

    const discardButton = document.createElement('button')
    discardButton.setAttribute('type', 'reset')
    discardButton.innerText = 'Discard'
    form.addEventListener('reset', function(){
        hideAddTaskSection()
    })

    form.appendChild(inputTodoTitle)
    form.appendChild(saveButton)
    form.appendChild(discardButton)
    canvas.appendChild(form)
}

export function hideAddTaskSection(){
    const form = document.getElementsByTagName('form')[0]
    form.remove()

}

export function refreshTodosList(){
    const canvas = document.getElementById('main')
    document.querySelector('#main ul').remove()
    appendExistingTodos(canvas)
}

function appendExistingTodos(canvas){
    const todoList = document.createElement('ul')
    projectList.getCurrentProject().getAllTasks().forEach(task => {
        const todo = document.createElement('li')
        todo.innerText = task.getTitle()
        todoList.appendChild(todo)
    });
    canvas.appendChild(todoList)
}