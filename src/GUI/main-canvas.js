export default function showMainCanvas(){
    const mainContent = document.getElementById('content')

    const canvas = document.createElement('main')
    canvas.classList.add('flex', 'column')
    const button = document.createElement('button')
    button.innerText = "Add a task to be done"
    button.addEventListener("click", showAddTaskModal)
    canvas.appendChild(button)
    mainContent.appendChild(canvas)
}

function showAddTaskModal(){
    
}