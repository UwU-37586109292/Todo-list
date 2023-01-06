export default function showMainCanvas(){
    const mainContent = document.getElementById('content')

    const canvas = document.createElement('main')
    canvas.classList.add('flex', 'column')
    canvas.textContent = 'Canvas'
    mainContent.appendChild(canvas)
}