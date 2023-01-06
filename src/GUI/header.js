export default function showHeader(){
const mainContent = document.getElementById('content')

const header = document.createElement('header')
header.classList.add('flex', 'column')
header.textContent = 'Todo list'
mainContent.appendChild(header)
}