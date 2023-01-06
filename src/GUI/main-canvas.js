import { projectList } from "../Model/project"

export default function showMainCanvas(){
    const mainContent = document.getElementById('content')

    const canvas = document.createElement('main')
    canvas.classList.add('flex', 'column')

    // pull existing todos
    appendExistingTodos(canvas)

    // Add new todos
    const button = document.createElement('button')
    button.innerText = "Add a task to be done"
    button.addEventListener("click", showAddTaskModal)
    canvas.appendChild(button)
    
    mainContent.appendChild(canvas)
}

function showAddTaskModal(){
    alert('this is the add task modal')
}

function appendExistingTodos(canvas){
    const todo = document.createElement('div')
    todo.innerText = projectList.getFirstTodo()
    canvas.appendChild(todo)
}