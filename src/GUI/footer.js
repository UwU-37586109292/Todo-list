export default function showFooter(){
    const mainContent = document.getElementById('content')

    const footer = document.createElement('footer')
    footer.classList.add('flex', 'column')
    footer.textContent = 'Footer'
    mainContent.appendChild(footer)
}