export default function showSidebar(){
    const mainContent = document.getElementById('content')

    const sidebar = document.createElement('aside')
    sidebar.classList.add('flex', 'column')
    sidebar.textContent = 'Projects list'
    mainContent.appendChild(sidebar)
}