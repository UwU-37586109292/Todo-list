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
    button.addEventListener("click", showAddTaskSection)
    canvas.appendChild(button)
    
    mainContent.appendChild(canvas)
}

function showAddTaskSection(){
    alert('this is the add task modal')
}

function appendExistingTodos(canvas){
    const todoList = document.createElement('ul')
    projectList.getCurrentProject().getAllTasks().forEach(task => {
        console.log(task)
        const todo = document.createElement('li')
        todo.innerText = task.getTitle()
        todoList.appendChild(todo)
    });
    canvas.appendChild(todoList)
}